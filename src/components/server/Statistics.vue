<template>
	<slot v-if="loading" name="loading"/>

	<template v-else>
		<slot v-if="statistics_keys.length == 0" name="error"/>

		<template v-for="(key, index) in statistics_keys">
			<div class="statistic-item">
				<div class="statistic-item__label">{{ dict[key] }}</div>
				<div class="statistic-item__value">{{ data[key] }}</div>
			</div>
			<slot v-if="(++index != statistics_keys.length)" name="separator" />
		</template>

	</template>
</template>

<script setup>
import { ref, computed } from 'vue';
import service from '@_utils/service';

const props = defineProps({
  address: String
});

const loading = ref(true);
const data = ref({});
const dict = {
	'unique_players': 'Уникальные игроки',
	'total_messages': 'Всего сообщений',
	'total_joins': 'Всего присоединений',
	'total_quits': 'Всего выходов',
	'total_kicks': 'Всего киков',
	'total_deaths': 'Всего смертей'
}

const statistics_keys = computed(() => {
	return Object.keys(data.value)
})

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
.statistic-item {
	display: flex;
	align-items: center;
	justify-content: space-between;

	&__label {
		color: #d5d5d5;
		font-size: 1.2rem;

		white-space: pre-line;
		word-wrap: break-word;
		word-break: break-word;
		font-weight: 400;
		line-height: calc(1.1 * 1em);
	}

	&__value {
		color: #fff;
		font-size: 1.2rem;

		white-space: pre-line;
		word-wrap: break-word;
		word-break: break-word;
		font-weight: 400;
		line-height: calc(1.1 * 1em);
	}
}
</style>