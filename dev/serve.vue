<script lang="ts">
import Vue from 'vue';
import VScaleScreen from '@/v-scale-screen.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VScaleScreen
  }
});
</script>

<template>
  <div id="app">
    <v-scale-screen width="1920" height="1080" >
      <img src="./assets/images/charts.png" alt="">
    </v-scale-screen>
  </div>
</template>

<style>
div{
  color: white;
  font-size: 130px;
  //background: #fff;
}
</style>
