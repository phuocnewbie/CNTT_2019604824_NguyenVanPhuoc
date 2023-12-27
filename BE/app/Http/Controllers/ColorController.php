<?php

namespace App\Http\Controllers;

use App\Models\Color;
use App\Http\Requests\StoreColorRequest;
use App\Http\Requests\UpdateColorRequest;

class ColorController extends Controller
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
     * @param  \App\Http\Requests\StoreColorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreColorRequest $request)
    {

        $body = $request->all();
        if ($request->hasFile('url')) {
            $ext = $request->file('url')->extension();
            $generate_unique_file_name = md5(time()) . '.' . $ext;
            $request->file('url')->move('images', $generate_unique_file_name, 'local');

            $body['url'] = 'images/' . $generate_unique_file_name;
        }
        
        Color::create($body);
        return response()->json([
            'message' => "Tạo mới thành công!",
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Color  $color
     * @return \Illuminate\Http\Response
     */
    public function show(Color $color)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateColorRequest  $request
     * @param  \App\Models\Color  $color
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateColorRequest $request, Color $color)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Color  $color
     * @return \Illuminate\Http\Response
     */
    public function destroy($colorId)
    {
        $color = Color::find($colorId);

        if (!$color)
            return response()->json(['message' => 'Không tìm thấy màu cần xóa!'], 404);
        
        $color->delete();

        return response()->json([
            'message' => "Xóa thành công!",
        ], 200);
    }
}
