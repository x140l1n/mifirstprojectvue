Vue.component("product-review", {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length > 0">
                <b>Please correct the following errors(s): </b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name" placeholder="Name">
            </p>
            
            <p>
                <label for="review">Review:</label>      
                <textarea id="review" v-model="review" placeholder="Review"></textarea>
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
                <label>Would you recommend this product?</label>
                <br/>
                <label for="recommend-yes">Yes</label>
                <input type="radio" id="recommend-yes" name="recommend" v-model="recommend" value="Yes" />
                <label for="recommend-no">No</label>
                <input type="radio" id="recommend-no" name="recommend" v-model="recommend" value="No" />
            </p>
                
            <p>
                <button type="submit">Submit</button>  
            </p>    

        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: "Yes",
            errors: [],
        };
    },
    methods: {
        onSubmit() {
            this.errors = [];

            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                };

                eventBus.$emit("review-submitted", productReview);

                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = "Yes";
            } else {
                if (!this.name) this.errors.push("Name is required.");
                if (!this.review) this.errors.push("Review is required.");
                if (!this.rating) this.errors.push("Rating is required.");
            }
        },
    },
});