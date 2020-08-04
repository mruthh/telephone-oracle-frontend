<template>
<v-col class="elevation-3">
  <v-subheader>Game {{ game.uuid }}</v-subheader>
  <div class="pa-4 d-flex font-italic justify-space-between align-center">
    <span>Progress:</span> 
    <v-progress-linear 
      class="ml-4" 
      value="25"
      color="accent"
      :height="24"
    >25%
    </v-progress-linear>
  </div>
  <div class="d-flex justify-space-between">
  <v-btn 
    small
    class="ma-4 black--text"
    color="secondary"
    @click="copyGameLink"
  >
    <span class="mr-2">Copy invite link</span>
    <v-icon small>
      {{ copied ? 'fas fa-clipboard-check' : 'fas fa-clipboard' }}
    </v-icon>
  </v-btn>
  
  <HostControls 
    v-if="localPlayer.isHost" 
    class="mt-4"
    status="open"
    @start="$emit('start')" 
  />
  </div>
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
      },
      gameLink () {
        return `${process.env.VUE_APP_PUBLIC_PATH}/game/${this.game.uuid}`
      }
    },
    methods: {
      copyGameLink () {
        const el = document.createElement('input')
        el.value = this.gameLink
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
        this.copied = true
      },
    }
  }
</script>