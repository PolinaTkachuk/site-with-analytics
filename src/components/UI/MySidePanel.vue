<template>
  <!--
  ребенок. Объявили пропс, как только нажали вне области панель исчезла
  -->
  <div class="panel" v-show="showPanel" @click.stop="updatePanel">

      <div @click.stop="updatePanel" class="content">
        <slot>
          <a href="/MainPage/Profile" class="">Profile</a>
        <a href="/MainPage/Recommendations" class="">recommendations</a>
        <a href="#" class="">tracked groups</a>
          <!--
          перенаправл на страницу с авторизацией и идем в localStore
          для remove токена пользователя
          -->
        <a href='/AuthUsers' class="logout"  @click="logoutUsers">logout</a>
          <router-view></router-view>
        </slot>
      </div>

  </div>
</template>

<script>
import {mapState, mapMutations, mapGetters,mapActions} from "vuex";
export default {
  email:'my-side-panel',

  props:{
    showPanel:{
      type:Boolean,
      default: false,
    }
  },
  methods:{
    ...mapActions({
      Logout:'Logout/Logout',
    }),

    updatePanel(){
      this.$emit('update:showPanel', false);
    },
    logoutUsers(){
      this.Logout();
      //$store.dispatch('actionA').then(() => {}
    },
  },
  computed: {
    ...mapState({
      status: state => state.Logout.status,
      token: state => state.Logout.token,
    }),
  }
}
</script>


<style >
*{
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.panel{
  display: block;
  position: fixed;
  background: lightblue;
  border: 2px solid gray;
  font-size: 22px;
  float: left;
  width: 33vw;
  height: auto;
}
.content{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;

  margin: auto;
  color: white;

  padding: 30px 0 0 8px;
}
.content a{
  display: flex;
  margin-top: 30px;
  color:white;
  text-decoration: none;

}
.logout{

}
</style>