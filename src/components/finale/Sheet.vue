<template>
  <div>
    <p v-for="line in lines" :key="line.uuid">
      {{ line.text }}
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
      lines: []
    }
  },
  async created () {
    const { data } = await getLines(this.sheet.uuid)
    this.lines = data
  }
}

</script>
