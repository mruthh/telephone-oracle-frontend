<template>
  <v-col class="elevation-3">
    <v-list 
      v-if="activePlayers.length"
      min-width="250px"
      height="100%"
      data-test="playerList"
    >
    <v-subheader>Players</v-subheader>
      <Player 
        v-for="(player, index) in activePlayers" 
        :key="player.uuid" 
        :player="player"
        :isUser="localPlayer.uuid === player.uuid"
        :order="index"
        v-bind="$attrs"
        v-on="$listeners"
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
  computed: {
    activePlayers () { return this.players.filter(player => player.active) }
  },
  methods: {
    updateOrder () {
      // TODO: allow updating order
      this.$emit('updateOrder', [])
    }
  }
}
</script>
