
<template>
	{{ players }}
</template>

<script setup>
import { ref, defineProps } from 'vue';
import axios from 'axios';

const props = defineProps({
  address: String
});

const players = ref({});

axios.get(`https://api.mcsrvstat.us/3/${props.address}`)
.then(res => {
	players.value = res.data.players
})
.catch(console.log)
</script>