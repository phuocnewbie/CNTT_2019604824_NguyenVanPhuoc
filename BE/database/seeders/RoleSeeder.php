<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            [
                "role_id" => "r0",
                "role_name" => "Quản trị viên",
            ],
            [
                "role_id" => "r1",
                "role_name" => "Nhân viên",
            ],
            [
                "role_id" => "r2",
                "role_name" => "Khách hàng",
            ],
        ]);
    }
}
