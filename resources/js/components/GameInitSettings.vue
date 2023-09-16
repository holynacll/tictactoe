<template>
  <div class="flex flex-col justify-center items-center border border-color-red">
    <div class="mb-4 px-2 w-auto sm:w-96"> 
      <label class="block mb-1 text-xl" for="player1-name">Player 1</label>
      
      <div class="flex flex-row justify-center items-center">
        <input type="radio" v-model="players[0].mode" id="player1-mode-player-selected" value="player">
        <label class="px-1 py-2 pr-4" for="player1-mode-player-selected">Player</label>
        
        <input type="radio" v-model="players[0].mode" id="player1-mode-computer-selected" value="computer">
        <label class="px-1 py-2 pr-4" for="player1-mode-computer-selected">Computer</label>
      </div>
      
      <input type="text" id="player1-name" 
        v-model.lazy="players[0].name" 
        placeholder="type your name"
        class="w-full border px-4 py-2 rounded-full bg-gray-800 focus:border-blue-500 focus:shadow-outline outline-none outline-none"/>
    </div>
    <div class="mb-4 px-2 w-auto sm:w-96">
      <label class="block mb-1 text-xl" for="player2-name">Player 2</label>
      
      <div class="flex flex-row justify-center items-center">
        <input type="radio" v-model="players[1].mode" id="player2-mode-player-selected" value="player">
        <label class="px-1 py-2 pr-4" for="player2-mode-player-selected">Player</label>
        
        <input type="radio" v-model="players[1].mode" id="player2-mode-computer-selected" value="computer">
        <label class="px-1 py-2 pr-4" for="player2-mode-computer-selected">Computer</label>
      </div>

      <input type="text" id="player2-name" 
        v-model.lazy="players[1].name"
        placeholder="type your name"
        class="w-full border px-4 py-2 rounded-full bg-gray-800 focus:border-blue-500 focus:shadow-outline outline-none outline-none"/>
    </div>
    <button @click="start" class="mx-2 my-2 px-8 py-4 text rounded-full text-white bg-blue-500 focus:outline-none hover:bg-blue-400">Start</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import generateName from './RandomNameGenerator.js'
import { useTicTacToeStore } from '@/stores/TicTacToeStore.js'
const tictactoeStore = useTicTacToeStore();

const players = ref(
  [
    {
      name: '',
      mode: 'player',
      symbol: 'X',
    },
    {
      name: '',
      mode: 'player',
      symbol: 'O',
    },
  ]
)

function start() {
  if(hasValidInput()) {
    createGame()
  } else {
    alert("please, fill the inputs for play the game.")
  }
}

async function createGame() {
  await axios.post("/api/game", players.value)
    .then(response => tictactoeStore.start(response.data.game.id))
}

function hasValidInput() {
  return players.value.filter(player => player.name.trim() && player.mode.trim()).length > (players.value.length - 1)
}
// watch(players.value, (x) => {
//   player = players.find(player => player.mode === 'computer')
// })

const asignComputerName = (player) => {
  if (player.mode === 'computer') {
    player.name = generateName();
  } else {
    player.name = '';
  }
}
</script>