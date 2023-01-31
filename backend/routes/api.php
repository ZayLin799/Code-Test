<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/getBook', [BookController::class, 'getBook']);
Route::get('/getBookType', [BookController::class, 'getBookType']);
Route::post('/storeBook', [BookController::class, 'storeBook']);

Route::group(['middleware' => ['jwt.verify']], function($router) {
    Route::post('/borrowProcess', [BookController::class, 'borrowProcess']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
