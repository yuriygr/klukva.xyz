<template>
  <div class="placeholder">
    <div class="placeholder__text"><slot /></div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  header: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss">
.placeholder {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  color: inherit;
  text-align: center;
  padding: 1rem;
  user-select: none;
  font-family: 'Minecraft';
  min-height: 104px;

  &__text {
    color: #999;
    font-weight: 400;
    margin: 0;
    padding: 0;
    font-size: 1.4rem;
    line-height: calc(1.6 * 1em);
  }
}
</style>