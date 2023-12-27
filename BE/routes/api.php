<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\RoleController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CarouselController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProductSizeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/dashboard/sold', [DashboardController::class, 'statistical_sold']);
Route::get('/dashboard/category', [DashboardController::class, 'statistical_category']);
Route::get('/dashboard/revenue', [DashboardController::class, 'statistical_revenue']);
Route::get('/dashboard/order', [DashboardController::class, 'statistical_order']);
Route::get('/dashboard/contact', [DashboardController::class, 'statistical_contact']);
Route::get('/dashboard/member', [DashboardController::class, 'statistical_member']);
Route::get('/dashboard/product-sold', [DashboardController::class, 'statistical_product_sold']);
Route::apiResource('/roles', RoleController::class);
Route::apiResource('/categories', CategoryController::class);
Route::apiResource('/carousels', CarouselController::class)->except('update');
Route::post('/carousels/{carouselId}', [CarouselController::class, 'update']);
Route::apiResource('/members', MemberController::class)->except('update');
Route::post('/members/login', [MemberController::class, 'login']);
Route::post('/members/forgot-password', [MemberController::class, 'forgot_password']);
Route::post('/members/{memberId}', [MemberController::class, 'update']);
Route::post('/members/delete/{memberId}', [MemberController::class, 'destroy']);
Route::post('/members/role/{memberId}', [MemberController::class, 'update_role']);
Route::post('/members/password/{memberId}', [MemberController::class, 'update_password']);
Route::post('/members/verify-email/verify', [MemberController::class, 'verify_email']);
Route::apiResource('/contacts', ContactController::class);
Route::apiResource('/products', ProductController::class);
Route::get('/products/get-limit/{slug}', [ProductController::class, 'get_limit']);
Route::post('/products/get-by-keyword', [ProductController::class, 'get_by_keyword']);
Route::post('/products/get-by-category', [ProductController::class, 'get_by_category']);
Route::apiResource('/sizes', SizeController::class);
Route::apiResource('/colors', ColorController::class);
Route::apiResource('/images', ImageController::class);
Route::apiResource('/product-sizes', ProductSizeController::class)->except('destroy');
Route::post('/product-sizes/delete', [ProductSizeController::class, 'destroy']);
Route::delete('/carts/delete-all', [CartController::class, 'destroyAll']);
Route::apiResource('/carts', CartController::class);
Route::apiResource('/orders', OrderController::class)->except('update');
Route::get('/orders/by-member-id/{memberId}', [OrderController::class, 'get_by_memberId']);
Route::post('/orders/status/{orderId}', [OrderController::class, 'update_status']);
Route::post('/orders/request-cancel/{orderId}', [OrderController::class, 'request_cancel']);
Route::post('/orders/cancel/{orderId}', [OrderController::class, 'cancel']);
Route::post('/orders/rating/{orderId}', [OrderController::class, 'rating']);








