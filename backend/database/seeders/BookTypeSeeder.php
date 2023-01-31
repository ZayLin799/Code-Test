<?php

namespace Database\Seeders;

use App\Models\BookType;
use Illuminate\Database\Seeder;

class BookTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        BookType::create(['name' => 'Historical']);
        BookType::create(['name' => 'Science']);
        BookType::create(['name' => 'Adventure']);
    }
}
