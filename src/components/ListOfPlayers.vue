
<template>
	<slot v-if="loading" name="loading"/>

	<template v-else>
		<slot v-if="!online" name="offline"/>
		<slot v-if="players.online == 0" name="no_players"/>

		<template v-if="players.online > 0">
			<div class="players-online">{{ players.online }} / {{ players.max }}</div>
			<div :class="[ 'players-progressbar', `players-progressbar--${loaded}` ]" :style="{ '--percent': percent }">
				<div class="inner"></div>
				<div class="bar"></div>
			</div>
			<div class="players-list">
				<div class="player-item" v-for="player in players.list" :key="`player-${player.uuid}`">
					<span>{{ player.name }}</span>
				</div>
			</div>
		</template>
	</template>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const props = defineProps({
  address: String
});

const loading = ref(true);
const online = ref(false);
const players = ref({});

const percent = computed(() => {
	let p = players.value
	return Math.floor((p.online / p.max) * 100)
})

const loaded = computed(() => {
	let x = percent.value;
	switch (true) {
    case (x < 40):
			return 'low'
    case (x < 50):
			return 'normal'
    case (x < 75):
			return 'height'
    default:
			return 'normal'
	}
})


axios.get(`https://api.mcsrvstat.us/3/${props.address}`)
.then(res => {
	res.data.online && (online.value = res.data.online)
	res.data.players && (players.value = res.data.players)
})
.catch(console.log)
.then(_ => loading.value = false)
</script>

<style lang="scss">

.players-online {
	font-size: 1.2rem;
	line-height: calc(1.6 * 1em);
	text-align: center;
	margin-bottom: .5rem;
	user-select: none;

	color: #aaa;
	text-shadow: 1px 1px 0 #2a2a2a;
}

.players-progressbar {

	&--low {
		--porgressbar__bar-color: rgba(20, 187, 32, 0.45);
	}

	&--height {
		--porgressbar__bar-color: #82282c;
	}

	&--normal {
		--porgressbar__bar-color: #559293;
	}

	background: #999 url("/src/assets/background/button.png") center / cover;
	border-radius: 2px;
	overflow: hidden;
	position: relative;
	height: 2rem;

	.inner {
		box-shadow: var(--x-box-shadow);
		width: 100%;
		height: 100%;
		position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
		right: 0;
		z-index: 5003;
	}

	.bar {
		background: var(--porgressbar__bar-color);
		width: calc(var(--percent) * 1%);
		height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
		z-index: 5002;
	}
}

.players-list {
	display: grid;
	position: relative;
	margin-top: 1rem;
}

.player-item {
	span {
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