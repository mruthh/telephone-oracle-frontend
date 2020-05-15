<template>
  <div>
    <button @click="$emit('start')">Start Game</button>
    <button @click="$emit('end')">End Game</button>
  </div>
</template>

<script>
  export default {
    props: {
      state: {
        type: String,
        required: true,
        validator (state) {
          return ['open', 'active'].includes(state)
        }
      }
    }
    
  }
</script>