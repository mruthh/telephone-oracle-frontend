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
      :players="players"
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
import io from 'socket.io-client'
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
      hasGameCodeError: false,
      socket: null
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

      this.socket = io(process.env.VUE_APP_BASE_URL)
        this.socket.on('connect', () => {
          console.log('connected to socket!')
        })
        this.socket.on('update', (data) => {
          this.game = data.game,
          this.players = data.players,
          this.sheets = data.sheets
        })
        this.socket.on('disconnect', function(){
          console.log('disconnected!')
        })
    },
    broadcast(data) {

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
    },
    created () {
      // TODO: fetch players when needed OR add thru socket
    },
    beforeDestroy() {
      this.socket.disconnect()
    }
  }
}
</script>

<style lang="css">
  .flex {
    display: flex;
  }
</style>