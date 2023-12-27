<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Http\Requests\StoreImageRequest;
use App\Http\Requests\UpdateImageRequest;

class ImageController extends Controller
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
     * @param  \App\Http\Requests\StoreImageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreImageRequest $request)
    {
        $body = $request->all();
        if ($request->hasFile('url')) {
            $ext = $request->file('url')->extension();
            $generate_unique_file_name = md5(time()) . '.' . $ext;
            $request->file('url')->move('images', $generate_unique_file_name, 'local');

            $body['url'] = 'images/' . $generate_unique_file_name;
        }
        
        Image::create($body);
        return response()->json([
            'message' => "Tạo mới thành công!",
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function show(Image $image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateImageRequest  $request
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateImageRequest $request, Image $image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function destroy($imageId)
    {
        $image = Image::find($imageId);

        if (!$image)
            return response()->json(['message' => 'Không tìm thấy màu cần xóa!'], 404);
        
        $image->delete();

        return response()->json([
            'message' => "Xóa thành công!",
        ], 200);
    }
}
