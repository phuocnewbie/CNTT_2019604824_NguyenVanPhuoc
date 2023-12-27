<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('ratings')->insert(
            [
                [
                    'member_id' => 2,
                    'product_id' => 1,
                    'star' => 5,
                    'description' => null,
                    'created_at' => '2022-10-20 20:10:22'
                ],
                [
                    'member_id' => 4,
                    'product_id' => 1,
                    'star' => 3,
                    'description' => null,
                    'created_at' => '2022-10-20 21:10:22'
                ],
                [
                    'member_id' => 6,
                    'product_id' => 1,
                    'star' => 5,
                    'description' => 'Sản phẩm rất đáng tiền',
                    'created_at' => '2022-10-21 20:10:22'
                ],
                [
                    'member_id' => 8,
                    'product_id' => 1,
                    'star' => 5,
                    'description' => null,
                    'created_at' => '2022-09-21 20:10:22'
                ]
            ]
        );
    }
}
