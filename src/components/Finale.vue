<template>
  <div>
    <p>The Oracle has spoken!</p>
    <v-tabs v-model="tab">
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
    </v-tabs>
  </div>
</template>

<script>
import Sheet from './finale/Sheet'

export default {
  components: { Sheet },
  props: {
    sheets: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      tab: null 
    }
  }
}
</script>
