<template>
  <my-border-block>
    <!--@submit.prevent="Register"-->
    <form @submit.prevent="$router.push('/main')" >
      <h2 >SignUp</h2>
      <my-input v-model="name" required placeholder="name" type="text" autofocus></my-input>
      <my-input  v-model="password" required placeholder="password"></my-input>
      <my-input  v-model="email" required placeholder="email"></my-input>
      <br/>
      <!--проверить данные и внести в бд   // перенаправл на главную страниц $router.push('/MainPage')-->
      <my-button class="btn" @click.prevent="register"  type="submit">SignUp</my-button>
    </form>
  </my-border-block>
</template>

<script>

import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyBorderBlock from "@/components/UI/MyBorderBlock.vue";
import {mapState, mapMutations, mapGetters,mapActions} from "vuex";
import router from "@/router";

export default {
  components: {MyInput, MyButton, MyBorderBlock},
  data() {
    return {
      id:"",
      name: "",
      email: "",
      password: ""
    }
  },
  ...mapMutations({
    setUserSuccess:'Register/setUserSuccess',
    setStatusRequest:'Register/setStatusRequest',
    setStatusError:'Register/setStatusError',
  }),

  methods: {
    ...mapActions({
      Register:'Register/Register',
    }),

    register (){
      //считываем данные с формы
      let data = {
        id: "",
        login: this.name,
        email: this.email,
        password: this.password,
      }
      console.log(data)
      //вызываем action
      //отправляем данные с инпутов в store который обраборает данные
      this.Register(data)
          .then(() => {
            console.log(data)
            // перенаправл на главную страницу
            router.push('/main');
          })
          .catch(err => console.log(err))

    },

  },
  computed: {
    ...mapState({
      status: state => state.Register.status,
      user: state => state.Register.user,
    }),
  },

  mounted() {

  }
}

</script>

<style scoped>
my-border-block{
  display: flex;
  flex-direction: column;
}
form{
 padding: 5% 15%;
}
form h2{
  display: flex;
  justify-content: center;
  margin: auto;
  padding-top: 90px;
}
form input{
  display: flex;
  justify-content: center;
  margin: auto;
}
</style>