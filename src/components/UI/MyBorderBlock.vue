<template>
  <div class="block">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'my-border-block',
}
</script>


<style >
*{
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.block{
  display:flex;

  margin: 10% auto;
  background: lightblue;
  border-radius: 15px;
  border: 1px solid gray;

  min-width: 350px;
  max-width: 400px;
  min-height: 470px;
  max-height: 550px;
}

</style>