new Vue({
  el: "#app",
  data: {
    product: "Socks",
    brand: "Vue mastery",
    // image: "",
    selectedVariant: 0,
    altText: "alt",
    description: "A pair of warm, fuzzy socks",
    // inStock: true,
    onSale: true,
    link: "https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding",
    // inStock: false,
    variants: [
      {
        varianColor: "green",
        variantSrc: "./assets/socks-green.jpeg",
        variantId: 1,
        variantQuantity: 0,
      },

      {
        varianColor: "blue",
        variantSrc: "./assets/socks-blue.jpeg",
        variantId: 2,
        variantQuantity: 10,
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

  computed: {
    title() {
      return this.brand + " " + this.product;
    },

    image() {
      return this.variants[this.selectedVariant].variantSrc;
    },

    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },

    onSalePrint() {
      if (this.onSale) {
        return this.brand + " " + this.product + " " + "product is sale";
      } else {
        return this.brand + " " + this.product + " " + "product is not sale";
      }
    },
  },

  methods: {
    addCart() {
      this.cart += 1;
    },

    // updateImage(image) {
    //   this.image = image.variantSrc;
    // },

    updateImage(index) {
      this.selectedVariant = index;
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
