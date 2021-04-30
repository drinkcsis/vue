<template>
	<div>
		<vue-dropzone
			@vdropzone-sending-multiple="upload"
			ref="myVueDropzone"
			id="dropzone"
			:options="dropzoneOptions"
		></vue-dropzone>
	</div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import photoService from "../services/Photo/photoService";

export default {
	name: "app",
	components: {
		vueDropzone: vue2Dropzone
	},
	data: function() {
		return {
			dropzoneOptions: {
				url: "http://localhost",
				thumbnailWidth: 150,
				maxFilesize: 20,
				uploadMultiple: true,
				parallelUploads: 10
			}
		};
	},
	methods: {
		upload: async function(files) {
			files.forEach(async file => {
				const photoModel = await photoService.uploadPhoto({
					albomId: parseInt(this.$route.params.id),
					file
				});
				if (photoModel) this.$emit("photoUploaded", photoModel);
				this.$refs.myVueDropzone.removeFile(file);
			});
		}
	}
};
</script>

<style>
#dropzone {
	background: #cccccc29;
}
</style>