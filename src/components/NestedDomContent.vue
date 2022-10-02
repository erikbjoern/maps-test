<template>
  <div>
    <label>A button</label>
    <button @click="alert">I'm a button</button>
  </div>
</template>

<script setup lang="ts">
function alert() {
  window.alert('wow')
}
</script>
