<template>
	<div class="create-albom-form-wrapper">
		<div class="create-albom-form">
			<!-- <input type="file" multiple /> -->
			<input placeholder="Albom Name" type="text" v-model="title" />
			<textarea placeholder="Albom Desc" rows="1" v-model="description" />
			<button type="submit" @click="createAlbom()">Create albom</button>
		</div>
	</div>
</template>

<script>
import API from '../services/api'

export default {
	data: function() {
		return {
			title: "",
			description: ""
		};
	},
	methods: {
		createAlbom: async function() {
			const albom = await API.createAlbom({
				title: this.title,
				description: this.description
			});
			this.$emit("albomCreated", albom);
		}
	}
};
</script>

<style scoped>
.create-albom-form-wrapper {
	display: inline-flex;
	margin: 0 auto;
}
.create-albom-form {
	display: flex;
}
input {
	padding: 10px;
}
textarea {
	padding-top: 10px;
}
</style>
