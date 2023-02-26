<template>
  <my-side-panel v-model:showPanel="dialogVisible"></my-side-panel>
  <div class="all-content"  v-bind:class="{'active':dialogVisible}">
    <my-button v-on:click.stop="showDialog" class="button">&#9776;</my-button>


    <div>
      <div class="text-content">

          <!--В зависимости от количества групп подгружаем компоненты v-for="window in window"-->
          <my-window-group
              v-for="group in limit"
              v-if="!isPostsLoading">

          </my-window-group>
        <div v-else class="Loading-picture">Loading...</div>
      </div>
      <div v-intersection="loadMoreGroups" class="observer"></div>

    </div>


  </div>
</template>


<script>
import MySidePanel from "@/components/UI/MySidePanel.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyWindowGroup from "@/components/UI/MyWindowGroup.vue";
import {mapState, mapMutations, mapGetters,mapActions} from "vuex";

export default {
  components:{MyWindowGroup, MyButton, MySidePanel},
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods:{
    ...mapActions({
      isApi:'Auth/initApi'
    }),
    ...mapMutations({
      setPage:'Loading/setPage',
    }),
    ...mapActions({
      loadMoreGroups:'Loading/loadMoreGroups',
      fetchGroups:'Loading/fetchGroups'
    }),

    showDialog() {
      this.dialogVisible = true;
    },
    hideDialog() {
      this.dialogVisible = false;
    },
  },

  computed: {
    ...mapState({
      groups: state => state.Loading.groups,
      isPostsLoading: state => state.Loading.isPostsLoading,
      page: state => state.Loading.page,
      limit: state => state.Loading.limit,
      totalPages: state => state.Loading.totalPages,
    }),
  },

  mounted() {
    this.isApi();
    //const group= document.querySelector('')
    this.fetchGroups();
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
  margin-left: 33vw;
}
.button{
  flex-direction: column;
  float: left;
  padding: 11px;
  margin: 8px;
  border: 3px solid midnightblue;
}
my-window-group{
  display: flex;
  margin-top: 15px;
}
.Loading-picture{
  font-size: 18px;
  margin-left: auto;
  margin-right: auto;

}
</style>