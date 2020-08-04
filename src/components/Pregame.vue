<template>
  <div class="d-flex flex-column justify-space-between">
    <ActionPanel>
      <div v-if="!localPlayer.name">
        <h2>Please enter your name</h2>
        <v-form @submit.prevent="updatePlayer">
          <v-text-field 
            v-model="name"
            label="Player name"
            hint="Please enter your name"
            persistent-hint
            class="mb-8"
          />
        </v-form>
      </div>
      
      <div v-else>
        <div class="d-flex justify-space-between align-center">
          <h2>Welcome!</h2>
          <v-btn 
            small
            class="ma-4 black--text"
            color="secondary"
            @click="copyGameLink"
          >
            <span class="mr-2">Copy invite link</span>
            <v-icon small>
              {{ copied ? 'fas fa-clipboard-check' : 'fas fa-clipboard' }}
            </v-icon>
          </v-btn>
        </div>
        <p class="font-italic">Waiting for players to join...
          
        </p>
      </div>
    </ActionPanel>
    <v-container fluid>
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
  </div>
</template>

<script>

import Players from './game/Players'
import GameInfo from './game/GameInfo'
import ActionPanel from './wrappers/ActionPanel'
import { startGame, updatePlayer } from '../libraries/api'

export default {
  name: 'Pregame',
  components: { Players, GameInfo, ActionPanel },
  props: {
    players: {
      type: Array,
      required: true
    },
    game: {
      type: Object,
      required: true
    },
    localPlayer: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      copied: false,
      name: ''
    }
  },
  computed: {
    gameLink () {
      return `${process.env.VUE_APP_PUBLIC_PATH}/game/${this.game.uuid}`
    }
  },
  methods: {
    copyGameLink () {
      const el = document.createElement('input')
      el.value = this.gameLink
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.copied = true
    },
    async startGame () {
      const data = await startGame(this.game.uuid)
      this.$emit('started', data)
    },
    async updatePlayer () {
      const { data } = updatePlayer(this.localPlayer.uuid, { name: this.name })      
    }
  }

}
</script>
