<template>
  <div>
    {{ game.uuid }}
    <HostControls 
      v-if="localPlayer.isHost"
      status="open"
      @start="startGame"
    />
    <ul>
      <Player 
        v-for="player in players" 
        :key="player.uuid" 
        :isUser="localPlayer.uuid === player.uuid"
      />
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Pregame',
    props: {
      players: {
        type: Array,
        default: []
      },
      game: {
        type: Object,
        required: true
      },
      localPlayer: {
        type: Object,
        required: true
      }
    }
  }
</script>
