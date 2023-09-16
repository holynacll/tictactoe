import { defineStore } from "pinia";

export const useTicTacToeStore = defineStore('tictactoe', {
  state: () => ({
    game: {
      id: '',
      matches: [],
      player_one: {},
      player_two: {},
    },
    activePlayer: {},
    inSettings: true,
    isLoading: false
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
    scorePlayerOne() {
      return this.game.matches.filter(match => match.winner === 0 && match.finished).reduce((accu) => accu + 1, 0)
    },
    scorePlayerTwo() {
      return this.game.matches.filter(match => match.winner === 1 && match.finished).reduce((accu) => accu + 1, 0)
    }
  },
  actions: {
    async finishMatch() {
      this.activeMatch.winner = this.activePlayer.symbol === 'X' ? 1 : 0
      this.activeMatch.finished = 1
      await axios.put(`/api/matches/finish`, this.activeMatch)
    },
    async createMatch() {
      await axios.post('/api/matches', {'game_id': this.game.id})
    },
    async newMatch() {
      this.isLoading = true;
      await this.createMatch()
      await this.start(this.game.id)
    },
    async start(id) {
      await this.fillGame(id)
      this.setBoard()
      this.setActivePlayer(this.playerOne)
      this.inSettings = false;
      this.isLoading = false;
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
    setMove(x, y) {
      this.game.matches.find(match => match.active === 1).board[x][y] = this.activePlayer.symbol
      this.setActivePlayer(this.activePlayer === this.playerOne ? this.playerTwo : this.playerOne)
    },
  },
})