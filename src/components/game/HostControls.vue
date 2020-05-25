<template>
  <div>
    <button
      v-if="status === 'open'"
      @click="$emit('start')">
      Start Game
    </button>
    <button 
      v-if="status === 'active'" 
      @click="$emit('end')"
    >End Game
    </button>
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