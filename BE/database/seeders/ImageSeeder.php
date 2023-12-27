<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('images')->insert(
            [
                [
                    'url' => 'images/44537ae5bed8ccf91347de0a06aa13630.jpg',
                    'product_id' => 1,

                ],
                [
                    'url' => 'images/44537ae5bed8ccf91347de0a06aa13631.jpg',
                    'product_id' => 1,

                ],
                [
                    'url' => 'images/44537ae5bed8ccf91347de0a06aa13632.jpg',
                    'product_id' => 1,

                ],
                [
                    'url' => 'images/8ef0dcb6ca4a9e6842c4fc384b48e7d7.jpg',
                    'product_id' => 1,

                ],
                [
                    'url' => 'images/8ef0dcb6ca4a9e6842c4fc384b48e7d71.jpg',
                    'product_id' => 1,

                ],
                [
                    'url' => 'images/8ef0dcb6ca4a9e6842c4fc384b48e7d72.jpg',
                    'product_id' => 1,

                ],
                [
                    'url' => 'images/8ef0dcb6ca4a9e6842c4fc384b48e7d7.jpg',
                    'product_id' => 2,

                ],
                [
                    'url' => 'images/8ef0dcb6ca4a9e6842c4fc384b48e7d71.jpg',
                    'product_id' => 2,

                ],
                [
                    'url' => 'images/8ef0dcb6ca4a9e6842c4fc384b48e7d72.jpg',
                    'product_id' => 2,

                ],
                [
                    'url' => 'images/8ef0dcb6ca4a9e6842c4fc384b48e7d73.jpg',
                    'product_id' => 2,

                ],
                [
                    'url' => 'images/aokhoac4.jpg',
                    'product_id' => 3,

                ],
                [
                    'url' => 'images/aokhoac1.jpg',
                    'product_id' => 3,

                ],
                [
                    'url' => 'images/aokhoac2.jpg',
                    'product_id' => 3,

                ],
                [
                    'url' => 'images/aokhoac3.jpg',
                    'product_id' => 3,

                ],
                [
                    'url' => 'images/aokhoac4.jpg',
                    'product_id' => 4,

                ],
                [
                    'url' => 'images/aokhoac1.jpg',
                    'product_id' => 4,

                ],
                [
                    'url' => 'images/aokhoac2.jpg',
                    'product_id' => 4,

                ],
                [
                    'url' => 'images/aokhoac3.jpg',
                    'product_id' => 4,

                ],
                [
                    'url' => 'images/dongho_2.jpg',
                    'product_id' => 5,

                ],
                [
                    'url' => 'images/dongho_3.jpg',
                    'product_id' => 5,

                ],
                [
                    'url' => 'images/dongho_4.jpg',
                    'product_id' => 5,

                ],
                [
                    'url' => 'images/dongho_5.jpg',
                    'product_id' => 5,

                ],
                [
                    'url' => 'images/kinhram_1.jpg',
                    'product_id' => 6,

                ],
                [
                    'url' => 'images/kinhram_2.jpg',
                    'product_id' => 6,

                ],
                [
                    'url' => 'images/kinhram_3.jpg',
                    'product_id' => 6,

                ],
                [
                    'url' => 'images/kinhram_4.jpg',
                    'product_id' => 6,
                ],
                [
                    'url' => 'images/dongho_2.jpg',
                    'product_id' => 7,

                ],
                [
                    'url' => 'images/dongho_3.jpg',
                    'product_id' => 7,

                ],
                [
                    'url' => 'images/dongho_4.jpg',
                    'product_id' => 7,

                ],
                [
                    'url' => 'images/dongho_5.jpg',
                    'product_id' => 7,

                ],
                [
                    'url' => 'images/kinhram_1.jpg',
                    'product_id' => 8,

                ],
                [
                    'url' => 'images/kinhram_2.jpg',
                    'product_id' => 8,

                ],
                [
                    'url' => 'images/kinhram_3.jpg',
                    'product_id' => 8,

                ],
                [
                    'url' => 'images/kinhram_4.jpg',
                    'product_id' => 8,
                ]
            ]
        );
    }
}
