<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Matches;

class MatchesController extends Controller
{
    public function store(Request $request)
    {
        $match = Matches::create(['game_id' => $request->input('game_id')]);
        return response()->json([
            'match' => $match
        ], 201);
    }

    public function finish(Request $request)
    {
        $match = Matches::find($request->input('id'));
        $match->winner = $request->input('winner');
        $match->board = $request->input('board');
        $match->active = 0;
        $match->finished = 1;
        $match->save();
        return response()->json([
            'match' => $match
        ], 200);
    }
}
