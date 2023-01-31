<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookType;
use Illuminate\Http\Request;
use App\Models\BorrowProcess;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\BaseController as BaseController;

class BookController extends BaseController
{
    protected $header = array(
            'Content-type' => 'application/json',
            'charset' => 'utf-8',
    );

    public function getBook()
    {
        try {
            $books = DB::table('books')
            ->select('books.name','books.id','book_types.name as type_name','is_borrow')
            ->join('book_types', 'books.book_type_id', '=', 'book_types.id')
            ->get();
            return response()->json(
                [
                    'status' => 'success',
                    'data' => $books,
                ],
                200,
                $this->header, JSON_UNESCAPED_UNICODE
            );
        } catch (\Exception $e) {
            return response()->json($e->getmessage(), 500, $this->header, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getBookType()
    {
        try {
            $book_types = BookType::all();
            return response()->json(
                [
                    'status' => 'success',
                    'data' => $book_types,
                ],
                200,
                $this->header, JSON_UNESCAPED_UNICODE
            );
        } catch (\Exception $e) {
            return response()->json($e->getmessage(), 500, $this->header, JSON_UNESCAPED_UNICODE);
        }
    }

    public function storeBook(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'book_type_id' => 'required',
            ]);

            $book = new Book();
            $book->name = $request['name'];
            $book->book_type_id = $request['book_type_id'];
            $book->save();

            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'Book saved successful!',
                ],
                200,
                $this->header, JSON_UNESCAPED_UNICODE
            );
        } catch (\Exception $e) {
            return response()->json($e->getmessage(), 500, $this->header, JSON_UNESCAPED_UNICODE);
        }
    }

    public function borrowProcess(Request $request)
    {
        try {
            $data =  $request->books;
            $checkProcess = BorrowProcess::where('user_id',auth()->user()->id)->count();

            if($checkProcess < 5){

                foreach ($data as $key => $value) {

                    $book = Book::findOrFail($value);
                    $book->is_borrow = 0;
                    $book->update();

                    $process = new BorrowProcess();
                    $process->book_id = $value;
                    $process->user_id = auth()->user()->id;
                    $process->save();
                }

                return response()->json(
                    [
                        'status' => 'success',
                        'message' => 'Borrow Process saved successful!',
                    ],
                    200,
                    $this->header, JSON_UNESCAPED_UNICODE
                );
            }
            else{
                return response()->json(
                    [
                        'status' => 'fail',
                        'message' => 'Book limit reached!',
                    ],
                    200,
                    $this->header, JSON_UNESCAPED_UNICODE
                );
            }
        } catch (\Exception $e) {
            return response()->json($e->getmessage(), 500, $this->header, JSON_UNESCAPED_UNICODE);
        }
    }


}
