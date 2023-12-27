<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('colors')->insert(
            [
                [
                    'url' => 'images/black_color.jpg',
                    'product_id' => 1,
                ],
                [
                    'url' => 'images/white_color.png',
                    'product_id' => 1,
                ],
                [
                    'url' => 'images/black_color.jpg',
                    'product_id' => 2,
                ],
                [
                    'url' => 'images/white_color.png',
                    'product_id' => 2,
                ],
                [
                    'url' => 'images/black_color.jpg',
                    'product_id' => 3,
                ],
                [
                    'url' => 'images/black_color.jpg',
                    'product_id' => 4,
                ],
                [
                    'url' => 'images/white_color.png',
                    'product_id' => 4,
                ],
                [
                    'url' => 'images/black_color.jpg',
                    'product_id' => 5,
                ],
                [
                    'url' => 'images/white_color.png',
                    'product_id' => 5,
                ],
                [
                    'url' => 'images/black_color.jpg',
                    'product_id' => 6,
                ],
                [
                    'url' => 'images/white_color.png',
                    'product_id' => 6,
                ],
                [
                    'url' => 'images/black_color.jpg',
                    'product_id' => 7,
                ],
                [
                    'url' => 'images/white_color.png',
                    'product_id' => 7,
                ],
                [
                    'url' => 'images/black_color.jpg',
                    'product_id' => 8,
                ],
                [
                    'url' => 'images/white_color.png',
                    'product_id' => 8,
                ]
            ]
        );
    }
}
