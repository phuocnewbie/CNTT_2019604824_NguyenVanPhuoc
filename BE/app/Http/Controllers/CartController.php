<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $member_id = request()->member_id;
        $cart = Cart::with('product')->where('member_id', $member_id)->get();
        

        return response()->json(['data' => $cart], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCartRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCartRequest $request)
    {
        $cart = Cart::where('product_id', $request->product_id)
                    ->where('member_id', $request->member_id)
                    ->where('color', $request->color)
                    ->where('size', $request->size)->first();
        
        if ($cart) {
            $cart->quantity = $cart->quantity + $request->quantity;
            $cart->save();
        } else Cart::create($request->all());

        $all_cart = Cart::with('product')->where('member_id', $request->member_id)->get();

        return response()->json([
            'data' => $all_cart,
            'message' => "Thêm vào giỏ hàng thành công!",
        ], 201);
            
            
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCartRequest  $request
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCartRequest $request, $cartId)
    {
        $cart = Cart::with('product')->find($cartId);

        $cart->quantity = $request->get('quantity');
        $cart->save();

        return response()->json([
                'data' => $cart,
                'message' => "Cập nhật thành công!",
            ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function destroy($cartId)
    {
        $cartFind = Cart::find($cartId);

        $cartFind->delete();

        $member_id = request()->member_id;
        $cart = Cart::with('product')->where('member_id', $member_id)->get();

        return response()->json([
            'data' => $cart,
            'message' => "Xóa thành công!",
        ], 200);
    }

    public function destroyAll()
    {
        Cart::where("member_id", request()->member_id)->delete();

        return response()->json([
            'message' => "Xóa thành công!",
        ], 200);
    }
}
