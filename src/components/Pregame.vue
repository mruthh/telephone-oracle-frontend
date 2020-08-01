<template>
  <div class="d-flex flex-column justify-space-between">
    
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
    <GameInfo :gameId="game.uuid" />
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
import GameInfo from './game/GameInfo'
import { startGame, updatePlayer } from '../libraries/api'

export default {
  name: 'Pregame',
  components: { HostControls, Players, GameInfo },
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
    async updatePlayer () {
      const { data } = updatePlayer(this.localPlayer.uuid, { name: this.name })      
    }
  }

}
</script>
