<template>
  <div>
    <HostControls 
      v-if="player.isHost"
      @start="startGame"
      @end="endGame"
    />
    <QuestionInput
      :sheetId="activeSheetId"
      @add="addLine"
    />
  </div>
</template>

<script>

import HostControls from './game/HostControls'
import Players from './game/Players'
import QuestionInput from './game/QuestionInput'
import { addLine } from '../libraries/api'

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
    },
    computed: {
      activeSheetId () {
        return this.player.queue.length ? this.player.queue[0] : null
      }
    },
    methods: {
      addLine (line) {
        addLine(this.sheetId, { line, playerId: this.player.uuid })
      }
    }
  }
</script>
