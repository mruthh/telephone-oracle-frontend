<template>
<div>
  <p>
    <span class="font-weight-bold">Question:</span>
    <span class="ml-2">{{ firstLineText }}</span>
  </p>
  <p>
    <span class="font-weight-bold">Answer:</span>
    <v-btn 
      v-if="!showAnswer" 
      class="ml-2 black--text"
      color="secondary"
      @click="showAnswer = true"
      >
      Reveal Oracle's answer
    </v-btn>
    <span 
      v-if="showAnswer" 
      class="ml-2"
    >
      {{ lastLineText }}
    </span>  
  </p>

  
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
      showAnswer: false,
      showProgression: false
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
