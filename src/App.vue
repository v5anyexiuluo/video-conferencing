<template>
  <div id="app" class="full-height" style="margin: 0px;">
    <router-view></router-view>
  </div>
</template>

<script>
  import Frame from '@/components/common/Frame';
  import properties from '@/properties/properties.js';
  export default {
    name: 'App',
    created: function(){
      
    },
    mounted: function(){
      console.log(this.$router)
    },
    methods:{
      
    },
    computed:{
    },
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
