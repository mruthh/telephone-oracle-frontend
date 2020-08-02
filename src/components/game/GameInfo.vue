<template>
<section class="elevation-3 pa-4">
  <div class="d-md-flex align-center">
  <v-subheader>Game {{ game.uuid }} </v-subheader>
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
  </div>
  <p class="px-4 font-italic">{{ status }}</p>
  <HostControls 
    v-if="localPlayer.isHost" 
    class="mt-4"
    status="open"
    @start="$emit('start')" 
  />
</section>
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
    },
    data () {
      return {
        copied: false
      }
    },
    computed: {
      status () {
        if (this.game.status === 'open') return 'Waiting for players to join...'
        if (this.game.status === 'active') return 'Speaking with the oracle'
        if (this.game.status === 'complete') return 'Game complete!'
        return 'Something is wrong.'
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