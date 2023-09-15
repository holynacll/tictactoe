<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;
use App\Models\Player;
use App\Models\Matches;

class GameController extends Controller
{
    public function store(Request $request)
    {
        $players = [];
        foreach($request->all() as $player) {
            $players[] = Player::create($player);
        }
        $game = Game::create([
            'player_one_id' => $players[0]->id,
            'player_two_id' => $players[1]->id,
        ]);
        $game->matches()->create([
            'game_id' => $game->id,
        ]);
        return response()->json([
            'status' => 'success',
            'game' => $game
        ]);
    }

    public function start(string $id)
    {
        return response()->json(Game::with(['playerOne', 'playerTwo', 'matches'])->where('id', $id)->first());
    }
}
