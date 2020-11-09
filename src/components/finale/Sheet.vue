<template>
    <v-card>
      <p>
        <span>Question:</span>
        <span class="ml-2">{{ firstLineText }}</span>
      </p>
      <v-btn v-if="!showAnswer" @click="showAnswer = true">
        See Oracle's answer
      </v-btn>

      <p v-if="showAnswer">
        <span>Answer:</span>
        <span class="ml-2">{{ lastLineText }}</span>
  
      </p>
    </v-card>
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
  },
  async created () {
    const { data } = await getLines(this.sheet.uuid)
    this.lines = data
  }
}
</script>
