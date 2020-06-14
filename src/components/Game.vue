<template>
  <div>
    {{ game.uuid }}
    <HostControls 
      v-if="player.isHost"
      status="active"
      @start="startGame"
      @end="endGame"
    />
    <QuestionInput
      v-if="gameIsActive"
      :sheetId="activeSheetId"
      @add="addLine"
    />
    <Players
      :players="players"
      :game="game"
      :localPlayer="player"
      @updateOrder="updatePlayerOrder"
    />
  </div>
</template>

<script>

import HostControls from './game/HostControls'
import Players from './game/Players'
import QuestionInput from './game/QuestionInput'

  export default {
    name: 'Game',
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
      endGame () {
        //TODO
      }
    }
  }
</script>
