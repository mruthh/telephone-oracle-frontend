<template>
  <div>
    <form @submit.prevent="joinGame">
      <!-- <label for="game-code">Got a game code? Paste it here</label> -->
      <v-text-field 
        id="game-code"
        label="Got a game code? Paste it here"
        :aria-describedby="hasError ? 'game-code-invalid' : null"
        type="text"
      />
      <p id="game-code-invalid" v-if="hasError">Please enter a valid game code</p>
    </form>

    <v-btn
      color="primary"
      @click="$emit('start')"
      >Start a new game
    </v-btn>


  </div>
</template>

<script>
  export default {
    props: {
      hasError: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      joinGame (e) {
        this.$emit('join', e.target.value)
      }
    }
    
  }
</script>