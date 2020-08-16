<template>
<v-col class="elevation-3">
  <v-subheader>Game {{ game.uuid }}</v-subheader>
  <div class="pa-4 d-flex font-italic justify-space-between align-center">
    <span>Progress:</span> 
    <v-progress-linear 
      class="ml-4" 
      :value="progress"
      color="accent"
      :height="24"
    >{{ `${progress}%`}}
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
      },
      progress: {
        type: Number,
        default: 0
      }
    }
  }
</script>