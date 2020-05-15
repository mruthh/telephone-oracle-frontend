<template>
  <section>
    <p v-if="!sheet">Waiting for new sheet...</p>
    <div v-if="sheet">
      <div v-if="!isFirstQuestion">
        <span>{{ isQuestion ? 'Answer:' : 'Question:'}}</span>
        <span>{{ lastLine.text }}</span>
      </div>
      <form @submit.prevent="addLine">
        <label for="question-textarea"></label>
        <textarea name="question-textarea" id="question-textarea" cols="30" rows="10" />
      </form>
    </div>
  </section>
</template>

<script>

import { getSheet } from '../../libraries/api'

export default {
  props: {
    sheetId: {
      type: [Number, String],
      default: null
    }
  },
  data () {
    return {
      sheet: null
    }
  },
  computed: {
    isQuestion () { 
      if (!sheet) return false
      return !(sheet.lines.length % 2)
    },
    isFirstQuestion () {
      if (!sheet) return false
      return !sheet.lines.length
    },
    lastLine () {
      if (!sheet || !sheet.length) return null
      return sheet[sheet.length -1]
    }
  },
  created () {
    getSheet(this.sheetId)
  },
  updated () {
    getSheet(this.sheetId)
  },
  methods: {
    async getSheet () {
      const { data } = await getSheet(this.sheetId)
      this.sheet = data
    },
    addLine (e) {
      this.$emit('add', e.target.value)
    }
  }
}
</script>
