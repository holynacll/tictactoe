<template>
  <div class="flex">
    <div class="mb-4 px-2 w-full">
      <p>{{ tictactoeStore.playerOne.name }}</p>
      <p>{{ tictactoeStore.scorePlayerOne}}</p>
    </div>
    <div class="mb-4 px-2 w-full">
      <p>{{ tictactoeStore.playerTwo.name }}</p>
      <p>{{ tictactoeStore.scorePlayerTwo}}</p>
    </div>
  </div>
  <div class="flex flex-col items-center mb-8">
    <div v-for="(row, x) in tictactoeStore.activeMatch.board" :key="x" class="flex">
      <div v-for="(cell, y) in row"
        :key="y"
        @click="makeMove(x, y)" 
        :class="`border border-white w-24 h-24 hover:bg-gray-700 flex items-center justify-center material-icons-outlined text-4xl cursor-pointer ${cell === 'X' ? 'text-pink-500' : 'text-blue-400'}`">
        {{ cell === 'X' ? 'close' : cell === 'O' ? 'circle' : '' }}
      </div>
    </div>
  </div>
  <div class="flex flex-col items-center mb-8">
    <h2 v-if="winner" class="text-6xl font-bold mb-8">Player '{{ winner }}' wins</h2>

    <button class="px-4 py-2 bg-ping-500 rounded uppercase font-bold houver:bg-pink-600 duration-300" 
    @click="tictactoeStore.newMatch">New Match</button>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useTicTacToeStore } from '@/stores/TicTacToeStore.js'
const tictactoeStore = useTicTacToeStore()

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const winner = computed(() => calculateWinner(tictactoeStore.activeMatch.board.flat()))

const makeMove = (x, y) => {
  if (winner.value) return
  if (tictactoeStore.activeMatch.board[x][y] != 0) return
  tictactoeStore.setMove(x, y)
  if(tictactoeStore.activePlayer.mode === 'computer') setTimeout(makeComputerMove(), 1000)
}

watch(winner, () => {tictactoeStore.finishMatch()})

const makeComputerMove = () => {
  let possibleMoves = []
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (tictactoeStore.activeMatch.board[i][j] === 0) {
          possibleMoves.push([i, j])
        }
      }
    }
    let randomInt = Math.floor(Math.random() * (possibleMoves.length-1))
    let coords = possibleMoves[randomInt]
    if(coords !== undefined)
    makeMove(coords[0], coords[1])
}
 
</script>