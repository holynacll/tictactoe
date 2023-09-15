<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matches extends Model
{
    use HasFactory;

    protected $fillable = [
        'game_id',
        'board',
    ];

    public function __construct(array $attributes = array()) {
        parent::__construct($attributes);
        $this->setAttribute('board', json_encode(array_fill(0, 3, array_fill(0, 3, 0))));
    }
}
