import { defineStore } from "pinia";

export const useTicTacToeStore = defineStore('tictactoe', {
  state: () => ({
    game: {},
    activePlayer: {},
  }),
  getters: {
    activeMatch(state) {
      return state.game.matches.find(match => match.active === 1)
    },
    playerOne(state) {
      return state.game.player_one
    },
    playerTwo(state) {
      return state.game.player_two
    },
    isEmpty(state) {
      return Object.keys(state.game).length === 0
    },
    board() {
      return this.activeMatch.board
    },
  },
  actions: {
    makeMove(x, y) {
      this.game.matches.find(match => match.active === 1).board[x][y] = this.activePlayer.symbol
      this.setActivePlayer(this.activePlayer === this.playerOne ? this.playerTwo : this.playerOne)
    },
    async start(id) {
      await this.fillGame(id)
      this.setBoard()
      this.setActivePlayer(this.playerOne)
    },
    async fillGame(id) {
      await axios.get(`/api/game/${id}/start`)
        .then(response => this.game = response.data);
    },
    setBoard() {
      this.game.matches.find(match => match.active === 1).board = JSON.parse(this.activeMatch.board)
    },
    setActivePlayer(player) {
      this.activePlayer = player
    },
  },
})