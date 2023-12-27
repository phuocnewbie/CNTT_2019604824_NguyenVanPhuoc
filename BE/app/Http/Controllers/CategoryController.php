<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $keyword = request()->keyword;
        $category = Category::where("id", "like", "%" . $keyword . "%")
             ->orWhere('name', 'LIKE', "%" . $keyword . "%")
             ->orWhere('slug', 'LIKE', "%" . $keyword . "%")
             ->paginate(10);
        return response()->json(['data' => $category], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCategoryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCategoryRequest $request)
    {
        //
        $uniqueName = Category::where("name", $request->get("name"))->first();
        $uniqueSlug = Category::where("slug", $request->get("slug"))->first();
        
        if ($uniqueName && $uniqueSlug) {
            return response()->json([
                'messageName' => "Danh mục đã tồn tại!",
                'messageSlug' => "Slug đã tồn tại!"
            ], 409);
        }
        if ($uniqueName) {
            return response()->json(['messageName' => "Danh mục đã tồn tại!"], 409);
        }
        if ($uniqueSlug) {
            return response()->json(['messageSlug' => "Slug đã tồn tại!"], 409);
        }
        Category::create($request->all());
        return response()->json([
            'message' => "Tạo mới thành công!",
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show($template)
    {
        //

        $category = Category::all();
        return response()->json([
            'data' => $category,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCategoryRequest  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCategoryRequest $request, $categoryId)
    {
        $categoryFind = Category::find($categoryId);

        if (!$categoryFind)
            return response()->json(['message' => 'Không tìm thấy danh mục cần sửa!'], 404);
        
        $categoryFind->update($request->all());
        return response()->json([
            'message' => "Cập nhật thành công!",
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy($categoryId)
    {
        //
        $categoryFind = Category::find($categoryId);

        if (!$categoryFind)
            return response()->json(['message' => 'Không tìm thấy danh mục cần xóa!'], 404);
        
        $categoryFind->delete();

        return response()->json([
            'message' => "Xóa thành công!",
        ], 200);
    }
}
