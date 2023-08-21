var eventBus = new Vue();

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

          

          <!--*************** END OF PRACTICE PART 6 ******************* -->



          <span v-show="onSale">On Sale!</span>
          <a :href="link">link</a>

          <!--*************** PRACTICE PART 7 ******************* -->
          <p>{{onSalePrint}}</p>

          <!--*************** END OF PRACTICE PART 7 ******************* -->
        </div>

        <!--*************** PRACTICE PART 8 ******************* -->
        
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

      <!--TAB  -->

      <product-tabs :reviews="reviews" />

      <product-tabs-shopping :shipping="shipping" :details="details"/>

      <!-- Exercise LIST  -->
      <ul>
        <li v-for="size in sizes" :key="size.key">{{size.title}}</li>
      </ul>

      <!-- decrease cart  -->
      <button @click="decreaseCart">decrease cart</button>
    
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
      reviews: [],
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
      // this.cart += 1;
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },

    // updateImage(image) {
    //   this.image = image.variantSrc;
    // },

    updateImage(index) {
      this.selectedVariant = index;
    },

    decreaseCart() {
      this.$emit("down-cart");
      // if (this.cart > 0) {
      //   this.cart -= 1;
      //   this.$emit("addCart");
      // } else {
      //   this.cart = 0;
      //   this.$emit("");
      // }
    },

    // addReview(props) {
    //   this.reviews.push(props);
    // },
  },

  mounted() {
    eventBus.$on("review-submitted", (productReview) => {
      this.reviews.push(productReview);
    });
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

Vue.component("product-view", {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>


      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <h5>Would you recommend this product ?</h5>
         <input type="radio" id="agree" value="yes" name="product" v-model="result">
         <label for="agree">Yes</label>
         <input type="radio" id="disagree" value="no" name="product" v-model="result">
         <label for="disagree">No</label>
      </p>
        
      <p>
        <input type="submit" value="Submit">  
      </p>    

    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: [],
      result: null,
    };
  },

  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating && this.result) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          result: this.result,
        };
        eventBus.$emit("review-submitted", productReview);
        this.name = "";
        this.review = "";
        this.rating = "";
        this.result = "";
      } else {
        if (!this.name) {
          this.errors.push("please enter name");
        }
        if (!this.review) {
          this.errors.push("please enter review");
        }
        if (!this.rating) {
          this.errors.push("please enter rate");
        }
        if (!this.result) {
          this.errors.push("please enter result");
        }
      }
    },
  },
});

Vue.component("product-tabs", {
  template: `
    <div>
      <div class="tab">
        <span v-for="(tab,index) in tabs" :key="index" @click="selectedTab(tab)" :class="selectedValue === tab ? 'activeTab' : ''">{{ tab }}</span>
      </div>

      <!-- FORM & MODAL  -->
      <div v-show="selectedValue === 'Reviews'">
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul v-else>
          <li v-for="(review,index) in reviews" :key="index" >
            <p>{{review.name}}</p>
            <p> Rating: {{review.rating}}</p>
            <p>Review: {{review.review}}</p>
            <p>Result: {{review.result}}</p>
          </li>
        </ul>
      </div>
      <product-view  v-show="selectedValue === 'Make a Review'"/>
    
    </div>


  `,

  props: {
    reviews: {
      type: Array,
      default: () => {},
    },
  },

  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedValue: "Reviews",
    };
  },

  methods: {
    selectedTab(value) {
      this.selectedValue = value;
    },
  },
});

Vue.component("product-tabs-shopping", {
  props: {
    shipping: {
      type: String,
      required: true,
    },

    details: {
      type: Array,
      required: true,
    },
  },
  template: `
    <div>

      <div class="tab">
        <span v-for="(tab,index) in tabs" :key="index" @click="showModal(tab)" :class="selectedValue === tab ? 'activeTab' : ''">{{ tab }}</span>
      </div>
      <p v-show='selectedValue === "shopping"'> shipping: {{ shipping }}</p>
      <product-details v-show="selectedValue === 'detail'" :details="details" />
    
    </div>
  `,

  data() {
    return {
      tabs: ["shopping", "detail"],
      selectedValue: "shopping",
    };
  },

  methods: {
    showModal(val) {
      this.selectedValue = val;
    },
  },
});

new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: [],
  },

  methods: {
    updateCart(id) {
      // this.cart += 1;
      this.cart.push(id);
    },

    decreaseCart() {
      // if (this.cart > 0) {
      //   this.cart -= 1;
      // } else {
      //   this.cart = 0;
      // }
      if (this.cart.length > 0) {
        this.cart = [];
      }
    },
  },
});
