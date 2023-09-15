<template>
  <div class="flex">
    <div class="mb-4 px-2 w-full">
      <p>{{ tictactoeStore.playerOne.name }}</p>
      <p>0</p>
    </div>
    <div class="mb-4 px-2 w-full">
      <p>{{ tictactoeStore.playerTwo.name }}</p>
      <p>0</p>
    </div>
  </div>
  <div class="flex flex-col items-center mb-8">
    <div v-for="(row, x) in tictactoeStore.board" :key="x" class="flex">
      <div v-for="(cell, y) in row"
        :key="y"
        @click="tictactoeStore.makeMove(x, y)" 
        :class="`border border-white w-24 h-24 hover:bg-gray-700 flex items-center justify-center material-icons-outlined text-4xl cursor-pointer ${cell === 'X' ? 'text-pink-500' : 'text-blue-400'}`">
        {{ cell === 'X' ? 'close' : cell === 'O' ? 'circle' : '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTicTacToeStore } from './../../stores/TicTacToeStore.js'
const tictactoeStore = useTicTacToeStore();

</script>