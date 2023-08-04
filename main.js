Vue.component("product", {
  template: `
    <div>
      <div class="product">
        <div class="product-image">
          <img :src="image" :alt="altText" />
        </div>
        <div class="product-info">
          <h1>{{title}}</h1>
          <p>{{description}}</p>
          <p v-if="inStock">In Stock</p>

          <!--*************** PRACTICE PART 6 ******************* -->
          <p v-else :class="!inStock ? 'textDec' : ''">Out of Stock</p>

          <p> shipping: {{ shipping }}</p>

          <!--*************** END OF PRACTICE PART 6 ******************* -->



          <span v-show="onSale">On Sale!</span>
          <a :href="link">link</a>

          <!--*************** PRACTICE PART 7 ******************* -->
          <p>{{onSalePrint}}</p>

          <!--*************** END OF PRACTICE PART 7 ******************* -->
        </div>

        <!--*************** PRACTICE PART 8 ******************* -->
        <product-details :details="details" />
        <!--*************** END OF PRACTICE PART 8 ******************* -->

        <div
          v-for="(variant,index) in variants"
          :key="variant.variantId"
          class="box_color"
          :style="{backgroundColor : variant.varianColor}"
          @mouseover="updateImage(index)"
        >
          <!-- <p @mouseover="updateImage(variant)">{{variant.varianColor}}</p> -->
        </div>
        <button
          @click="addCart"
          :disabled="!inStock"
          :class="{disable_button : !inStock}"
        >
          add cart
        </button>
      </div>

      <!-- Exercise LIST  -->
      <ul>
        <li v-for="size in sizes" :key="size.key">{{size.title}}</li>
      </ul>

      <!-- decrease cart  -->
      <button @click="decreaseCart">decrease cart</button>
      <p>cart:{{cart}}</p>
    </div>
  `,

  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
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
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
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
    };
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

    shipping() {
      if (this.premium) {
        return "free";
      }
      return 2.99;
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

Vue.component("product-details", {
  template: `
  <ul>
    <li v-for="detail in details">{{ detail }}</li>
  </ul>
`,

  props: {
    details: {
      type: Array,
      required: true,
    },
  },
});

new Vue({
  el: "#app",
  data: {
    premium: true,
  },
});
