<template>
<v-col class="elevation-3">
  <v-subheader>Game {{ game.uuid }}</v-subheader>
  <div class="pa-4 d-flex font-italic justify-space-between align-center">
    <span>Progress:</span> 
    <v-progress-linear 
      striped
      class="ml-4" 
      :value="progress"
      color="accent"
      :height="24"
    >
    <div class="lime lighten-2 pa-4 rounded-pill border font-weight-bold"
      >{{ `${progress}%`}}
    </div>
    </v-progress-linear>
  </div>  
</v-col>
</template>

<script>

export default {
  props: {
    game: {
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