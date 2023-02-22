<template>
  <my-border-block>
    <!--@submit.prevent="register"-->
    <form @submit.prevent="register" >
      <h2 >SignUp</h2>
      <my-input  v-model="login" required placeholder="login" type="text" autofocus></my-input>
      <my-input  v-model="password" required placeholder="password"></my-input>
      <my-input  v-model="email" required placeholder="email"></my-input>
      <br/>
      <!--проверить данные и внести в бд   // перенаправл на главную страниц-->
      <my-button class="btn" @click.prevent="$router.push('/MainPage')"  type="submit">SignUp</my-button>
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
      email: "",
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
    register: function () {
      //считываем данные с формы
      let data = {
        login: this.name,
        email: this.email,
        password: this.password,
      }
      try {
        //вызываем action
        //отправляем данные с инпутов в fetch который обраборает данные
        this.$store.dispatch('register', data)
      } catch(e) {
        console.log(e)
      }
    }
  },

  computed: {
    ...mapState({
      status: state => state.Register.status,
      user: state => state.Register.user,
    }),
  },
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