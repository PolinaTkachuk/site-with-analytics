<template>
  <!-- модель в родителе - связали dialogVisible с showPanel
  выдает true -показывать панель если нажата кнопка и
  false - если не нажата-->
  <my-side-panel v-model:showPanel="dialogVisible"></my-side-panel>

  <!--вешаем клдасс на контенстную часть при клике на кнопку сдвиг содержимого-->
  <div class="all-content"  v-bind:class="{'active':dialogVisible}">
    <!--кликнули на кнопку- показалась панель
  это родитель, связали с ребенком MySidePanel
  и с его методом showPanel, изначально не видно-->
    <my-button v-on:click.stop="showDialog" class="button">&#9776;</my-button>

    <div >
      <div class="text-content">

        MAIN

        Но в отличие от v-if директива v-show не изменяет структуру DOM, а манипулирует значением стилевого свойства display. То есть если условие в v-show возвращает false, то для элемента устанавливается стиль display:none;, и тем самым данный элемент скрывается на веб-странице.

        В то же время манипуляции с DOM через v-if увеличивают накладные расходы и снижают производительность. Поэтому в тех ситуациях, когда возможно частое переключение видимости элемента, следует предпочитать v-show.
      </div>
    </div>

  </div>
</template>


<script>
import MySidePanel from "@/components/UI/MySidePanel.vue";
import MyButton from "@/components/UI/MyButton.vue";
export default {
  components:{MyButton, MySidePanel},
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods:{
    showDialog() {
      this.dialogVisible = true;
      console.log("dnfgkjdgjk")
    },
    hideDialog() {
      this.dialogVisible = false;
      console.log("no")
    },
  }
}


</script>

<style scoped>
.all-content{
  background: lightpink;
  margin: auto;
}
.text-content{
  display: flex;
  height: 100vh;
  padding-top: 15%;
}
.active{
  background: lightgray;
  margin-left: 25%;
}
.button{

  flex-direction: column;
  float: left;
  padding: 11px;
  margin: 8px;
  border: 3px solid midnightblue;
}
</style>