<template>
  <div>
    <button @click="$emit('start')">Start Game</button>
    <button @click="$emit('end')">End Game</button>
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