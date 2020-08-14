<template>
  <ActionPanel>
    <h2>{{ isQuestion ? 'Ask a question' : 'Answer a question' }}</h2>    
    <p v-if="lastLine" class="font-italic my-4">
      <span>{{ isQuestion ? 'Answer:' : 'Question:'}}</span>
      {{ lastLine.text }}
    </p>
    <div v-if="!sheet">Waiting for the oracle...</div>
    <div v-if="sheet">
        <v-form @submit.prevent="addLine" class="d-md-flex align-start">
          <v-textarea 
            :label="label" 
            :rows="1" 
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
        const text = event.target[0].value
        if (!text) {
          console.error('where is the text')
          return
        }
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
