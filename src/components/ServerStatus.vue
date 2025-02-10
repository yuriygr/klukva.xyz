<template>
  <div :class="[
    'status',
    `status--${status}`
  ]">
    <div class="status__icon"></div>
    <div v-if="status == 'online'" class="status__text">{{ players }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  status: String
});

const players = ref(0);

</script>

<style lang="scss">
.status {
  &--online {
    --led-color: green;
  }

  &--offline {
    --led-color: red;
  }
}

.status {
  background: #ffffff;
  border-radius: .25rem;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: .3rem .4rem;
  margin-top: .6rem;

  &__icon {
    width: 8px;
    height: 8px;
    background-color: var(--led-color);
    border-radius: 50%;
  }

  &__text {
    margin-left: .4rem;
    font-size: .8rem;
    font-weight: 700;
    color: #000;
    line-height: .8;
  }

  @keyframes blink {
    0%,to {
        opacity: 1
    }

    50% {
        opacity: .5
    }
  }
}
</style>