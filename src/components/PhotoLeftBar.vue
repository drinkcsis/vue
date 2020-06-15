<template>
	<div :class="'left-bar left-bar_'+index">
		<div class="header">
			<div class="date">{{this.data.date}}</div>
			<div class="location">{{this.data.location}}</div>
		</div>
		<span class="description">{{this.data.description}}</span>
	</div>
</template>

<script>
export default {
	props: {
		index: {
			type: Number,
			required: true
		},
		data: {
			type: Object,
			required: true,
			default: function() {
				return {
					description: String,
					date: Date,
					location: String
				};
			}
		}
	},
	methods: {
		hideDesc() {
			document.querySelector(".viewer-canvas .left-bar").remove();
		},
		showDesc(viewer) {
			if (document.querySelector(".viewer-canvas .left-bar"))
				document.querySelector(".viewer-canvas .left-bar").remove();
			const desc = document
				.querySelector(".left-bar_" + parseInt(viewer.index))
				.cloneNode(true);
			desc.style.left =
				parseInt(viewer.imageData.left) +
				parseInt(viewer.imageData.width) +
				"px";
			desc.style.height = parseInt(viewer.imageData.height) + "px";
			desc.style.top = parseInt(viewer.imageData.top) + "px";
			document.querySelector(".viewer-canvas").appendChild(desc);
			setTimeout(() => {
				document
					.querySelector(".viewer-canvas .left-bar")
					.classList.add("left-bar-shown");
			}, 100);
		}
	}
};
</script>

<style scoped>
.left-bar {
	width: 280px;
	font-size: 15px;
	position: absolute;
	background: white;
	line-height: 20px;
	word-break: break-all;
	opacity: 0;

	transition: opacity 0.3s;
}
.left-bar-shown {
	opacity: 1;
}
.header {
	padding: 10px;
	line-height: 20px;
}
.date {
	color: #797979;
	font-weight: bold;
}
.location {
	font-size: 14px;
	font-weight: bold;
	font-style: italic;
}
.description {
	height: 80%;
	display: block;
	overflow-y: scroll;
	margin-top: 80px;
	padding: 0 10px 10px 10px;
	text-align: justify;
	word-break: break-word;
	height: -webkit-fill-available;
	position: inherit;
	bottom: 15px;
}

::-webkit-scrollbar {
	width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
	background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}
</style>