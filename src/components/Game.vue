<template>
  <ActionPanel>    
    <!-- TODO: make this styled action panel text, add a real header -->
    <div v-if="!sheet">Waiting for the oracle...</div>
    <div v-if="sheet">
      <div v-if="!lastLine">
        <p>Please enter a question for the Oracle</p>
        <v-form @submit.prevent="" class="d-md-flex align-center">
          <v-text-field class="mr-8"></v-text-field>
          <v-btn type="submit" color="primary">
            {{ isQuestion ? 'Submit question' : 'Submit answer'}}
          </v-btn>
        </v-form>
      </div>
      <div v-if="lastLine && lastLine.text">
        <p>{{ isQuestion ? 'Your answer' : 'Your question'}}</p>
        <p>{{ isQuestion ? 'Please enter a question' : 'Please enter an answer' }}</p>
      </div>
    </div>
  </ActionPanel>
</template>

<script>


import ActionPanel from './wrappers/ActionPanel'
import { getLastLine } from '../libraries/api'

  export default {
    components: { ActionPanel },
    name: 'Game',
    props: {
      game: {
        type: Object,
        required: true
      },
      localPlayer: {
        type: Object,
        default: null
      },
      sheet: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        lastLine: null
      }
    },
    computed: {
      gameIsActive () {
        return this.game.status === 'active'
      },
      isQuestion () {
        // if last line was an answer, this is a question
        if (!this.lastLine) return true
        return !(this.lastLine.order % 2)
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
      sheet: {
        // TODO: handle sheets with no lines yet
        async handler (sheet) {
          if (!sheet.uuid) return
          const line = await getLastLine(sheet.uuid)
          this.lastLine = line
        }
      }
    }
  }
</script>
