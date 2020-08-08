<template>
<v-col class="elevation-3">
  <v-subheader>Game {{ game.uuid }}</v-subheader>
  <div class="pa-4 d-flex font-italic justify-space-between align-center">
    <span>Progress:</span> 
    <v-progress-linear 
      class="ml-4" 
      value="25"
      color="accent"
      :height="24"
    >25%
    </v-progress-linear>
  </div>  
  <HostControls 
    class="mt-4"
    status="open"
    :isHost="!!localPlayer.isHost"
    v-on="$listeners"
  />
</v-col>
</template>

<script>
import HostControls from './HostControls'
export default {
    components: { HostControls },
    props: {
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