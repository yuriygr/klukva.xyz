<template>
  <div :class="$elClass">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, computed } from 'vue'

interface Props {
  withGap?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  withGap: true
})

const $elClass = computed(() => {
  return [
    'buttons-group',
    {
      'buttons-group--with-gap': props.withGap
    }
  ]
})
</script>

<style lang="scss">
.buttons-group {
  display: flex;
  justify-content: center;
  align-items: center;

  &--with-gap {
    > :not(:first-child) {
      margin-left: .5rem;
    }
  }
}
</style>