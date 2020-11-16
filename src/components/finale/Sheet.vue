<template>
<div>
  <div>
    <h3>Question</h3>
    <p>{{ firstLineText }}</p>
  </div>
  <div>
    <h3>Answer</h3>
    <v-btn 
      v-if="!showAnswer" 
      class="black--text"
      color="secondary"
      @click="showAnswer = true"
      >
      Reveal Oracle's answer
    </v-btn>
    <p v-if="showAnswer">
      {{ lastLineText }}
    </p>  
  </div>
  <v-dialog v-if="showAnswer" scrollable>
    <template v-slot:activator="{ on }">
      <v-btn 
        class="black--text"
        color="secondary"
        v-on="on"
        >
        How did we get here?
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-truncate">
        {{ firstLineText }}
      </v-card-title>
      <v-card-text>
        <p v-for="line in lines" :key="line.uuid">
          {{ line.text }}
        </p>
      </v-card-text>
      <v-card-actions>
        <!-- TODO: make this actually close dialog  -->
        <v-btn @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import { getLines } from '../../libraries/api'

export default {
  props: {
    sheet: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showAnswer: false
    }
  },
  computed: {
    lines () { return this.sheet.lines },
    firstLineText () {
      if (!this.lines.length) return ''
      return this.lines[0].text
    },
    lastLineText () {
      const length = this.lines.length
      if (!length) return ''
      return this.lines[length - 1].text
    },
    middleLinesText () {
      if (!this.lines.length) return []
      return this.lines
        .slice(1, -1)
        .map(line => line.text)

    }
  }
}
</script>
