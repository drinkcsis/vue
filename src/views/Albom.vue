<template>
	<div class="alboms">
		<Modal :showModal="showModal" />
		<ImageUploader v-on:photoUploaded="photoUploaded" />
		<GalleryGrid>
			<template slot="items">
				<div
					@click="showImage(index)"
					class="masonry-item photo"
					v-for="(photo,index) in photos"
					:key="photo.id"
				>
					<div class="masonry-content">
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
import API from "../services/api";

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
			perPage: 30,
			viewerSettings: {
				initialViewIndex: 0,
				isOpen: false
			}
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
			const photos = await API.fetchPhotos({
				albomId: this.$route.params.id,
				perPage: this.perPage,
				page: 1
			});
			this.photos = photos;
		},
		photoUploaded: function(newPhotoModel) {
			this.photos.push(newPhotoModel);
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
