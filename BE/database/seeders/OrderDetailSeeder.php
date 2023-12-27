<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('order_details')->insert(
            [
                [
                    'order_id' => 1,
                    'product_id' => 1,
                    'size' => 'L',
                    'color' => 'images/44537ae5bed8ccf91347de0a06aa1363.jpg',
                    'quantity' => 1,
                    'total_price' => 104550,
                ],
                [
                    'order_id' => 2,
                    'product_id' => 1,
                    'size' => 'S',
                    'color' => 'images/44537ae5bed8ccf91347de0a06aa1363.png',
                    'quantity' => 3,
                    'total_price' => 313650,
                ],
                [
                    'order_id' => 3,
                    'product_id' => 1,
                    'size' => 'M',
                    'color' => 'images/44537ae5bed8ccf91347de0a06aa1363.jpg',
                    'quantity' => 2,
                    'total_price' => 209100,
                ],
                [
                    'order_id' => 4,
                    'product_id' => 1,
                    'size' => 'M',
                    'color' => 'images/44537ae5bed8ccf91347de0a06aa1363.jpg',
                    'quantity' => 2,
                    'total_price' => 209100,
                ],
                [
                    'order_id' => 1,
                    'product_id' => 3,
                    'size' => 'M',
                    'color' => 'images/44537ae5bed8ccf91347de0a06aa1363.jpg',
                    'quantity' => 2,
                    'total_price' => 514330,
                ],
                [
                    'order_id' => 7,
                    'product_id' => 3,
                    'size' => 'L',
                    'color' => 'images/44537ae5bed8ccf91347de0a06aa1363.jpg',
                    'quantity' => 2,
                    'total_price' => 514330,
                ],
                [
                    'order_id' => 8,
                    'product_id' => 3,
                    'size' => 'L',
                    'color' => 'images/44537ae5bed8ccf91347de0a06aa1363.jpg',
                    'quantity' => 2,
                    'total_price' => 514330,
                ],
                [
                    'order_id' => 8,
                    'product_id' => 7,
                    'size' => null,
                    'color' => 'images/44537ae5bed8ccf91347de0a06aa1363.jpg',
                    'quantity' => 1,
                    'total_price' => 272000,
                ],
                [
                    'order_id' => 9,
                    'product_id' => 4,
                    'size' => 'L',
                    'color' => 'images/44537ae5bed8ccf91347de0a06aa1363.jpg',
                    'quantity' => 3,
                    'total_price' => 964368,
                ],
                [
                    'order_id' => 9,
                    'product_id' => 7,
                    'size' => null,
                    'color' => 'images/44537ae5bed8ccf91347de0a06aa1363.jpg',
                    'quantity' => 1,
                    'total_price' => 272000,
                ],
                [
                    'order_id' => 9,
                    'product_id' => 6,
                    'size' => null,
                    'color' => 'images/44537ae5bed8ccf91347de0a06aa1363.jpg',
                    'quantity' => 1,
                    'total_price' => 60000,
                ]
            ]
        );
    }
}
