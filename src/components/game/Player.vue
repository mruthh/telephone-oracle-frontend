<template>
    <v-list-item class="d-flex">
      <div class="mr-2">{{ name }}</div>
      <div class="mr-2" v-if="isUser">(You)</div>
      <v-chip v-if="player.isHost" color="accent" small>
        <i class="fas fa-crown mr-2"></i>
        Host
      </v-chip>
      <v-icon 
        v-for="sheet in player.queue" 
        class="mx-2"
        :key="sheet.uuid"
        
        color="primary"
        >
          far fa-sticky-note
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
