<template>
  <div>
    <h1>Telephone Oracle - Pandemic Edition</h1>
    <Start
      v-if="!game"
      @start="startGame"
      @join="joinGame"
    />
    <Game v-if="showGame" :game="game"/>
    <Finale v-if="showFinale" :game="game" />
  </div>
</template>

<script>

import Game from './components/Game'
import Start from './components/Start'
import Finale from './components/Finale'

export default {
  name: 'app',
  components: { Game, Players },
  data () {
    return {
      game: null
    }
  },
  computed: {
    showGame () { 
      return this.game && ['open', 'active'].includes(this.game.status)
    },
    showFinale () {
      return this.game && this.game.status === 'complete'
    }
  },
  methods: {
    startGame () {

    },
    joinGame (id) {

    }
  }
}
</script>
