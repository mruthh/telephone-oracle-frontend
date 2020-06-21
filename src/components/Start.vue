<template>
  <div>
    <v-btn
      class="my-4"
      color="primary"
      @click="$emit('start')"
      >Start a new game
    </v-btn>

    <form @submit.prevent="joinGame" class="mt-4">
      <v-text-field 
        clearable
        label="Got a game code? Paste it here"
        :aria-describedby="hasError ? 'game-code-invalid' : null"
      />
      <p id="game-code-invalid" v-if="hasError">Please enter a valid game code</p>
    </form>
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