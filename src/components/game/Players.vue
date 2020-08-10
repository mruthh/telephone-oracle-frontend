<template>
  <v-col class="elevation-3">
    <v-list 
      v-if="players.length"
      min-width="250px"
      height="100%"
    >
    <v-subheader>Players</v-subheader>
      <Player 
        v-for="(player, index) in players" 
        :key="player.uuid" 
        :player="player"
        :isUser="localPlayer.uuid === player.uuid"
        :order="index"
        v-bind="$attrs"
      />
      </v-list>
  </v-col>
</template>

<script>


import Player from './Player'

export default {
  components: { Player },
  props: {
    localPlayer: {
      type: Object,
      required: true
    },
    players: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      order: []
    }
  },
  methods: {
    updateOrder () {
      // TODO: allow updating order
      this.$emit('updateOrder', [])
    }
  }
}
</script>
