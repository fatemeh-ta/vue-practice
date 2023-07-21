new Vue({
  el: "#app",
  data: {
    product: "Socks",
    image: "./assets/socks-green.jpeg",
    altText: "alt",
    description: "A pair of warm, fuzzy socks",
    inStock: true,
    onSale: true,
    link: "https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding",
    variants: [
      {
        varianColor: "green",
        variantSrc: "./assets/socks-green.jpeg",
        variantId: 1,
      },

      {
        varianColor: "blue",
        variantSrc: "./assets/socks-blue.jpeg",
        variantId: 2,
      },
    ],
    sizes: [
      { key: 0, title: "small" },
      { key: 1, title: "medium" },
      { key: 2, title: "large" },
      { key: 3, title: "xLarge" },
    ],
    cart: 0,
  },

  methods: {
    addCart() {
      this.cart += 1;
    },

    updateImage(image) {
      this.image = image.variantSrc;
    },

    decreaseCart() {
      if (this.cart > 0) {
        this.cart -= 1;
      } else {
        this.cart = 0;
      }
    },
  },
});
