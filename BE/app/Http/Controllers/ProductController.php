<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Image;
use App\Models\Color;
use App\Models\Category;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $keyword = request()->keyword;
        $category = Category::where("name", "LIKE", "%" . $keyword . "%")->get()->pluck('id')->toArray();
        $product = Product::with('category')->whereIn('category_id', $category)
            ->orWhere("id", "LIKE", "%" . $keyword . "%")
            ->orWhere('name', 'LIKE', "%" . $keyword . "%")->paginate(10);
        
        return response()->json(['data' => $product], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $body['name'] = $request->get('name');
        $body['price'] = $request->get('price');
        $body['quantity'] = $request->get('quantity');
        $body['discount'] = $request->get('discount');
        $body['category_id'] = $request->get('category_id');
        $body['description'] = $request->get('description');

        Product::create($body);
        $product = Product::orderBy('created_at', 'desc')->first();
        $imgAdd['product_id'] = $product->id;
        $colorAdd['product_id'] = $product->id;
        $sizeAdd['product_id'] = $product->id;

        if ($request->has('size')) {
            $size = $request->size;
            foreach ($size as $key => $value) {
                $sizeAdd['size_id'] = $value;
                ProductSize::create($sizeAdd);
            }
        }

        if ($request->hasFile('image'))
            $image = $request->image;
        foreach ($image as $key => $value) {
            $ext = $value->extension();
            $generate_unique_file_name = md5(time()) . $key . '.' . $ext;
            $value->move('images', $generate_unique_file_name, 'local');
            $imgAdd['url'] = 'images/' . $generate_unique_file_name;
            Image::create($imgAdd);
        }

        if ($request->hasFile('color'))
            $color = $request->color;
        foreach ($color as $key => $value) {
            $ext = $value->extension();
            $generate_unique_file_name = md5(time()) . '.' . $ext;
            $value->move('images', $generate_unique_file_name, 'local');
            $colorAdd['url'] = 'images/' . $generate_unique_file_name;
            Color::create($colorAdd);
        }

        return response()->json([
            'message' => "Thêm sản phẩm thành công!",
        ], 201);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($productId)
    {
        $product = Product::with('size', 'color', 'image', 'category', 'rating')->where('id', $productId)->first();

        if (!$product)
            return response()->json(['message' => 'Không tìm thấy sản phẩm!'], 404);
        $product->category_name = $product->category->name;

        return response()->json([
            'data' => $product,
        ], 200);
    }

    public function get_by_keyword(Request $request)
    {
        $keyword = $request->keyword;
        $category = $request->category;

        if (count($category) !== 0)
            $category_select = Category::whereIn('name', $category)->get()->pluck('id')->toArray();
        else  $category_select = Category::all()->pluck('id')->toArray();

        if ($request->min_price && $request->max_price) {
            $min = $request->min_price;
            $max = $request->max_price;
        }
        else if ($request->min_price) {
            $min = $request->min_price;
            $max = 1000000000;
        }
        else if ($request->max_price) {
            $max = $request->max_price;
            $min = 0;
        }
        else {
            $min = 0;
            $max = 1000000000;
        }
        
        switch($request->order_by) {
            case 'Mới Nhất':
                $product = DB::table('products')->join('categories', 'products.category_id', '=', 'categories.id')
                ->leftJoin('images', 'products.id', '=', 'images.product_id')
                ->leftJoin('ratings', 'products.id', '=', 'ratings.product_id')
                ->selectRaw('products.id, products.name, products.price, products.discount, products.created_at, avg(star) as rating, images.url as image')
                ->whereIn('category_id', $category_select)->where('price', '>=', $min)->where('price', '<=', $max)->where('products.name', "like", "%" . $keyword . "%")
                ->groupByRaw('products.id')->orderBy('products.created_at', 'desc')->paginate(16);
                break;
            case 'Bán Chạy':
                $product = DB::table('products')->join('categories', 'products.category_id', '=', 'categories.id')
                ->leftJoin('order_details', 'products.id', '=', 'order_details.product_id')
                ->leftJoin('images', 'products.id', '=', 'images.product_id')
                ->leftJoin('ratings', 'products.id', '=', 'ratings.product_id')
                ->selectRaw('products.id, products.name, products.price, products.discount, products.created_at, avg(star) as rating, images.url as image, sum(order_details.quantity) as sale')
                ->whereIn('category_id', $category_select)->where('price', '>=', $min)->where('price', '<=', $max)->where('products.name', "like", "%" . $keyword . "%")
                ->groupByRaw('products.id')->orderBy('sale', 'desc')->paginate(16);
                break;
            case 'ascending':
                $product = DB::table('products')->join('categories', 'products.category_id', '=', 'categories.id')
                ->leftJoin('images', 'products.id', '=', 'images.product_id')
                ->leftJoin('ratings', 'products.id', '=', 'ratings.product_id')
                ->selectRaw('products.id, products.name, products.price, products.discount, (products.price * (1-products.discount/100)) as price_discount, products.created_at, avg(star) as rating, images.url as image')
                ->whereIn('category_id', $category_select)->where('price', '>=', $min)->where('price', '<=', $max)->where('products.name', "like", "%" . $keyword . "%")
                ->groupByRaw('products.id')->orderBy('price_discount')->paginate(16);
                break;
            case 'descending':
                $product = DB::table('products')->join('categories', 'products.category_id', '=', 'categories.id')
                ->leftJoin('images', 'products.id', '=', 'images.product_id')
                ->leftJoin('ratings', 'products.id', '=', 'ratings.product_id')
                ->selectRaw('products.id, products.name, products.price, products.discount, (products.price * (1-products.discount/100)) as price_discount, products.created_at, avg(star) as rating, images.url as image')
                ->whereIn('category_id', $category_select)->where('price', '>=', $min)->where('price', '<=', $max)->where('products.name', "like", "%" . $keyword . "%")
                ->groupByRaw('products.id')->orderBy('price_discount', 'desc')->paginate(16);
                break;
            default:
                $product = DB::table('products')->join('categories', 'products.category_id', '=', 'categories.id')
                ->leftJoin('images', 'products.id', '=', 'images.product_id')
                ->leftJoin('ratings', 'products.id', '=', 'ratings.product_id')
                ->selectRaw('products.id, products.name, products.price, products.discount, products.created_at, avg(star) as rating, images.url as image')
                ->whereIn('category_id', $category_select)->where('price', '>=', $min)->where('price', '<=', $max)->where('products.name', "like", "%" . $keyword . "%")
                ->groupByRaw('products.id')->paginate(16);
        }

        return response()->json([
            'data' => $product,
        ], 200);
    }

    public function get_by_category(Request $request)
    {

        $category = Category::where('slug', $request->category)->first();

        switch($request->order_by) {
            case 'Mới Nhất':
                $product = DB::table('products')->join('categories', 'products.category_id', '=', 'categories.id')
                ->leftJoin('images', 'products.id', '=', 'images.product_id')
                ->leftJoin('ratings', 'products.id', '=', 'ratings.product_id')
                ->selectRaw('products.id, products.name, products.price, products.discount, products.created_at, avg(star) as rating, images.url as image')
                ->where('category_id', $category->id)->groupByRaw('products.id')->orderBy('products.created_at', 'desc')->paginate(16);
                break;
            case 'Bán Chạy':
                $product = DB::table('products')->join('categories', 'products.category_id', '=', 'categories.id')
                ->leftJoin('order_details', 'products.id', '=', 'order_details.product_id')
                ->leftJoin('images', 'products.id', '=', 'images.product_id')
                ->leftJoin('ratings', 'products.id', '=', 'ratings.product_id')
                ->selectRaw('products.id, products.name, products.price, products.discount, products.created_at, avg(star) as rating, images.url as image, sum(order_details.quantity) as sale')
                ->where('category_id', $category->id)->groupByRaw('products.id')->orderBy('sale', 'desc')->paginate(16);
                break;
            case 'ascending':
                $product = DB::table('products')->join('categories', 'products.category_id', '=', 'categories.id')
                ->leftJoin('images', 'products.id', '=', 'images.product_id')
                ->leftJoin('ratings', 'products.id', '=', 'ratings.product_id')
                ->selectRaw('products.id, products.name, products.price, products.discount, (products.price * (1-products.discount/100)) as price_discount, products.created_at, avg(star) as rating, images.url as image')
                ->where('category_id', $category->id)->groupByRaw('products.id')->orderBy('price_discount')->paginate(16);
                break;
            case 'descending':
                $product = DB::table('products')->join('categories', 'products.category_id', '=', 'categories.id')
                ->leftJoin('images', 'products.id', '=', 'images.product_id')
                ->leftJoin('ratings', 'products.id', '=', 'ratings.product_id')
                ->selectRaw('products.id, products.name, products.price, products.discount, (products.price * (1-products.discount/100)) as price_discount, products.created_at, avg(star) as rating, images.url as image')
                ->where('category_id', $category->id)->groupByRaw('products.id')->orderBy('price_discount', 'desc')->paginate(16);
                break;
            default:
                $product = DB::table('products')->join('categories', 'products.category_id', '=', 'categories.id')
                ->leftJoin('images', 'products.id', '=', 'images.product_id')
                ->leftJoin('ratings', 'products.id', '=', 'ratings.product_id')
                ->selectRaw('products.id, products.name, products.price, products.discount, products.created_at, avg(star) as rating, images.url as image')
                ->where('category_id', $category->id)->groupByRaw('products.id')->paginate(16);
        }

        return response()->json([
            'data' => $product,
        ], 200);
    }

    public function get_limit($slug)
    {
        switch($slug) {
            case 'ctime':
                $product = DB::table('products')->leftJoin('images', 'products.id', '=', 'images.product_id')
                ->leftJoin('ratings', 'products.id', '=', 'ratings.product_id')
                ->selectRaw('products.id, products.name, products.price, products.discount, products.created_at, avg(star) as rating, images.url as image')
                ->groupByRaw('products.id')->orderBy('products.created_at', 'desc')->limit(8)->get();
                break;
            case 'rating': 
                $product = DB::table('products')->leftJoin('images', 'products.id', '=', 'images.product_id')
                ->leftJoin('order_details', 'products.id', '=', 'order_details.product_id')
                ->selectRaw('products.id, products.name, products.price, products.discount, sum(order_details.quantity) as count, images.url as image')
                ->groupByRaw('products.id')->orderBy('count', 'desc')->limit(8)->get();
                break;
            case 'discount':
                $product = DB::table('products')->leftJoin('images', 'products.id', '=', 'images.product_id')
                ->leftJoin('ratings', 'products.id', '=', 'ratings.product_id')
                ->selectRaw('products.id, products.name, products.price, products.discount, products.created_at, avg(star) as rating, images.url as image')
                ->groupByRaw('products.id')->orderBy('products.discount', 'desc')->limit(8)->get();
                break;
            default:
                $product = DB::table('products')->leftJoin('images', 'products.id', '=', 'images.product_id')
                ->leftJoin('ratings', 'products.id', '=', 'ratings.product_id')
                ->selectRaw('products.id, products.name, products.price, products.discount, products.created_at, avg(star) as rating, images.url as image')
                ->groupByRaw('products.id')->orderBy('products.created_at', 'desc')->limit(8)->get();
        }
        return response()->json([
            'data' => $product,
        ], 200);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, $productId)
    {
        $product = Product::find($productId);

        if (!$product)
            return response()->json(['message' => 'Không tìm thấy sản phẩm!'], 404);

        $product->update($request->all());
        return response()->json([
                    'message' => "Cập nhật thành công!",
                ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($productId)
    {
        $product = Product::find($productId);

        if (!$product)
            return response()->json(['message' => 'Không tìm thấy sản phẩm cần xóa!'], 404);

        $product->delete();
        return response()->json([
            'message' => "Xóa thành công!",
        ], 200);
    }
}
