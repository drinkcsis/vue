<template>
	<div class="viewer-wrapper">
		<!-- component -->
		<viewer :options="options" @inited="inited" ref="viewer" :images="photos">
			<div v-for="(photo, index) in photos" :key="photo.id">
				<img :src="photo.urls.origin_url" />
				<PhotoLeftBar :data="{location:'Warsaw', date: '2020-01-01', description:`Where does it come from Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`}" :index="index" ref="photoLeftBar" />
			</div>
		</viewer>
	</div>
</template>

<script>
import "viewerjs/dist/viewer.css";
import PhotoLeftBar from "./PhotoLeftBar";
export default {
	components: {
		PhotoLeftBar
	},
	props: ["settings", "photos"],
	data: function() {
		const $this = this;
		return {
			options: {
				zoomable: false,
				movable: false,
				// zoom() {
				// 	if (document.querySelector(".viewer-canvas .left-bar"))
				// 		document.querySelector(".viewer-canvas .left-bar").remove();
				// },
				// zoomed() {
				// 	$this.showDesc(this.viewer);
				// },
				viewed() {
					$this.$refs.photoLeftBar[this.viewer.index].showDesc(this.viewer);
				},
				hidden() {
					$this.$refs.photoLeftBar[this.viewer.index].hideDesc();
				},
				ready() {
					const imgs = document.querySelectorAll("img");

					document
						.querySelector(".masonry-wrapper")
						.addEventListener("mouseover", () => {
							document.querySelectorAll("img:not(.active)").forEach(img => {
								img.classList.add("un-active");
							});
						});

					document
						.querySelector(".masonry-wrapper")
						.addEventListener("mouseout", () => {
							document.querySelectorAll("img").forEach(img => {
								img.classList.remove("un-active");
							});
						});

					imgs.forEach(img => {
						img.addEventListener("mouseover", event => {
							event.target.classList.remove("un-active");
							event.target.classList.add("active");
						});
						img.addEventListener("mouseout", event => {
							event.target.classList.add("un-active");
							event.target.classList.remove("active");
						});
					});
				}
			}
		};
	},

	mounted: function() {
		this.$watch(
			"settings",
			settings => {
				if (settings.isOpen) {
					this.$viewer.index = settings.initialViewIndex;
					this.$viewer.show();
				}
			},
			{ immediate: true }
		);
	},

	methods: {
		inited(viewer) {
			this.$viewer = viewer;
		}
	}
};
</script>

<style >
.viewer-wrapper {
	display: none;
}

.viewer-move.viewer-transition {
	position: inherit !important;
}
.viewer-canvas {
	display: inline-flex;
}
img.un-active {
	opacity: 0.5;
}
.masonry-item.photo:hover {
	transform: scale(1.1);
	z-index: 10;
}
</style>