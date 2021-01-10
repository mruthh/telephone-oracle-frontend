<template>
  <div>
    <v-btn
      class="my-4"
      color="primary"
      @click="$emit('start')"
      >Start a new game
    </v-btn>

    <form @submit.prevent="joinGame" class="mt-4">
      <div class="d-md-flex">
        <v-text-field
          v-model="gameLink" 
          clearable
          label="Got a game link? Paste it here"
          :aria-describedby="hasError ? 'game-code-invalid' : null"
        />
        <v-btn
          type="submit"
          color="secondary"
          class="ml-md-8 black--text"
        >
          Find game
        </v-btn>
      </div>
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
        if (id.startsWith('http')) {
          const url = new URL(id)
          const query = url.search
          id = query.replace('?game=', '')
        }

        this.$emit('join', id)
      }
    }
    
  }
</script>