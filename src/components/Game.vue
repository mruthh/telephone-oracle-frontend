<template>
  <ActionPanel>
    <h2 v-if="!sheet">Waiting for the oracle...</h2>
    <h2 v-else-if="!lastLine || !lastLine.uuid" class="mb-4">
      Ask the oracle a question
    </h2>
    <h2 v-else class="font-italic mb-4">
      <span>{{ isQuestion ? 'Answer:' : 'Question:'}}</span>
      {{ lastLine.text }}
    </h2>
    <div v-if="sheet">
        <v-form @submit.prevent="addLine" class="d-md-flex align-start">
          <v-textarea 
            :label="label" 
            :rows="1"
            v-model="line"
            auto-grow 
            class="mr-8"
          />
          <v-btn type="submit" color="primary">
            {{ isQuestion ? 'Submit question' : 'Submit answer'}}
          </v-btn>
        </v-form>
      </div>
  </ActionPanel>
</template>

<script>


import ActionPanel from './wrappers/ActionPanel'
import { getLastLine, addLine } from '../libraries/api'

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
        line: null,
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
      },
      label () {
        if (!this.lastLine) return 'Please enter a question for the Oracle'
        return this.isQuestion ? 'Please enter a question' : 'Please enter an answer'
      }
    },
    methods: {
      addLine (event) {
        const text = this.line
        if (!text) {
          console.error('where is the text')
          return
        }
        this.line = null
        addLine({ 
          text,
          gameId: this.game.uuid,
          sheetId: this.sheet.uuid,
          playerId: this.localPlayer.uuid 
        })
      },
      endGame () {
        //TODO
      }
    },
    watch: {
      sheet: {
        // TODO: handle sheets with no lines yet
        async handler (sheet) {
          if (!sheet) return
          const { data } = await getLastLine(sheet.uuid)
          this.lastLine = data
        }
      }
    }
  }
</script>
