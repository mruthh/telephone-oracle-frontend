<template>
  <ActionPanel>    
    <!-- TODO: make this styled action panel text, add a real header -->
    <h2>{{ prompt }}</h2>
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
      },
      sheetId: {
        type: Number,
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
    },
    watch: {
      sheetId: {
        immediate: true,
        async handler (id) {
          
        }
      }
    }
  }
</script>
