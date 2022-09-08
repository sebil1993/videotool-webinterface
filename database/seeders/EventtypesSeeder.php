<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventtypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('eventtypes')->insert([
            'name' => "Zutritt",
        ]);
        DB::table('eventtypes')->insert([
            'name' => "Sabotage",
        ]);
    }
}
