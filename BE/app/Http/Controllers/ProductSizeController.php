<?php

namespace App\Http\Controllers;

use App\Models\ProductSize;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProductSizeRequest;
use App\Http\Requests\UpdateProductSizeRequest;

class ProductSizeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductSizeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductSizeRequest $request)
    {
        ProductSize::create($request->all());
        return response()->json([
            'message' => "Tạo mới thành công!",
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductSize  $productSize
     * @return \Illuminate\Http\Response
     */
    public function show(ProductSize $productSize)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductSizeRequest  $request
     * @param  \App\Models\ProductSize  $productSize
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductSizeRequest $request, ProductSize $productSize)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductSize  $productSize
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $productSize = ProductSize::where('product_id', $request->get('product_id'))
                                ->where('size_id', $request->get('size_id'))->first();

        if (!$productSize)
            return response()->json(['message' => 'Không tìm thấy dữ liệu cần xóa!'], 404);
        
        ProductSize::where('product_id', $request->get('product_id'))
        ->where('size_id', $request->get('size_id'))->delete();

        return response()->json([
            'message' => "Xóa thành công!",
        ], 200);
    }
}
