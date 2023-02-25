<template>
  <div class="block_">
    <div class="title">Title Group<br/>
      <slot></slot></div>
    <div class="image">IMAGE<slot></slot></div>
  </div>
</template>

<script>
export default {
  name:'my-window-group',

}
</script>

<style >
*{
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.block_{
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  write-space:nowrap;
  text-align: center;
  margin: 15vw auto;
  background: white;
  border: 2px solid gray;
  width: 20vw;
  height: 20vh;
}
.title{
  display: flex;
  justify-content: center;
  border-bottom: 2px solid gray;
  padding: 8%;
  position: relative;
  height: 20%;
  background: lightgoldenrodyellow;

}
.image{
  justify-content: center;
  background: yellow;
  position: relative;
  height: 80%;
  padding: 8%;
}

</style>