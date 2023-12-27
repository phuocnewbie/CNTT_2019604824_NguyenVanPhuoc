<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert(
            [
                [
                    'name' => 'Áo thun nam',
                    'price' => 123456,
                    'quantity' => 123,
                    'discount' => 15,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 1,
                    'created_at' => '2022-10-20'
                ],
                [
                    'name' => 'Áo thun nữ',
                    'price' => 321456,
                    'quantity' => 1000,
                    'discount' => 0,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 2,
                    'created_at' => '2022-10-22'
                ],
                [
                    'name' => 'Áo khoác nam',
                    'price' => 321456,
                    'quantity' => 1000,
                    'discount' => 20,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 1,
                    'created_at' => '2022-10-19'
                ],
                [
                    'name' => 'Áo khoác nữ',
                    'price' => 321456,
                    'quantity' => 1000,
                    'discount' => 0,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 2,
                    'created_at' => '2022-10-21'
                ],
                [
                    'name' => 'Đồng hồ cơ automatic',
                    'price' => 321456,
                    'quantity' => 1000,
                    'discount' => 0,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 3,
                    'created_at' => '2022-09-20'
                ],
                [
                    'name' => 'Kính râm thời trang',
                    'price' => 60000,
                    'quantity' => 1000,
                    'discount' => 0,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 3,
                    'created_at' => '2022-09-21'
                ],
                [
                    'name' => 'Đồng hồ cơ automatic 2',
                    'price' => 320000,
                    'quantity' => 1000,
                    'discount' => 15,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 3,
                    'created_at' => '2022-11-20'
                ],
                [
                    'name' => 'Kính râm thời trang 2',
                    'price' => 70000,
                    'quantity' => 1000,
                    'discount' => 10,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 3,
                    'created_at' => '2022-12-04'
                ],
            ]
        );
    }
}
