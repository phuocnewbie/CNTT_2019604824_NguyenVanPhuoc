<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarouselSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('carousels')->insert(
            [
                [
                    'category_id' => 1,
                    'title' => 'Title 1',
                    'status' => 'Đang hoạt động',
                    'image' => 'images/44f3998e190ebb88c26bb75529e35e13.jpg'
                ],
                [
                    'category_id' => 3,
                    'title' => 'Title 2',
                    'status' => 'Đang hoạt động',
                    'image' => 'images/2943a2467947e19ffd79fbc0cf6b9aa8.jpg'
                ],
                [
                    'category_id' => 2,
                    'title' => 'Title 3',
                    'status' => 'Đang hoạt động',
                    'image' => 'images/0e768744c13820de77a694d8f1e8df60.jpg'
                ],
                [
                    'category_id' => 3,
                    'title' => 'Title 4',
                    'status' => 'Đang tắt',
                    'image' => 'images/0e5889bb143465c1db9784768cf05fce.jpg'
                ],
                [
                    'category_id' => 2,
                    'title' => 'Title 5',
                    'status' => 'Đang hoạt động',
                    'image' => 'images/d3fdec1565d28c9c8bc89080a7be4189.jpg'
                ],
                [
                    'category_id' => 1,
                    'title' => 'Title 6',
                    'status' => 'Đang tắt',
                    'image' => 'images/44f3998e190ebb88c26bb75529e35e13.jpg'
                ],
                [
                    'category_id' => 3,
                    'title' => 'Title 7',
                    'status' => 'Đang hoạt động',
                    'image' => 'images/2943a2467947e19ffd79fbc0cf6b9aa8.jpg'
                ],
                [
                    'category_id' => 2,
                    'title' => 'Title 8',
                    'status' => 'Đang tắt',
                    'image' => 'images/0e768744c13820de77a694d8f1e8df60.jpg'
                ],
            ]
        );
    }
}
