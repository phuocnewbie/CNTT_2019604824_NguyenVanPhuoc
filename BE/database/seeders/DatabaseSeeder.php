<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $this->call(
            [
                RoleSeeder::class,
                MemberSeeder::class,
                ContactSeeder::class,
                SizeSeeder::class,
                CategorySeeder::class,
                CarouselSeeder::class,
                ProductSeeder::class,
                ImageSeeder::class,
                ColorSeeder::class,
                ProductSizeSeeder::class,
                CartSeeder::class,
                RatingSeeder::class,
                OrderSeeder::class,
                OrderDetailSeeder::class,
                
                // ScheduleSeeder::class,
            ]
        );
    }
}
