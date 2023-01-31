<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'name','book_type_id','is_borrow'
    ];

    public function types(){
        return $this->hasOne('App\Models\BookType','id','book_type_id');
    }
}
