<script setup>
import GameInitSettings from './GameInitSettings.vue'
import GameStart from './GameStart.vue'
import { useTicTacToeStore } from '@/stores/TicTacToeStore.js'
const tictactoeStore = useTicTacToeStore();
</script>

<template>
  <main class="pt-8 text-center dark:bg-gray-800 min-h-screen dark:text-white">
    <h1 class="mb-8 text-3xl font-bold uppercase">Jogo da Velha</h1>
    <GameInitSettings v-if="tictactoeStore.inSettings"/>
    <GameStart v-else/>
  </main>
</template>
