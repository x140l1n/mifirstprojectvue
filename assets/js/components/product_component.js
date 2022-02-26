Vue.component("product", {
    template: `
        <div>
            <div class="product">
                <div class="product-image">
                    <img v-bind:src="image">
                </div>
                <div class="product-info">
                    <h1>{{ title }}</h1>
                    <p>{{ description }}</p>
                    <!--<p v-if="inventory > 10">In Stock</p>                
                    <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
                    <p v-else>Out stock</p>-->
                    <p>Shipping: {{ shipping }}</p>
                    <p v-if="inStock">In Stock</p>
                    <p v-else :class="{ outOfStock: !inStock }">Out of stock</p>
                    <p>{{ sale }}</p>
                    <product-details :details="details"></product-details>
                    <p>
                        <b>Colors:</b>
                        <div v-for="(variant, index) in variants" 
                            :key="'variant' + variant.variantId"
                            class="color-box" 
                            :style="{ backgroundColor: variant.variantColor }"
                            v-on:mouseover="updateProduct(index)">
                        </div>
                    </p>
                    <p>
                        <b>Sizes:</b>
                        <div v-for="size in sizes" :key="'size' + size.sizeId">
                            <p>{{ size.size }}</p>
                        </div>
                    </p>
                    <button v-on:click="addToCart" 
                            :disabled="!inStock"
                            :class="{ disabledButton: !inStock }">Add to cart</button>
                    <button v-on:click="removeCart">Remove</button>
                </div>

                <product-tabs :reviews="reviews"></product-tabs>
            </div>
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
            brand: "Vue Mastery",
            description: "Socks vue is awesome!",
            selectedVariant: 0,
            inventory: 11,
            onSale: true,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 1,
                    variantColor: "green",
                    variantQuantity: 10,
                    variantImage: "./assets/img/socks-green-onwhite.jpg",
                },
                {
                    variantId: 2,
                    variantColor: "blue",
                    variantQuantity: 0,
                    variantImage: "./assets/img/socks-blue-onwhite.jpg",
                },
            ],
            sizes: [
                { sizeId: 1, size: "M" },
                { sizeId: 2, size: "L" },
            ],
            reviews: [],
        };
    },
    methods: {
        addToCart() {
            this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
        },
        removeCart() {
            this.$emit("remove-cart", this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale() {
            if (this.onSale) {
                return this.title + " are on sale!";
            } else {
                return this.title + " are not on sale!";
            }
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return "2.99$";
            }
        },
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview);
        });
    }
});