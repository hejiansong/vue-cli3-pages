<template>
  <div class="about">
    <div>模块2</div>
    <h1>This is an about page</h1>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class About extends Vue {}
</script>