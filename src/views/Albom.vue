<template>
	<div class="alboms">
		<Modal :showModal="showModal" />
		<ImageUploader v-on:photoUploaded="photoUploaded" />
		<GalleryGrid>
			<template slot="items">
				<div
					@click="showImage(index)"
					class="masonry-item photo"
					v-for="(photo, index) in photos"
					:key="photo.id"
				>
					<div class="masonry-content">
						<div class="img-header">
							<span class="delete-icon" @click.stop=" removeImage($event, photo, index)"></span>
						</div>
						<img :src="photo.urls.small" />
					</div>
				</div>
			</template>
		</GalleryGrid>
		<Viewer :settings="viewerSettings" :photos="photos"></Viewer>
	</div>
</template>

<script>
// @ is an alias to /src
import GalleryGrid from "@/components/GalleryGrid.vue";
import ImageUploader from "@/components/ImageUploader.vue";
import Viewer from "@/components/Viewer.vue";
import Modal from "@/components/Modal";
import photoService from "../services/Photo/photoService";

export default {
	name: "Alboms",
	components: {
		GalleryGrid,
		ImageUploader,
		Viewer,
		Modal
	},
	data: function() {
		return {
			showModal: false,
			photos: [],
			perPage: 300,
			viewerSettings: {
				initialViewIndex: 0,
				isOpen: false
			},
			albomId: this.$route.params.id
		};
	},
	methods: {
		showImage: function(index) {
			this.viewerSettings = {
				initialViewIndex: index,
				isOpen: true
			};
		},
		fetchPhotos: async function() {
			const photos = await photoService.fetchPhotos({
				albomId: this.albomId,
				perPage: this.perPage,
				page: 1
			});
			this.photos = photos;
		},
		photoUploaded: function(newPhotoModel) {
			this.photos.push(newPhotoModel);
		},
		removeImage: function(event, photo, index) {
			if(confirm('Are you sure?')) {
				photoService.deletePhoto({albomId: this.albomId, photo});
				this.photos.splice(index, 1);
			}
		}
	},
	created: async function() {
		await this.fetchPhotos();

		var masonryEvents = ["load", "resize"];
		masonryEvents.forEach(event => {
			window.addEventListener(event, this.resizeAllMasonryItems);
		});
	}
};
</script>
