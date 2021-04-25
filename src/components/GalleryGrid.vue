<template>
	<div class="masonry-wrapper">
		<!-- <div class="masonry-item" v-for="photo in photos" :key="photo.id">
				<img :src="photo.urls.small" />
		</div>-->
		<div class="masonry">
			<slot name="items"></slot>
		</div>
	</div>
</template>

<script>
import resizeGridMixing from '../mixins/resizeGridMixing'
export default {
	mixins: [resizeGridMixing],
	mounted: function() {
		this.resizeAllMasonryItems();
	},
	updated: function() {
		const imgs = document.querySelectorAll(".masonry-content img");
		imgs.forEach(img => {
			img.addEventListener("load", this.resizeAllMasonryItems);
		});
	},
	destroyed: function() {
		const imgs = document.querySelectorAll(".masonry-content img");
		imgs.forEach(img => {
			img.removeEventListener("load", this.resizeAllMasonryItems);
		});
	}
};
</script>

<style scoped>
/**
 * BASIC TYPE
 */

img,
video {
	max-width: 100%;
	vertical-align: middle;
}

p:not(:last-child) {
	margin: 0 0 1em;
}

h1,
h2,
h3,
h4 {
	margin: 0.5em 0 0.75em;
	line-height: 1.3;
}

h1 {
	font-size: 1.5em;
}

h2 {
	font-size: 1.25em;
}

h3 {
	font-size: 1.125em;
}

h4 {
	font-size: 1em;
}

/**
 * BOX HACKING
 */

html {
	box-sizing: border-box;
}

*,
*:before,
*:after {
	box-sizing: inherit;
}
.wrapper {
	max-width: 1280px;
	margin-right: auto;
	margin-left: auto;
	padding: 1.5em;
}
body {
	background-color: #cccccc;
	color: #333333;
}
.masonry-wrapper {
	padding: 1.5em;
	max-width: 960px;
	margin-right: auto;
	margin-left: auto;
}
.masonry {
	display: grid;
	grid-template-columns: repeat(1, minmax(100px, 1fr));
	grid-gap: 10px;
	grid-auto-rows: 0;
}
@media only screen and (max-width: 1023px) and (min-width: 768px) {
	.masonry {
		grid-template-columns: repeat(2, minmax(100px, 1fr));
	}
}
@media only screen and (min-width: 1024px) {
	.masonry {
		grid-template-columns: repeat(4, minmax(100px, 1fr));
	}
}
.masonry-item,
.masonry-content {
	border-radius: 4px;
	overflow: hidden;
}
.masonry-item {
	filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.3));
	transition: filter 0.25s ease-in-out;
}
.masonry-item:hover {
	filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.3));
}
.masonry-content {
	overflow: hidden;
}
.masonry-item {
	color: #111111;
}
.masonry-title,
.masonry-description {
	margin: 0;
}
.masonry-title {
	font-weight: 700;
	font-size: 1.1rem;
	padding: 1rem 1.5rem;
}
.masonry-description {
	padding: 1.5rem;
	font-size: 0.75rem;
	border-top: 1px solid rgba(0, 0, 0, 0.05);
}
.masonry-footer {
	font-size: 0.75em;
	opacity: 0.25;
	text-align: center;
	padding-top: 3em;
	padding-bottom: 3em;
	margin-bottom: -1.5em;
	transition: opacity 1s ease-in-out;
}
.masonry-footer a {
	color: currentColor;
}
.masonry-footer:hover,
.masonry-footer:active,
.masonry-footer:focus {
	opacity: 0.75;
}

/* CUST */
.masonry-item {
	filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.3));
	transition: filter 0.25s ease-in-out;
}
.masonry-item:hover {
	filter: drop-shadow(0px 8px 8px rgba(0, 0, 0, 1));
}
.masonry-item:active {
	transition: filter 0.05s ease-in-out;
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
}

/* FOR ALBOMS */
.albom {
	background-color: #f9f9f9;
}
.masonry-content {
	position: relative;
}

/*.IMAGE HEADER */
.img-header {
	position: absolute;
	background: #999999d1;
	width: 100%;
	height: 0px;
	padding: 10px;
	visibility: hidden;
	opacity: 0;
}
.masonry-item:hover .img-header {
	transition: visibility 0s, height 0.2s, opacity 0.3s linear;
	height: 30px;
	opacity: 1;
	visibility: visible;
}
.delete-icon {
	display: block;
	float: right;
	margin-right: 20px;
	margin-top: 5px;
	background: red;
	width: 20px;
	height: 20px;
	border-radius: 15px;
}
</style>
