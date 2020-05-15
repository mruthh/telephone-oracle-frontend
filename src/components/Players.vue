<template>
  <section>
    <ul>
      <li v-for="player in players" :key="player.uuid" class="flex">
        <div>{{ player.name }}</div>
        <div v-if="localPlayer.uuid === player.uuid">(You)</div>
        <div v-for="sheet in sheets" :key="sheet.uuid">
          <span v-if="sheet.active_player_id === player.uuid">&#9824;</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>

import { getPlayers } from '../libraries/api'

  export default {
    props: {
      gameId: {
        type: [String, Number],
        required: true
      },
      localPlayer: {
        type: Object,
        required: true
      },
      sheets: {
        type: Array,
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
