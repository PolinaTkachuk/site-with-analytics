<template>
  <my-border-block>
    <form @submit.prevent="signIn">
      <h2 >SignIn</h2>
      <my-input  v-model="login" required placeholder="login" type="text" autofocus></my-input>
      <my-input  v-model="password" required placeholder="password"></my-input>
      <br/>
      <!--проверить данные и внести в бд   // перенаправл на главную страниц-->
      <my-button class="btn" @click="login"  type="submit">SignIn</my-button>
    </form>
  </my-border-block>
</template>

<script>

import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyBorderBlock from "@/components/UI/MyBorderBlock.vue";
import {mapState, mapMutations, mapGetters,mapActions} from "vuex";

export default {
  components: {MyInput, MyButton, MyBorderBlock},
  data() {
    return {
      login: "",
      password: ""
    }
  },
  ...mapMutations({
    setUserSuccess:'Register/setUserSuccess',
    setStatusRequest:'Register/setStatusRequest',
    setStatusError:'Register/setStatusError',
  }),
  ...mapActions({
    RegisterUsers:'Register/register',
  }),

  methods: {
    //НУЖНО ОЛУЧИТЬ ПРОМИС
     signIn () {
      //считываем данные с формы
      let login = this.login
      let password = this.password
      try {
        //вызываем action
        //отправляем данные с инпутов в fetch который обраборает данные
        this.$store.dispatch('signIn', { login, password })
            .then(()=> {
              // перенаправл на главную страницу
               this.$router.push('/MainPage')
               })
      }
      catch(e) {
        console.log(e)
      }
    },
  },

  computed: {
    ...mapState({
      status: state => state.Register.status,
      user: state => state.Register.user,
    }),
  },
  /*
    mounted() {
      let data = {
        login: this.name,
        email: this.email,
        password: this.password,
      }
      //отправляем данные с инпутов в fetch который обраборает данные
      this.fetchFormRegister(data)
          //.then(() => {
            // перенаправл на главную страницу
          //  this.$router.push('/MainPage')
         // })
          .catch(err => console.log(err))
    }

*/
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