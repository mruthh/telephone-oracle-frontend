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
        :sheet="activeSheet"
      />
      
      <v-container v-if="game" fluid>
        <v-row class="d-md-flex justify-space-between align-stretch">
          <Players :players="players" :localPlayer="localPlayer" class="ma-2"/>
          <GameInfo 
            :game="game" 
            :localPlayer="localPlayer"
            class="ma-2"
            @start="startGame"
          />
        </v-row>
      </v-container>
  
    </v-main>
  </v-app>
</template>

<script> 

import Start from './components/Start'
import Pregame from './components/Pregame'
import Game from './components/Game'
import Finale from './components/Finale'
import Players from './components/game/Players'
import GameInfo from './components/game/GameInfo'
import io from 'socket.io-client'
import { initGame, startGame, getGame, createPlayer, getPlayers } from './libraries/api'

export default {
  name: 'app',
  components: { Start, Pregame, Game, Finale, Players, GameInfo },
  data () {
    return {
      game: null,
      localPlayerId: null,
      players: null,
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
    },
    activeSheet () {
      if (this.localPlayer && this.localPlayer.queue && this.localPlayer.queue.length) {
        return this.localPlayer.queue[0]
      }
      return null
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
    if (this.socket) {
      this.socket.disconnect()
    }
  },
  methods: {
    async initGame () {
      const { data } = await initGame()
      this.game = data.game
      this.players = data.players
      this.localPlayerId = data.players[0].uuid
      this.storePlayerId()
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
          console.log('player added!')
          this.getPlayers()
        })
        this.socket.on('player:update', (player) => {
          this.handlePlayerUpdate(player)
        })
        this.socket.on('game:start', (data) => {
          this.players = data.players
          this.game = data.game

        })
    },
    async getPlayers () {
      const { data } = await getPlayers(this.game.uuid)
      this.players = data
      console.log('getPlayers')
      console.log(this.players)
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
        this.loadPlayer()
      } catch (e) {
        console.error(e)
      }
    },
    async loadPlayer () {
      const id = await window.localStorage.getItem('localPlayerId')
      // if stored id matches a player in this game, don't create a new player
      if (id && this.players.find(player => player.uuid === id)) {
        this.localPlayerId = id
        return
      }
      this.createPlayer()
      this.getPlayers()
    },
    async createPlayer () {
      try {
        const { data } = await createPlayer(this.game.uuid)
        this.localPlayerId = data.uuid
        this.storePlayerId()
      } catch (e) {
        console.error(e)
      }
    },
    startGame () {
      startGame(this.game.uuid)
    },
    storePlayerId () {
      window.localStorage.setItem('localPlayerId', this.localPlayerId)
    },
    getGameFromRoute () {
      // if there is a gameId in the page route, connect player to the correct game
      const route = window.location.href.split('/')
      const gameIndex = route.findIndex(segment => segment === 'game')
      if (gameIndex === -1) return
      const gameId = route[gameIndex + 1]
      this.joinGame(gameId)
    },
    handlePlayerUpdate (player) {
      const oldPlayerIndex = this.players.findIndex(p => p.uuid === player.uuid)
      const players = [...this.players]
      players.splice(oldPlayerIndex, 1, player)
      this.players = players
    }
  }
}
</script>