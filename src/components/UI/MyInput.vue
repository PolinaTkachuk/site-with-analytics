<template>
  <input
      :value="modelValue"
      @input="updateInput"
      class="input"
      type="text">
</template>

<script>
export default {
  email:'my-input',
  props:{
    modelValue:[String, Number,],
  },
  methods:{
    updateInput(event){
      this.$emit('update:modelValue',event.target.value);
    }
  }
}
</script>

<style scoped>
.input{
  padding: 13px 40px;
  margin-top: 15px;
  border: 1px solid gray;
  display: flex;
  align-items: flex-end;
}

</style>