<template>
  <div>
    <p>The Oracle has spoken!</p>
    <v-btn 
      v-for="(sheet, index) in sheets"
      :key="sheet.uuid"
      
      >

    </v-btn>
    <!-- <v-tabs v-model="tab">
      <v-tab
        v-for="(sheet, index) in sheets"
        :key="sheet.uuid + 'tab'"
        :value="sheet.uuid"
        :href="'#' + sheet.uuid"
      >
        {{ index + 1}}
      </v-tab>
      <v-tabs-items v-model="tab">
        <Sheet 
          v-for="sheet in sheets"
          :key="sheet.uuid"
          :sheet="sheet"
        />
      </v-tabs-items>
    </v-tabs> -->
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
      fullSheets: []
    }
  },
  created () {
    const { data } = getFullSheets(this.game.uuid)
    this.fullSheets = data
  }
}
</script>
