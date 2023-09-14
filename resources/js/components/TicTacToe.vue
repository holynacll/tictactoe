<script setup>
import Game from './Game.vue'
import Match from './Match.vue'
import { ref } from 'vue'

const game = ref({
  id: 1,
  players: [
    { //player 1
      id: 1,
      symbol: 'X',
      name: '',
      mode: '',
    },
    { //player 2
      id: 2,
      symbol: 'O',
      name: '',
      mode: '',
    },
  ],
  matches: [
    {
      id: 1,
      id_game: 1,
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      id_player_winner: '',
      active: 1,
      finished: 0,
    },
  ]
})
const players = game.value.players
const board = game.value.matches.find(match => match.active === 1).board
let activePlayer = players[0]

const MakeMove = (x, y) => {
  board[x][y] = activePlayer.symbol
  activePlayer = players[0] === activePlayer ? players[1] : players[0] 
}

</script>

<template>
  <main class="pt-8 text-center dark:bg-gray-800 min-h-screen dark:text-white">
    <h1 class="mb-8 text-3xl font-bold uppercase">Jogo da Velha</h1>
    <Game/>
    <div class="flex">
      <!-- players -->
      <div class="mb-4 px-2 w-full"> 
        <label class="block mb-1 text-sm" for="player1-name">Player 1</label>
        <input type="radio" id="player1-mode-player-selected" name="player1-mode-selected" value=""> <label for="player1-mode-player-selected">Player</label>
        <input type="radio" id="player1-mode-computer-selected" name="player1-mode-selected" value=""> <label for="player1-mode-computer-selected">Computer</label>
        <input type="text" id="player1-name" v-model="players[0].name" class="w-full border px-4 py-2 rounded-full bg-gray-800 focus:border-blue-500 focus:shadow-outline outline-none outline-none"/>
      </div>
      <div class="mb-4 px-2 w-full">
        <label class="block mb-1 text-sm" for="player2-name">Player 2</label>
        <input type="radio" id="player2-mode-player-selected" name="player2-mode-selected" value=""> <label for="player2-mode-player-selected">Player</label>
        <input type="radio" id="player2-mode-computer-selected" name="player2-mode-selected" value=""> <label for="player2-mode-computer-selected">Computer</label>
        <input type="text" id="player2-name" v-model="players[1].name" class="w-full border px-4 py-2 rounded-full bg-gray-800 focus:border-blue-500 focus:shadow-outline outline-none outline-none"/>
      </div>
      <!-- players -->
      <button class="mx-2 my-2 px-8 py-4 text rounded-full text-white bg-blue-500 focus:outline-none hover:bg-blue-400">Start</button>
    </div>
    <Match/>
    <div class="flex">
      <div class="mb-4 px-2 w-full">
        <div v-for="player in players" :key="player.id">
          <p>{{ player.name }}</p>
          <p>{{ player.score }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center mb-8">
      <div v-for="(row, x) in board" :key="x" class="flex">
        <div v-for="(cell, y) in row"
          :key="y"
          @click="MakeMove(x, y)" 
          :class="`border border-white w-24 h-24 hover:bg-gray-700 flex items-center justify-center material-icons-outlined text-4xl cursor-pointer ${cell === 'X' ? 'text-pink-500' : 'text-blue-400'}`">
          {{ cell === 'X' ? 'close' : cell === 'O' ? 'circle' : '' }}
        </div>
      </div>
    </div>
  </main>
</template>
