<template>
  <div>
    <p>The Oracle has spoken!</p>
    <div v-if="fullSheets.length"> 
      <v-btn 
        v-if="canGoBack"
        @click="currentIndex++"
      >Previous sheet
    </v-btn>
      <Sheet :sheet="currentSheet"></Sheet>
      <v-btn 
        v-if="canGoForward"
        @click="currentIndex--"
      >Next sheet
    </v-btn>
    </div>
  </div>    
</template>

<script>
import { getFullSheets } from '../libraries/api'
import Sheet from './finale/Sheet'

export default {
  components: { Sheet },
  props: {
    sheets: {
      type: Array,
      required: true
    },
    game: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      fullSheets: [],
      currentIndex: 0
    }
  },
  computed: {
    canGoBack () { return this.currentIndex > 0 },
    canGoForward () { 
      if (!this.fullSheets.length) return false
      return this.currentIndex < (this.fullSheets.length - 1)
    },
    currentSheet () { return this.fullSheets[currentIndex]}
  },
  created () {
    const { data } = getFullSheets(this.game.uuid)
    this.fullSheets = data
  }
}
</script>
