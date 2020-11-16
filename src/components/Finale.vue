<template>
  <ActionPanel>
    <h2>The Oracle has spoken!</h2>
    <div v-if="fullSheets.length"> 
      <v-btn 
        v-if="canGoBack"
        @click="currentIndex++"
      >Previous sheet
    </v-btn>
      <Sheet :sheet="currentSheet" class="mt-4" />
      <v-btn 
        v-if="canGoForward"
        @click="currentIndex--"
      >Next sheet
    </v-btn>
    </div>
  </ActionPanel>
</template>

<script>
import { getFullSheets } from '../libraries/api'
import Sheet from './finale/Sheet'
import ActionPanel from './wrappers/ActionPanel'

export default {
  components: { Sheet, ActionPanel },
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
    currentSheet () { return this.fullSheets[this.currentIndex]}
  },
  async created () {
    const { data } = await getFullSheets(this.game.uuid)
    this.fullSheets = data
  }
}
</script>
