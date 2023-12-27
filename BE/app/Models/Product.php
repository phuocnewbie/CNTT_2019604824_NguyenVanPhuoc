<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'quantity',
        'discount',
        'description',
        'category_id',
    ];

    public function size()
    {
        return $this->hasMany(ProductSize::class)->with('size');
    }
    public function color()
    {
        return $this->hasMany(Color::class);
    }
    public function image()
    {
        return $this->hasMany(Image::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
    public function rating()
    {
        return $this->hasMany(Rating::class)->with('member');
    }
}
