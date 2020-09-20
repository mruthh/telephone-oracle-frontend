<template>
  <div>
    <p>The Oracle has spoken!</p>
    <div v-for="sheet in sheets" :key="sheet.uuid">
      <Sheet :sheet="sheet" />
    </div>
    <!-- <v-tabs 
      v-model="tab">
    </v-tabs> -->
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
  }
}
</script>
