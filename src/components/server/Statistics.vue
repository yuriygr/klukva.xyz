
<template>
	<slot v-if="loading" name="loading"/>

	<template v-else>
		<slot v-if="status == 'offline'" name="offline"/>

		<template v-else-if="status == 'online'">
			<slot v-if="data.players.length == 0" name="no_players"/>

			<template v-if="data.players.length > 0">
				<div class="players-online">{{ data.online }} / {{ data.max }}</div>
				<div :class="[ 'players-progressbar', `players-progressbar--${loaded}` ]" :style="{ '--percent': percent }">
					<div class="inner"></div>
					<div class="bar"></div>
				</div>
				<div class="players-list">
					<div class="player-item" v-for="player in data.players" :key="`player-${player.uuid}`">
						<span>{{ player.displayName }}</span>
					</div>
				</div>
			</template>
		</template>
	</template>
</template>

<script setup>
import { ref } from 'vue';
import service from '@_utils/service';

const props = defineProps({
  address: String
});

const loading = ref(true);
const data = ref({});

service.get(`servers/${props.address}/statistics`)
.then(res => {
	data.value = res
})
.catch(err => {
	console.error(err)
})
.then(_ => loading.value = false)
</script>

<style lang="scss">

</style>