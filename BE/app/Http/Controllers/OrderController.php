<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Member;
use App\Models\Rating;
use App\Models\Product;
use App\Models\OrderDetail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $keyword = request()->keyword;
        $status = request()->status;
        $member = Member::where('full_name', 'LIKE', "%" . $keyword . "%")
                        ->orWhere('address', 'LIKE', "%" . $keyword . "%")
                        ->get()->pluck('id')->toArray();
        $order = Order::with('member')->where('status', $status)->whereIn('member_id', $member)
                    ->orWhere('id', 'LIKE', "%" . $keyword . "%")->where('status', $status)->paginate(10);
        return response()->json(['data' => $order], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreOrderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreOrderRequest $request)
    {
        $all = $request->all();
        $cart_items = $all['cart_items'];

        // remove cart_items
        unset($all['cart_items']);

        DB::beginTransaction();

        try {
            $order = Order::create($all);

            foreach ($cart_items as $cart_item) {
                $cart_item['order_id'] = $order->id;
                OrderDetail::create($cart_item);
            }
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'message' => 'Tạo đơn hàng thất bại!',
                'error' => $e->getMessage()
            ], 500);
        }

        DB::commit();

        return response()->json([
            'message' => 'Tạo đơn hàng thành công!'
        ], 201);
    }

    public function rating(StoreOrderRequest $request, $orderId)
    {
        $orderFind = Order::with('order_detail')->find($orderId);
        
        if (!$orderFind)
            return response()->json(['message' => 'Không tìm thấy đơn hàng!'], 404);

        
        $orderFind->is_rated = true;
        $orderFind->save();

        $order_detail = $orderFind->order_detail;

        $rating['member_id'] = $orderFind->member_id;
        $rating['star'] = $request->star;
        $rating['description'] = $request->description;
        foreach($order_detail as $key => $value ) {
            $rating['product_id'] = $value->product_id;
            Rating::create($rating);
        }

        return response()->json([
                    'message' => "Đánh giá sản phẩm thành công!",
                ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show($orderId)
    {
        $order = Order::with('member', 'order_detail')->find($orderId);
        
        return response()->json([
                    'data' => $order,
                ], 201);
    }

    public function get_by_memberId($memberId)
    {
        $status = request()->status;
        if ($status === 'wait')
            $order = Order::with('order_detail')->where('member_id', $memberId)->where('status', $status)
                    ->orWhere('member_id', $memberId)->where('status', 'request cancel')->get();
        else 
            $order = Order::with('order_detail')->where('member_id', $memberId)->where('status', $status)->get();
        
        return response()->json([
                    'data' => $order,
                ], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateOrderRequest  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update_status(UpdateOrderRequest $request, $orderId)
    {
        $orderFind = Order::find($orderId);

        if (!$orderFind)
            return response()->json(['message' => 'Không tìm thấy đơn hàng cần sửa!'], 404);

        DB::beginTransaction();

        try {
            if ($request->status === 'prepare') {
                $products = DB::table('orders')->join('order_details', 'orders.id', '=', 'order_details.order_id')
                            ->join('products', 'products.id', '=', 'order_details.product_id')->selectRaw('products.id, order_details.quantity as dash')
                            ->where('orders.id', $orderFind->id)->get();
            
                foreach($products as $product) {
                    $productFind = Product::where('id', $product->id)->first();
                    if ($productFind->quantity < $product->dash) {
                        return response()->json([
                            'message' => $productFind->name . " không còn đủ số lượng!",
                        ], 400);
                    }
                    $productFind->quantity = $productFind->quantity - $product->dash;
                    $productFind->save();
                }
            }
            $orderFind->status = $request->status;
            $orderFind->save();
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'message' => 'Cập nhật thất bại!',
                'error' => $e->getMessage()
            ], 500);
        }
        
        DB::commit();

        if ($request->status === 'wait')
            return response()->json([
                'message' => "Hủy yêu cầu thành công!",
            ], 201);
        return response()->json([
            'message' => "Cập nhật thành công!",
        ], 201);
    }

    public function request_cancel(UpdateOrderRequest $request, $orderId)
    {
        $orderFind = Order::find($orderId);

        if (!$orderFind)
            return response()->json(['message' => 'Không tìm thấy đơn hàng cần sửa!'], 404);
        
        $orderFind->status = $request->status;
        $orderFind->note = $request->reason;
        $orderFind->save();

        return response()->json([
            'message' => "Gửi yêu cầu hủy thành công!",
        ], 201);
    }

    public function cancel(UpdateOrderRequest $request, $orderId)
    {
        $orderFind = Order::with('member')->find($orderId);

        if (!$orderFind)
            return response()->json(['message' => 'Không tìm thấy đơn hàng cần sửa!'], 404);
        
        $orderFind->status = 'canceled';
        $orderFind->note = $request->reason;
        $orderFind->save();

        Mail::send('emails.cancelOrder', compact('orderFind'), function($email) use($orderFind) {
            $email->subject("Hoàn Mỹ Store - Thông báo cập nhật thông tin đơn hàng");
            $email->to($orderFind->member->email, $orderFind->member->full_name, $orderFind->id, $orderFind->note);
        });

        return response()->json([
            'message' => "Từ chối thành công!",
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
