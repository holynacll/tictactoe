<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'player_one_id',
        'player_two_id',
    ];

    public function playerOne()
    {
        return $this->hasOne(Player::class, 'id', 'player_one_id');
    }

    public function playerTwo()
    {
        return $this->hasOne(Player::class, 'id', 'player_two_id');
    }
 
    // public function matches(): BelongsToMany
    // {
    //     return $this->belongsToMany(Matches::class, 'role_user_table', 'user_id', 'role_id');
    // }

    // /**
    //  * Get the user that owns the Game
    //  *
    //  * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
    //  */
    // public function user(): BelongsTo
    // {
    //     return $this->belongsTo(User::class, 'foreign_key', 'other_key');
    // }

    public function matches()
    {
        return $this->hasMany(Matches::class, 'game_id', 'id');
    }
}
