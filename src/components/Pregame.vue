<template>
  <div class="d-flex flex-column justify-space-between">
    <ActionPanel>
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
