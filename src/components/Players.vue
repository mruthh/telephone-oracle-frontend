<template>
  <div>

  </div>
</template>

<script>

import { getPlayers } from '../libraries/api'

  export default {
    props: {
      gameId: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        players: []
      }
    },
    async created () {
      const { data } = await getPlayers(gameId)
      this.players = data.players
    }
  }
</script>