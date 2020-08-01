<template>
<section class="d-flex align-center">
      <h2>Game <span> {{ gameId }}</span></h2>
      <v-btn 
        small
        class="ml-4 black--text"
        color="secondary"
        @click="copyGameLink"
      >
        <span class="mr-2">Copy game link</span>
        <v-icon small>
          {{ copied ? 'fas fa-clipboard-check' : 'fas fa-clipboard' }}
        </v-icon>
      </v-btn>
    </section>
</template>

<script>
  export default {
    props: {
      gameId: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        copied: false
      }
    },
    methods: {
      copyGameLink () {
        const el = document.createElement('input')
        el.value = `${process.env.VUE_APP_PUBLIC_PATH}/game/${this.gameId}`
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
        this.copied = true
      },
    }
  }
</script>