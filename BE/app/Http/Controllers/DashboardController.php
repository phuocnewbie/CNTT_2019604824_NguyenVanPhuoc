<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function statistical_sold()
    {
        $sum = DB::table('orders')->join('order_details', 'orders.id', '=', 'order_details.order_id')
                    ->selectRaw('MONTHNAME(created_at) as month, sum(quantity) as product_sold')
                    ->whereRaw('YEAR(orders.created_at) = YEAR(NOW())')->groupByRaw('MONTHNAME(orders.created_at)')->orderBy('orders.created_at')->get();
        $count = DB::table('orders')->selectRaw('MONTHNAME(created_at) as month, count(id) as order_sold')->whereRaw('YEAR(orders.created_at) = YEAR(NOW())')
                    ->groupByRaw('MONTHNAME(orders.created_at)')->orderBy('orders.created_at')->get();
        return response()->json([
            'product_solds' => $sum,
            'order_solds' => $count
        ], 200);
    }
    public function statistical_revenue()
    {
        $data = DB::table('orders')->join('order_details', 'orders.id', '=', 'order_details.order_id')
                    ->selectRaw('sum(total_price) as revenue')->whereRaw('MONTH(orders.created_at) = MONTH(NOW())')
                    ->whereRaw('YEAR(orders.created_at) = YEAR(NOW())')->groupByRaw('MONTH(created_at)')->get();
        return response()->json(['data' => $data], 200);
    }
    public function statistical_order()
    {
        $data = DB::table('orders')->selectRaw('count(id) as order_sold')->whereRaw('MONTH(orders.created_at) = MONTH(NOW())')
                    ->whereRaw('YEAR(orders.created_at) = YEAR(NOW())')->groupByRaw('MONTH(orders.created_at)')->get();
        return response()->json(['data' => $data], 200);
    }
    public function statistical_contact()
    {
        $data = DB::table('contacts')->selectRaw('count(id) as contact')->where('is_feedback', false)
                    ->whereRaw('MONTH(created_at) = MONTH(NOW())')->whereRaw('YEAR(created_at) = YEAR(NOW())')->groupByRaw('MONTH(created_at)')->get();
        return response()->json(['data' => $data], 200);
    }
    public function statistical_member()
    {
        $data = DB::table('members')->selectRaw('count(id) as member')->whereRaw('MONTH(created_at) = MONTH(NOW())')
                    ->whereRaw('YEAR(created_at) = YEAR(NOW())')->groupByRaw('MONTH(created_at)')->get();
        return response()->json(['data' => $data], 200);
    }
    public function statistical_category()
    {
        $data = DB::table('categories')
                    ->leftJoin('products', 'categories.id', '=', 'products.category_id')
                    ->leftJoin('order_details', 'products.id', '=', 'order_details.product_id')
                    ->leftJoin('orders', 'orders.id', '=', 'order_details.order_id')->selectRaw('categories.name, sum(order_details.quantity) as product_sold')
                    ->whereRaw('MONTH(orders.created_at) = MONTH(NOW())')->whereRaw('YEAR(orders.created_at) = YEAR(NOW())')
                    ->groupByRaw('categories.id')->orderBy('product_sold')->get();
        return response()->json(['data' => $data], 200);
    }
}
