import { createStore } from 'vuex'
import {registerUsersModule} from "@/store/registerUsersModule";
import {AuthModule} from "@/store/AuthModule"
import {logoutModule} from "@/store/logoutModule";
import {loadingGroup} from "@/store/loadingGroup";
export default createStore({
  //ядро в vuex
  modules: {
    Register: registerUsersModule,
    Auth: AuthModule,
    Logout: logoutModule,
    Loading: loadingGroup,
  }
})

