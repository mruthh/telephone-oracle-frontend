<template>
    <v-list-item class="d-flex" data-test="player">
      <div data-test="playerName" class="mr-2">{{ name }}</div>
      <div class="mr-2" v-if="isUser">(You)</div>
      <v-chip v-if="player.isHost" color="accent" small>
        <i class="fas fa-crown mr-2"></i>
        Host
      </v-chip>
      <v-icon 
        v-for="sheet in queue" 
        class="mx-2"
        :key="sheet.uuid"
        color="primary"
      >
        far fa-sticky-note
      </v-icon>
      <v-btn 
        v-if="canDelete"
        data-test="deletePlayer"
        :aria-label="`Delete ${player.name}`"
        small
        icon
        @click="$emit('delete', player)"
      >
        <v-icon>fas fa-times</v-icon>
      </v-btn>
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
    },
    queues: {
      type: Object,
      required: true
    },
    localPlayerIsHost: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    queue () {
      return this.queues[this.player.uuid] || []
    },
    name () {
      return this.player.name || `Player${this.order + 1}`
    },
    canDelete () { return this.isUser || this.localPlayerIsHost }
  }
}
</script>
