<template>
  <div>
    <p>The Oracle has spoken!</p>
  </div>
</template>

<script>
  export default {
    props: {
      sheets: {
        type: Array,
        required: true
      }
    }
  }
</script>
