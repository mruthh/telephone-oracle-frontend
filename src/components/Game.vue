<template>
  <ActionPanel>    
    <QuestionInput
      v-if="gameIsActive"
      @add="addLine"
    />
    <Players
      :players="players"
      :game="game"
      :localPlayer="localPlayer"
      @updateOrder="updatePlayerOrder"
    />
  </ActionPanel>
</template>

<script>


import ActionPanel from './wrappers/ActionPanel'
import QuestionInput from './game/QuestionInput'

  export default {
    name: 'Game',
    components: { QuestionInput },
    props: {
      game: {
        type: Object,
        required: true
      },
      localPlayer: {
        type: Object,
        default: null
      }
    },
    computed: {
      gameIsActive () {
        return this.game.status === 'active'
      },
      activeSheetId () {
        return this.localPlayer.queue.length ? this.localPlayer.queue[0] : null
      }
    },
    methods: {
      addLine (line) {
        addLine(this.sheetId, { line, playerId: this.localPlayer.uuid })
      },
      endGame () {
        //TODO
      }
    }
  }
</script>
