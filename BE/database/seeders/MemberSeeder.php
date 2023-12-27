<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('members')->insert(
            [
                [
                    'full_name' => 'Lê Hồng Phú',
                    'email' => 'phuhd2k1@gmail.com',
                    'phone' => '0367769261',
                    'address' => 'Minh Khai, Từ Liêm, Hà Nội',
                    'gender' => 'Nam',
                    'date_of_birth' => '2001-05-02',
                    'avatar' => 'images/d841704018188c475f9a3c3fcda40464.jpg',
                    'username' => 'lehongphu25',
                    'password' => bcrypt('@phu205051#'),
                    'role_id' => 'r0',
                ],
                [
                    'full_name' => 'ADMIN',
                    'email' => 'admin@gmail.com',
                    'phone' => '0987654321',
                    'address' => 'Minh Khai, Từ Liêm, Hà Nội',
                    'gender' => 'Nam',
                    'date_of_birth' => '2001-01-01',
                    'avatar' => 'images/d841704018188c475f9a3c3fcda40464.jpg',
                    'username' => 'admin',
                    'password' => bcrypt('@pass123456'),
                    'role_id' => 'r0',
                ],
                [
                    'full_name' => 'Nguyễn Văn Phước',
                    'email' => 'nguyenvanphuoc@gmail.com',
                    'phone' => '0987654321',
                    'address' => 'Minh Khai, Từ Liêm, Hà Nội',
                    'gender' => 'Nam',
                    'date_of_birth' => '2001-01-01',
                    'avatar' => 'images/d841704018188c475f9a3c3fcda40464.jpg',
                    'username' => null,
                    'password' => bcrypt('@pass123456'),
                    'role_id' => 'r2',
                ],
                [
                    'full_name' => 'Nguyễn Văn A',
                    'email' => 'nguyenvana@gmail.com',
                    'phone' => '0377777777',
                    'address' => 'Từ Liêm, Hà Nội',
                    'password' => bcrypt('@pass123456'),
                    'gender' => null,
                    'date_of_birth' => null,
                    'avatar' => 'images/a986302c6bb2e21c396a98aebf115ffe.png',
                    'username' => null,
                    'role_id' => 'r2',
                ],
                [
                    'full_name' => 'Trần Văn B',
                    'email' => 'tranvanb@gmail.com',
                    'phone' => '0366666666',
                    'address' => 'Từ Liêm, Hà Nội',
                    'password' => bcrypt('@pass123456'),
                    'gender' => null,
                    'date_of_birth' => null,
                    'avatar' => 'images/a986302c6bb2e21c396a98aebf115ffe.png',
                    'username' => null,
                    'role_id' => 'r2',
                ],
                [
                    'full_name' => 'Phạm Thị C',
                    'email' => 'phamthic@gmail.com',
                    'phone' => '0355555555',
                    'address' => 'Từ Liêm, Hà Nội',
                    'password' => bcrypt('@pass123456'),
                    'gender' => null,
                    'date_of_birth' => null,
                    'avatar' => 'images/a986302c6bb2e21c396a98aebf115ffe.png',
                    'username' => null,
                    'role_id' => 'r2',
                ],
            ]
        );
    }
}
