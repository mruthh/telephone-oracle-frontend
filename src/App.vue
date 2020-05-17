<template>
  <div>
    <h1>Telephone Oracle - Pandemic Edition</h1>
    <Start
      v-if="!game"
      :hasError="hasGameCodeError"
      @start="initGame"
      @join="joinGame"
    />
    <Game 
      v-if="showGame" 
      :game="game" 
      :player="player"
      @playerCreated="setPlayer"
      @started="handleGameStart"
    />
    <Finale v-if="showFinale" :game="game" :player="player" />
  </div>
</template>

<script> 

import Game from './components/Game'
import Start from './components/Start'
import Finale from './components/Finale'
import { initGame } from './libraries/api'

export default {
  name: 'app',
  components: { Start, Game, Finale },
  data () {
    return {
      game: null,
      player: null,
      players: null,
      sheets: null,
      hasGameCodeError: false
    }
  },
  computed: {
    showGame () { 
      return this.game && ['open', 'active'].includes(this.game.status)
    },
    showFinale () {
      return this.game && this.game.status === 'complete'
    }
  },
  methods: {
    async initGame () {
      const { data } = await initGame()
      this.game = data.game
      this.player = data.player
    },
    joinGame (id) {
      // make api call with game id
      // if error, 
    },
    setPlayer (player) {
      this.player = player
    },
    handleGameStart (data) {
      this.game = data.game
      this.players = data.players
      this.sheets = data.sheets
    }
  }
}
</script>

<style lang="css">
  .flex {
    display: flex;
  }
</style>