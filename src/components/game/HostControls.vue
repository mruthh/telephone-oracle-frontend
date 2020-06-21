<template>
  <div>
    <v-btn
      v-if="status === 'open'"
      color="primary"
      @click="$emit('start')">
      Start Game
    </v-btn>
    <v-btn 
      v-if="status === 'active'" 
      @click="$emit('end')"
    >End Game
    </v-btn>
  </div>
</template>

<script>
  export default {
    props: {
      status: {
        type: String,
        required: true,
        validator (status) {
          return ['open', 'active'].includes(status)
        }
      }
    }
    
  }
</script>