<template>
  <my-border-block>
    <form @@submit.prevent="$router.push('/MainPage')">
      <h2 >SignIn</h2>
      <my-input v-model="email" required placeholder="email" type="text" autofocus></my-input>
      <my-input  v-model="password" required placeholder="password"></my-input>
      <br/>
      <!--проверить данные и внести в бд   // перенаправл на главную страниц-->
      <my-button class="btn" @click.prevent="SignIn"  type="submit">SignIn</my-button>
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
      email: "",
      password: ""
    }
  },
  ...mapMutations({
    setUserSuccess:'Auth/setUserSuccess',
    setStatusRequest:'Auth/setStatusRequest',
    setStatusError:'Auth/setStatusError',
  }),


  methods: {

    ...mapActions({
      signIn:'Auth/signIn',
    }),
    //НУЖНО ОЛУЧИТЬ ПРОМИС
     SignIn () {
      //считываем данные с формы
       let data={
         email: this.email,
         password:this.password
       }
       this.signIn(data)
    },
  },

  computed: {
    ...mapState({
      status: state => state.Auth.status,
      user: state => state.Auth.user,
    }),
  },
  /*
    mounted() {
      let data = {
        email: this.email,
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