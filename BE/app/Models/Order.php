<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'member_id',
        'status',
        'note',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }
    public function order_detail() {
        return $this->hasMany(OrderDetail::class)->with('product');
    }
}
