import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import nav from '@/store/nav.js';//引入某个store对象
import chat from '@/store/chat.js';

export default new vuex.Store({
    modules: {
        nav: nav,
        chat: chat 
    }
})