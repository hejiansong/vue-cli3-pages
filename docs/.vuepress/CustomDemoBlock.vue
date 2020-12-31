<template>
  <div>
    <a-card>
      <slot name="description"></slot>
    </a-card>
    <a-card>
      <slot name="demo"></slot>
    </a-card>
    <a-card>
      <slot name="source"></slot>
    </a-card>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
@Component({
  components: {}
})
export default class CustomDemoBlock extends Vue {}
</script>