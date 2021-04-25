<template>
	<div class="alboms">
		<AlbomCreateForm v-on:albomCreated="albomCreated"></AlbomCreateForm>
		<GalleryGrid>
			<template slot="items">
				<div
					class="masonry-item albom"
					@click="openAlbom(albom)"
					v-for="albom in alboms"
					:key="albom.ID"
				>
					<div class="masonry-content">
						<img
							:src="(albom.preview_photos && albom.preview_photos[0]) ? albom.preview_photos[0].urls.small : '../assets/images/default-albom.png'"
							:alt="albom.description"
						/>
						<h3 class="masonry-title">{{albom.title}}</h3>
						<p class="masonry-description">{{albom.description}}</p>
					</div>
				</div>
			</template>
		</GalleryGrid>
	</div>
</template>

<script>
// @ts-nocheck
// @ is an alias to /src
import GalleryGrid from "@/components/GalleryGrid.vue";
import AlbomCreateForm from "@/components/AlbomCreateFom.vue";
import API2 from "../services/api";
import resizeGridMixing from '../mixins/resizeGridMixing'

export default {
	name: "Alboms",
	mixins:[resizeGridMixing],
	components: {
		GalleryGrid,
		AlbomCreateForm
	},
	data: function() {
		return {
			alboms: [],
			perPage: 30
		};
	},
	methods: {
		openAlbom: function(albom) {
			this.$router.push({ path: "/albom/" + albom.ID });
		},
		fetchAlboms: function() {
			const albomCollection = API2.fetchAlboms({
				per_page: this.perPage,
				page: 1
			});
			this.alboms = albomCollection;
		},
		albomCreated: function(albomModel) {
			this.alboms.push(albomModel);
		},
	},
	mounted: function() {
		this.fetchAlboms();
		var masonryEvents = ["load", "resize"];
		masonryEvents.forEach(event => {
			window.addEventListener(event, this.resizeAllMasonryItems);
		});
	}
};
</script>
