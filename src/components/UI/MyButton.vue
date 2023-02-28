<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  email:'my-button'
}
</script>

<style scoped>

.btn{

  margin: auto;
  border: 1px solid gray;
  color: gray;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  background: none;
}
</style>