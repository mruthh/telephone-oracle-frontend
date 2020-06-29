<template>
  <v-app>
    <header 
      class="accent pa-2 mb-4 lime--text text--lighten-5 elevation-5"
    >
      <h1 class="">Telephone Oracle</h1>
      <p class="subtitle-1 font-italic">Pandemic edition</p>
    </header>
    <v-main class="mx-4">
    <Start
      v-if="!game"
      :hasError="hasGameCodeError"
      @start="initGame"
      @join="joinGame"
    />
    <component v-if="game && players && localPlayer" :is="gameComponent"
      :game="game" 
      :localPlayer="localPlayer"
      :players="players"
    />
    </v-main>
  </v-app>
</template>

<script> 

import Start from './components/Start'
import Pregame from './components/Pregame'
import Game from './components/Game'
import Finale from './components/Finale'
import io from 'socket.io-client'
import { initGame, getGame, createPlayer } from './libraries/api'

export default {
  name: 'app',
  components: { Start, Pregame, Game, Finale },
  data () {
    return {
      game: null,
      localPlayerId: null,
      players: null,
      sheets: null,
      hasGameCodeError: false,
      socket: null
    }
  },
  computed: {
    gameComponent () {
      if (!this.game) return null
      if (this.game.status === 'open') return 'Pregame'
      if (this.game.status === 'active') return 'Game'
      return 'Finale'
    },
    localPlayer () {
      if (!this.localPlayerId || !this.players.length) return null
      return this.players.find(player => player.uuid === this.localPlayerId)
    },
    ioNamespace () {
      if (!this.game) return null
      return process.env.VUE_APP_BASE_URL + '/' + this.game.uuid
    }
  },
  watch: {
    'window.location': {
      deep: true,
      handler: (to, from) => {
        if (to.location === from.location) return
        this.getGameFromRoute() 
      }
    }
  },
  created () {
    this.getGameFromRoute()
  },
  beforeDestroy() {
    this.socket.disconnect()
  },
  methods: {
    async initGame () {
      const { data } = await initGame()
      this.game = data.game
      this.players = data.players
      this.localPlayerId = data.players[0].uuid
      this.initSocket()
    },
    initSocket (gameId) {
      this.socket = io(this.ioNamespace)
        this.socket.on('connect', () => {
          console.log('connected to socket!')
        })
        this.socket.on('disconnect', function(){
          console.log('disconnected!')
        })
        this.socket.on('player:add', (player) => {
          this.addPlayer(player)
        })
    },
     addPlayer (player) {
      const existingPlayer = this.players.find(p => {
        player.uuid === p.uuid
      })
      if (existingPlayer) return
      this.players = [...this.players, player]
    },
    async joinGame (id) {
      // make api call with game id
      try {
        const { data } = await getGame(id)
        const { game, players } = data
        
        if (game.status !== 'open') {
          console.error('this game code is incorrect, or this game is not accepting new players')
          return
        }
        
        // if game is open, connect to socket and create a player
        this.game = game
        this.players = players
        this.initSocket(game.uuid)

        // we can't use { data } here because it's already been declared
        const player = await createPlayer(game.uuid)
        this.addPlayer(player.data)
        this.localPlayerId = player.data.uuid
      } catch (e) {
        console.error(e)
      }
    },
    async createPlayer () {
      this.player = player
    },
    handleGameStart (data) {
      this.game = data.game
      this.players = data.players
      this.sheets = data.sheets
    },
    getGameFromRoute () {
      // if there is a gameId in the page route, connect player to the correct game
      const route = window.location.href.split('/')
      const gameIndex = route.findIndex(segment => segment === 'game')
      if (gameIndex === -1) return
      const gameId = route[gameIndex + 1]
      this.joinGame(gameId)
    }
  }
}
</script>