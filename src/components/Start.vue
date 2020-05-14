<template>
  <div>
    <form @submit.prevent="joinGame">
      <label for="game-code">Got a game code? Paste it here</label>
      <input 
        id="game-code"
        :aria-describedby="hasError ? 'game-code-invalid' : null"
        type="text"
      />
      <p id="game-code-invalid" v-if="hasError">Please enter a valid game code</p>
    </form>

    <button
      @click="$emit('start')"
      >Start a new game
    </button>


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