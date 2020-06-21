<template>
  <section>
    <v-list 
      v-if="players.length"
      outlined
      elevation="3"
      width="25%"
      min-width="250px"
      
    >
    <v-subheader>Players</v-subheader>
      <Player 
        v-for="(player, index) in players" 
        :key="player.uuid" 
        :player="player"
        :isUser="localPlayer.uuid === player.uuid"
        :order="index"
      />
      </v-list>
  </section>
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
    sheets: {
      type: Array,
      default: () => []
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
