<template>
  <div class="d-flex flex-column justify-space-between">
    <ActionPanel>
      <div v-if="!localPlayer.name">
        <h2>Please enter your name</h2>
        <v-form @submit.prevent="updatePlayer">
        <div class="d-md-flex">
            <v-text-field 
              v-model="name"
              label="Player name"
              hint="Please enter your name"
              persistent-hint
              class="mb-8 mr-md-8"
              data-test="name-input"
            />
            <v-btn 
              type="submit"
              color="secondary"
              class="black--text"
            >
              Submit
            </v-btn>
          </div>
        </v-form>
      </div>
      
      <div v-else>
        <div class="d-md-flex justify-space-between align-center">
          <h2>Welcome {{ localPlayer.name }}!</h2>
          <v-btn 
            small
            class="my-4 ml-md-4 black--text"
            color="secondary"
            @click="copyGameLink"
          >
            <span class="mr-2">Copy invite link</span>
            <v-icon small>
              {{ copied ? 'fas fa-clipboard-check' : 'fas fa-clipboard' }}
            </v-icon>
          </v-btn>
        </div>
        <p class="font-italic">Waiting for players to join...
          
        </p>
      </div>
    </ActionPanel>
  </div>
</template>

<script>

import ActionPanel from './wrappers/ActionPanel'
import { updatePlayer } from '../libraries/api'

export default {
  name: 'Pregame',
  components: { ActionPanel },
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
      copied: false,
      name: ''
    }
  },
  computed: {
    gameLink () {
      return `${process.env.VUE_APP_PUBLIC_PATH}/?game=${this.game.uuid}`
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
    async updatePlayer () {
      await updatePlayer(this.localPlayer.uuid, { name: this.name })     
    }
  }

}
</script>
