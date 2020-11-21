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
        v-model="gameLink" 
        clearable
        label="Got a game link? Paste it here"
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
    data () {
      return { gameLink: null }
    },
    methods: {
      joinGame () {
        let id = this.gameLink

        // if the game code is a url and not just a gameId, get just the id
        if (id.includes('/')) {
          id = id.split('/').slice(-1)[0]
        }

        this.$emit('join', id)
      }
    }
    
  }
</script>