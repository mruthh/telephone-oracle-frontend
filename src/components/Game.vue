<template>
  <div>
    <HostControls v-if="player.isHost"></HostControls>
  </div>
</template>

<script>

import HostControls from './HostControls'
import Players from './Players'

  export default {
    props: {
      game: {
        type: Object,
        required: true
      },
      player: {
        type: Object,
        default: null
      }
    },
    created () {
      if (!this.player) {
        // create new player
        // pass player back to App
        this.$emit('playerCreated')
      }
    }
  }
</script>
