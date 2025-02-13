
<template>
	<slot v-if="loading" name="loading"/>

	<template v-else>
		<slot v-if="Object.keys(data).length == 0" name="error "/>

		<template v-if="Object.keys(data).length > 0">
			{{ data }}
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