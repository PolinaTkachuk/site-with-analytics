<template>

  <my-side-panel v-model:showPanel="dialogVisible"></my-side-panel>
  <div class="all-content"  v-bind:class="{'active':dialogVisible}">
    <my-button v-on:click.stop="showDialog" class="button" v-bind:class="{'active':dialogVisible}">&#9776;</my-button>
    <div >
      <!--меняем через мутации поля readonly -нельзя писать пользователю-->
      <my-button
          class="btn-edit"
          @click="Edit"
          v-bind:class="{'active':InputActive}">
        Edit
      </my-button>
    </div>

    <div >
      <div class="text-content">
        <div>Profile</div>
        <!--логин- данные логина-->
        <div class="login">Login: <div>{{getLogin}}</div>
          <!--логин можно изменить в инпуте-->
          <my-input v-model="name" v-if="InputActive"></my-input>
        </div>

<!--

        <div class="password">Password: <div>{{this.getPassword}}</div>
          <my-input v-model="password" v-if="InputActive">{{this.getPassword}}</my-input>
        </div>
-->
        <div class="email">Email: <div>{{getEmail}}</div>
          <my-input v-model="email" v-if="InputActive"></my-input>
        </div>
      </div>

      <my-button @click="saveProfile_" class="btn-save" v-if="InputActive">
        Save
      </my-button>
    </div>

  </div>
</template>


<script>
import MySidePanel from "@/components/UI/MySidePanel.vue";
import MyButton from "@/components/UI/MyButton.vue";
import {mapState, mapMutations, mapGetters,mapActions} from "vuex";
import MyInput from "@/components/UI/MyInput.vue";
import {update} from "vue-click-outside";
import router from "@/router";

export default {
  components:{MyInput, MyButton, MySidePanel},
  data() {
    return {
      dialogVisible: false,
      InputActive:false,
      id:"",
      name: "",
      password: "",
      email:"",
      count:1,
    }
  },

  methods:{
    update,
    ...mapActions({
      saveProfile:'Auth/saveProfile',
      getUser:'Auth/getUser'
    }),
    ...mapMutations({
      setUserSuccess:'Auth/setUserSuccess',
      setUpdateUsers:'Auth/setUpdateUsers',
    }),
    showDialog() {
      this.dialogVisible = true;
    },
    hideDialog() {
      this.dialogVisible = false;
      console.log("no")
    },
    Edit(){
      this.InputActive=true;
    },

    saveProfile_(){
      this.Edit()
      let data = {
        name: this.name,
        email: this.email,
        //password: this.password,
      }
      this.saveProfile(data)
      . then(() =>{
        console.log(data);
        this.InputActive=false
      })
          .catch(err => console.log(err))



      //вызываем мутацию для конкретного юзера
      // в котором данные заменяем на новые
      //this.$store.commit('setUpdateUsers', data)
      //this.$store.commit('setUpdateUsers', data)
      //нужно еще токен заменить?
    },

  },

  mounted(){
      let id= JSON.parse(localStorage.getItem('id', this.$id));
      //console.log(id)
      this.getUser( id);
      //console.log("PROFILE")

  },
  computed: {
    ...mapState({
      status: state => state.Auth.status,
      user: state => state.Auth.user,
    }),
    ...mapGetters({
      getLogin:'Auth/getLogin',
      getPassword:'Auth/getPassword',
      getEmail:'Auth/getEmail',
      getById:'Auth/getById',
    }),
    getLogin: state=>state.user.name,
    getPassword(){
      return this.$store.getters.getPassword
    },
    getEmail: state=>state.user.email,
    getById:state=>state.user.id,
  },
}


</script>

<style scoped>
.all-content{
  background: lightpink;
  margin: auto;
  font-size: 24px;
}
.btn-edit{
  display: flex;
  justify-content: flex-start;
  margin: 8px;
  float: right;
  padding: 11px;
  margin: 8px;
  border: 3px solid midnightblue;
}
.btn-save{
  display: flex;
  margin-left: auto;
  margin-right: auto;
  padding: 11px;
  border: 3px solid midnightblue;
}
.text-content{
  display: flex;
  height: 100vh;
  padding-top: 15%;
  flex-direction: column;

}
.text-content div{
  margin:20px;
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
</style>