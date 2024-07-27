
<template>
	{{ serverDate }}
</template>

<script setup>
import { ref, defineProps } from 'vue';
import axios from 'axios';

const props = defineProps({
  address: String
});

const serverDate = ref({});

axios.get(`https://api.mcsrvstat.us/3/${props.address}`)
.then(res => {
	serverDate.value = res.data
})
.catch(console.log)
</script>