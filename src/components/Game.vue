<template>
  <div>
    <HostControls 
      v-if="player.isHost"
      :status="game.status"
      @start="startGame"
      @end="endGame"
    />
    <QuestionInput
      v-if="gameIsActive"
      :sheetId="activeSheetId"
      @add="addLine"
    />
  </div>
</template>

<script>

import HostControls from './game/HostControls'
import Players from './game/Players'
import QuestionInput from './game/QuestionInput'
import { startGame, addLine } from '../libraries/api'

  export default {
    components: { HostControls, Players, QuestionInput },
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
      gameIsActive () {
        return this.game.status === 'active'
      },
      activeSheetId () {
        return this.player.queue.length ? this.player.queue[0] : null
      }
    },
    methods: {
      addLine (line) {
        addLine(this.sheetId, { line, playerId: this.player.uuid })
      },
      startGame () {
        return startGame(this.game.uuid)
      },
      endGame () {
        //TODO
      }
    }
  }
</script>
