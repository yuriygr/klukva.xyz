
<template>

	<template v-if="loading">
		<slot />
	</template>

	<template v-else>

		<placeholder v-if="!online">Сервер оффлайн :(</placeholder>

		<placeholder v-if="players.online == 0">На сервере никого нет :(</placeholder>

		<template v-if="players.online > 0">
			<div class="players-online">{{ players.online }} / {{ players.max }}</div>
			<div class="players-list">
				<div class="player-item" v-for="player in players.list" :key="`player-${player.uuid}`">
					<span>{{ player.name }}</span>
				</div>
			</div>
		</template>
	</template>

</template>

<script setup>
import Placeholder from '@components/Placeholder.vue';

import { ref, defineProps } from 'vue';
import axios from 'axios';

const props = defineProps({
  address: String
});

const loading = ref(true);
const online = ref(false);
const players = ref({});

axios.get(`https://api.mcsrvstat.us/3/${props.address}`)
.then(res => {
	res.data.online && (online.value = res.data.online)
	res.data.players && (players.value = res.data.players)
})
.catch(console.log)
.then(_ => loading.value = false)
</script>

<style lang="scss">
.players-list {
	display: grid;
	position: relative;
}

.player-item {
	span {
		font-family: 'Minecraft';
			color: #fff;
			font-size: 1.2rem;

			white-space: pre-line;
			word-wrap: break-word;
			word-break: break-word;
			font-weight: 400;
			line-height: calc(1.6 * 1em);
	}
}
</style>