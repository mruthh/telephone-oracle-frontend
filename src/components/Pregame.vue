<template>
  <div class="d-flex flex-column justify-space-between">
    <p class="font-italic">Waiting for players to join...</p>
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
import { startGame } from '../libraries/api'

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
  methods: {
    async startGame () {
      const data = await startGame(this.game.uuid)
      this.$emit('started', data)
    },
  }

}
</script>
