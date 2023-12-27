<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('sizes')->insert(
            [
                [
                    'description' => 'S',
                ],
                [
                    'description' => 'M',
                ],
                [
                    'description' => 'L',
                ],
                [
                    'description' => 'XL',
                ],
            ]
        );
    }
}
