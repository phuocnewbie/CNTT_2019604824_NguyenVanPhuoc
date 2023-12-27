<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('product_sizes')->insert(
            [
                [
                    'product_id' => 1,
                    'size_id' => 2,
                ],
                [
                    'product_id' => 1,
                    'size_id' => 3,
                ],
                [
                    'product_id' => 1,
                    'size_id' => 4,
                ]
            ]
        );
    }
}
