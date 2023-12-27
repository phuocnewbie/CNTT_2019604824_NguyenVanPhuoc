<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('carts')->insert(
            [
                [
                    'member_id' => 2,
                    'product_id' => 1,
                    'size' => 'L',
                    'color' => 'images/44537ae5bed8ccf91347de0a06aa1363.jpg',
                    'quantity' => 1,
                ],
                [
                    'member_id' => 4,
                    'product_id' => 1,
                    'size' => 'S',
                    'color' => 'images/44537ae5bed8ccf91347de0a06aa1363.png',
                    'quantity' => 1,
                ],
                [
                    'member_id' => 6,
                    'product_id' => 1,
                    'size' => 'M',
                    'color' => 'images/44537ae5bed8ccf91347de0a06aa1363.jpg',
                    'quantity' => 1,
                ]
            ]
        );
    }
}
