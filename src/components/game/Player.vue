<template>
    <v-list-item class="d-flex">
      <div class="mr-2">{{ name }}</div>
      <div class="mr-2" v-if="isUser">(You)</div>
      <v-icon 
        v-for="sheet in player.queue" 
        :key="sheet.uuid">
          fas fa-scroll
        </v-icon>
    </v-list-item>
</template>

<script>

export default {
  props: {
    player: {
      type: Object,
      required: true
    },
    isUser: {
      type: Boolean,
      default: false
    },
    status: {
      type: String
    },
    order: {
      type: Number,
      required: true
    }
  },
  computed: {
    queue () {
      return this.player.queue || []
    },
    name () {
      return this.player.name || `Player${this.order + 1}`
    }
  }
}
</script>
