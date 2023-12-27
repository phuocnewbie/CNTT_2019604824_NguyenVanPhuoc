<?php

namespace App\Http\Controllers;

use App\Models\Size;
use App\Models\ProductSize;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreSizeRequest;
use App\Http\Requests\UpdateSizeRequest;

class SizeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $size = Size::all();
        return response()->json(['data' => $size], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSizeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSizeRequest $request)
    {
        $unique = Size::where("description", $request->get("description"))->first();
        
        if ($unique) {
            return response()->json(['message' => "Kích cỡ đã tồn tại!"], 409);
        }
        $body['description'] = $request->description;
        $product_size['product_id'] = $request->product_id;
        DB::beginTransaction();

        try {
            $size = Size::create($body);

            $product_size['size_id'] = $size->id;
            ProductSize::create($product_size);
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'message' => 'Thêm thất bại!',
                'error' => $e->getMessage()
            ], 500);
        }

        DB::commit();
        
        return response()->json([
            'message' => "Tạo mới thành công!",
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\Response
     */
    public function show(Size $size)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSizeRequest  $request
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSizeRequest $request, Size $size)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\Response
     */
    public function destroy(Size $size)
    {
        //
    }
}
