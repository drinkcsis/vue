export default {
    methods: {
        resizeAllMasonryItems: function () {
            // Get all item class objects in one list
            var allItems = document.querySelectorAll(".masonry-item");
            /*
             * Loop through the above list and execute the spanning function to
             * each list-item (i.e. each masonry item)
             */
            if (allItems) {
                allItems.forEach(item => {
                    this.resizeMasonryItem(item);
                });
            }
        },
        resizeMasonryItem: function (item) {
            /* Get the grid object, its row-gap, and the size of its implicit rows */
            var grid = document.getElementsByClassName("masonry")[0];

            if (grid) {
                var rowGap = parseInt(
                    window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
                ),
                    rowHeight = parseInt(
                        window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
                    ),
                    gridImagesAsContent = item.querySelector("img.masonry-content");

                /*
                 * Spanning for any brick = S
                 * Grid's row-gap = G
                 * Size of grid's implicitly create row-track = R
                 * Height of item content = H
                 * Net height of the item = H1 = H + G
                 * Net height of the implicit row-track = T = G + R
                 * S = H1 / T
                 */
                var rowSpan = Math.ceil(
                    (item.querySelector(".masonry-content").getBoundingClientRect()
                        .height +
                        rowGap) /
                    (rowHeight + rowGap)
                );

                /* Set the spanning as calculated above (S) */
                item.style.gridRowEnd = "span " + rowSpan;

                if (gridImagesAsContent) {
                    item.querySelector("img.masonry-content").style.height =
                        item.getBoundingClientRect().height + "px";
                }
            }
        }
    }
}