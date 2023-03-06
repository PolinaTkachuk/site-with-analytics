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
    <my-button v-on:click.stop="showDialog" class="button" v-bind:class="{'active':dialogVisible}">&#9776;</my-button>

    <div >
      <div class="text-content">

        <div>
          <h2 >MAIN</h2>
          <my-input v-model="url" required placeholder="group url" type="text" autofocus></my-input>
          <br/>
          <my-button class="btn" @click.prevent=""  type="submit">add to tracked</my-button>
          <my-button class="btn" @click.prevent="getStatistics"  type="submit">get statistics</my-button>
        </div>

        <div id="content_">
          Group Name:{{this.group_name}}
          Group Id:{{this.group_id}}
          Description:{{this.description}}
          <img src={{this.avatar}}>
        </div>
      </div>


    </div>


  </div>
</template>


<script>
import MySidePanel from "@/components/UI/MySidePanel.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import axios from "axios";
import {mapActions, mapGetters, mapState} from "vuex";
import MyBorderBlock from "@/components/UI/MyBorderBlock.vue";

export default {
  components:{MyBorderBlock, MyButton, MySidePanel, MyInput},
  data() {
    return {
      dialogVisible: false,
      url: "",
      group_id:"",
      group_name:"",
      description:"",
      status:"",
      avatar:""
    }
  },
  methods:{

    showDialog() {
      this.dialogVisible = true;
    },
    hideDialog() {
      this.dialogVisible = false;
      console.log("no")
    },
    getStatistics(){
      let url=this.url;
      axios.post('http://diploma.local:8000/api/main/mainInfoAboutGroups', {url})
          .then(response=> {
            //console.log("getStatistics");
            console.log(response.data);
            console.log(response.data.avatar);
            this.group_name=response.data.name;//[...this.group_name, ...response.data.name];//response.data.name;
            this.group_id=response.data.group_id;
            this.description=response.data.description;
            this.status=response.data.status;
            this.avatar=response.data.avatar;
            // const node = document.createElement("img");
            // node.src = this.avatar;
            // var div = document.getElementById('content_');
            //
            // div.appendChild(node);
            //https://vk.com/marusiaproject
          });
    }

  },
  computed:{
    ...mapState({
      user: state => state.Auth.user,
    }),


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
  padding-top: 25%;

  justify-content: center;

}
.active{
  background: lightgray;
  margin-left: 33vw;
}
.button{

  flex-direction: column;
  float: left;
  padding: 11px;
  margin: 8px;
  border: 3px solid midnightblue;
}
#content_{
  display: flex;

  flex-direction: row;
  height: 50%;
  font-size: 30px;
  position: relative;
  padding-top: 10%;
}
</style>