<template>
  <div :class="[
    'status',
    `status--${status}`
  ]">
    <div class="status__icon"></div>
    <div class="status__text">{{ online_players }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import service from '@_utils/service';

const props = defineProps({
  address: String,
});

const loading = ref(true);
const status = ref('loading');
const online_players = ref(0);

service.get(`servers/${props.address}`)
.then(res => {
	status.value = 'online'
	online_players.value = res.onlinePlayers
})
.catch(err => {
  status.value = 'offline'
})
.then(_ => loading.value = false)

</script>

<style lang="scss">
.status {
  &--loading {
    --led-color: #8d8d8d;
  }

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
    line-height: 1;
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