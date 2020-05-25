<template>
  <section>
    <ul>
      <li v-for="player in players" :key="player.uuid" class="flex">
        <div>{{ player.name }}</div>
        <div v-if="localPlayer.uuid === player.uuid">(You)</div>
        <div v-for="(sheetId) in player.queue" :key="sheetId">
          &#9824;
        </div>
      </li>
    </ul>
  </section>
</template>

<script>

import { getPlayers } from '../../libraries/api'

  export default {
    props: {
      game: {
        type: Object,
        required: true
      },
      localPlayer: {
        type: Object,
        required: true
      },
      sheets: {
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
