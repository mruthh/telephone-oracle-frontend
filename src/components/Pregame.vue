<template>
  <div class="d-flex flex-column justify-space-between">
    <div class="d-flex align-center">
      <h2>Game <span> {{ game.uuid }}</span></h2>
      <v-btn 
        small
        class="ml-4 black--text"
        color="secondary"
        @click="copyGameLink"
      >
        <span class="mr-2">Copy game link</span>
        <v-icon small>
          {{ copied ? 'fas fa-clipboard-check' : 'fas fa-clipboard' }}
        </v-icon>
      </v-btn>
    </div>
    
    <p class="font-italic">Waiting for players to join...</p>
    
    <v-form @submit.prevent="updatePlayer">
      <v-text-field 
        v-model="name"
        label="Player name"
        hint="Please enter your name"
        persistent-hint
        class="mb-8"
      />
    </v-form>

    <Players :players="players" :localPlayer="localPlayer" />
    <HostControls
      v-if="localPlayer.isHost"
      class="mt-4"
      status="open"
      @start="startGame"
    />
  </div>
</template>

<script>

import HostControls from './game/HostControls'
import Players from './game/Players'
import { startGame, updatePlayer } from '../libraries/api'

export default {
  name: 'Pregame',
  components: { HostControls, Players },
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
  methods: {
    async startGame () {
      const data = await startGame(this.game.uuid)
      this.$emit('started', data)
    },
    copyGameLink () {
      const el = document.createElement('input')
      el.value = `${process.env.VUE_APP_PUBLIC_PATH}/game/${this.game.uuid}`
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.copied = true
    },
    async updatePlayer () {
      const { data } = updatePlayer(this.localPlayer.uuid, { name: this.name })      
    }
  }

}
</script>
