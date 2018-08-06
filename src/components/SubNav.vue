<template>
  <ul>
    <li v-for="(nav, index) in navs.subs" :class="activeSelect==nav.id? 'selected':''" @click="selectSubNav(navs.id, nav.id)"><span>
      <router-link :to="{name:nav.url}">{{nav.name}}</router-link>
      <!-- <a href="/">{{nav.name}}</a> -->
    </span></li>
  </ul>
</template>
<script>
import connect from '@/assets/js/connector.js';
export default {
  data () {
    return {
      activeSelect: 0
    };
  },
  name: 'sub-nav',
  props:['navs'],
  methods:{
    selectSubNav(pid, id){
      this.activeSelect = id;
      connect.$emit('sub-to-parent',{navId: pid, subId: id});
    }
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
li a{
  color: #8e8e8e;
  text-decoration: none;
}
li.selected a{
  color: rgb(255, 208, 75);
}
</style>