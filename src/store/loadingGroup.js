
import axios from "axios";

export const loadingGroup = {
    state: () => ({
        groups:[],//данные о группе название,картинка берем из тела ответа от сервера
        isPostsLoading: false,
        page: 1,
        limit: 12,//4 на 3 количество блоков групп на одной странице
        totalPages: 0,
    }),
    getters: {

    },
    mutations: {
        setLoading(state, bool) {
            state.isPostsLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        //через мутацию записываем данные в массив
        setGroups(state, groups) {
            state.groups = groups;
        },
    },
    actions: {
        //подгрузка групп относительно данных с сервера
        async fetchGroups({state, commit}) {
            try {
                commit('setLoading', true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setGroups', response.data)
            } catch (e) {
                console.log(e)
            } finally {
                commit('setLoading', false);
            }
        },
        // бесконечная лента
        async loadMoreGroups({state, commit}) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setGroups', [...state.posts, ...response.data]);
            } catch (e) {
                console.log(e)
            }
        }
    },
    namespaced: true
}