<template>
    <li class="flex">
      <div>{{ player.name }}</div>
      <div v-if="isUser">(You)</div>
      <div v-for="sheetId in player.queue" :key="sheetId">
        &#9824;
      </div>
    </li>
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
      type: String,
      
    }
  },
  computed: {
    queue () {
      return player.queue || []
    }
  }
}
</script>
