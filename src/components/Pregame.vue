<template>
  <div>
    <p class="font-italic">Waiting for players to join...</p>
    <HostControls 
      v-if="localPlayer.isHost"
      status="open"
      @start="startGame"
    />
    <ul>
      <Player 
        v-for="(player, index) in players" 
        :key="player.uuid" 
        :isUser="localPlayer.uuid === player.uuid"
        :order="index"
      />
    </ul>
  </div>
</template>

<script>

import HostControls from './game/HostControls'
import Player from './game/Player'
import { startGame } from '../libraries/api'

export default {
  name: 'Pregame',
  components: { HostControls, Player },
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
  methods: {
    async startGame () {
      const data = await startGame(this.game.uuid)
      this.$emit('started', data)
    },
  }

}
</script>
