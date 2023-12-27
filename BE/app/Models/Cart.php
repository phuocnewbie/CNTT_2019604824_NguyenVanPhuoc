<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id',
        'product_id',
        'color',
        'size',
        'quantity',
    ];

    public $timestamps = false;

    public function product()
    {
        return $this->belongsTo(Product::class)->with('image');
    }
}
