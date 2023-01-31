<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Book::create([
            'name' => 'Historical Book 1',
            'book_type_id' => '1',
        ]);
        Book::create([
            'name' => 'Historical Book 2',
            'book_type_id' => '1',
        ]);
        Book::create([
            'name' => 'Historical Book 3',
            'book_type_id' => '1',
        ]);
        Book::create([
            'name' => 'Science Book 1',
            'book_type_id' => '2',
        ]);
        Book::create([
            'name' => 'Science Book 2',
            'book_type_id' => '2',
        ]);
        Book::create([
            'name' => 'Science Book 3',
            'book_type_id' => '2',
        ]);
        Book::create([
            'name' => 'Science Book 1',
            'book_type_id' => '3',
        ]);
        Book::create([
            'name' => 'Science Book 2',
            'book_type_id' => '3',
        ]);
        Book::create([
            'name' => 'Science Book 3',
            'book_type_id' => '3',
        ]);
    }
}
