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
import { ref, computed } from 'vue';
import service from '@_utils/service';

const props = defineProps({
  address: String,
});

const loading = ref(true);
const online = ref(false);
const players = ref(0);

const status = computed(() => {
	return online.value ? 'online' : 'offline'
})

service.get(`servers/${props.address}/players`)
.then(res => {
	res.data.online && (online.value = res.data.online)
	res.data.players && (players.value = res.data.players)
})
.catch(err => {
  online.value = false
})
.then(_ => loading.value = false)

</script>

<style lang="scss">
.status {
  &--online {
    --led-color: #4ce649;
  }

  &--offline {
    --led-color: #e64980;
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
  user-select: none;

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