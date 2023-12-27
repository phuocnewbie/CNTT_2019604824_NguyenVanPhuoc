<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;
    protected $fillable = [
        'member_id',
        'product_id',
        'star',
        'description',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}
