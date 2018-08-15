<template>
  <ul>
    <router-link v-for="(item, index) in subNavs.subs" :key=index :to="{name:item.url}">
      <li :class="activeId==item.id? 'selected':''" @click="selectSubNav(subNavs.id, item.id)">
        <span>{{item.name}}</span>
      </li>
    </router-link>
  </ul>
</template>
<script>
import {mapState,mapMutations,mapGetters} from 'vuex';
export default {
  data () {
    return {
    };
  },
  name: 'sub-nav',
  methods:{
    selectSubNav(pid, id){
      // this.nav.activeId = id;
      this.changeId(id);
    },
    ...mapMutations([
      'changePid',
      'changeId',
      'changeTabCollapse',
      'setUser',
      'setMeeting',
    ]),
  },
  computed:{
    ...mapState({
      nav:state=>state.nav
    }),
    ...mapGetters([
      'subNavs',
      'activePid',
      'activeId',
      'isTabCollapse',
      'user',
      'meeting'
    ])
  }
}
</script>
<style scoped>
ul{
  padding: 0px;
  min-width: 100px;
  /*margin: 0px;*/
}
li{
  list-style: none;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  color: #8e8e8e;
}
a{
  text-decoration: none;
}
li span{
  color: #8e8e8e;
}
li.selected span{
  color: rgb(255, 208, 75);
}
</style>