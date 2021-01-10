<template>
  <div class="d-flex justify-end align-center">
    <p v-if="!isHost && status === 'open'" class="mr-4 mb-0 red--text text--darken-2 font-italic">
      Only the host may start the game
    </p>
    <v-btn
      v-if="status === 'open'"
      :disabled="!isHost"
      color="primary"
      @click="$emit('start')">
      Start Game
    </v-btn>

    <v-btn 
      v-if="status === 'complete'"
      color="secondary"
      class="black--text"
      @click="$emit('newGame')"
    >Play again
    </v-btn>
  </div>
</template>

<script>
  export default {
    props: {
      isHost: {
        type: Boolean,
        default: false
      },
      status: {
        type: String,
        required: true,
        validator (status) {
          return ['open', 'active', 'complete'].includes(status)
        }
      }
    }
    
  }
</script>