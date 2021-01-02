<template>
  <ActionPanel>
    <h2 class="text-center">The Oracle has spoken!</h2>
    <div v-if="fullSheets.length" 
      class="d-flex align-center justify-space-between"
    > 
      <div>
        <v-btn
          v-if="canGoBack"
          icon
          class="secondary black--text"
          aria-label="previous sheet"
          @click="currentIndex--"
          ><i class="fas fa-chevron-left" />
        </v-btn>
      </div>
      <div class="flex-grow-1">
        <Sheet :sheet="currentSheet" class="mt-4 px-4" />
      </div>
      <div>
        <v-btn
          v-if="canGoForward"
          icon
          class="secondary black--text"
          aria-label="next sheet"
          @click="currentIndex++"
        ><i class="fas fa-chevron-right" />
        </v-btn>
      </div>
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
