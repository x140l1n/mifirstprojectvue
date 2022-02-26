Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span class="tab"
                  :class="{ activeTab: selectedTab === tab }"
                  v-for="(tab, index) in tabs" 
                 :key="index"
                  v-on:click="selectedTab = tab">
                  {{ tab }}
            </span>
            <div v-if="selectedTab === 'Reviews'">
                <h2>Reviews</h2>
                <p v-if="reviews.length === 0">There are no reviews yet.</p>
                <ul v-else>
                    <li v-for="review in reviews">
                        <p>Name: {{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>Review: {{ review.review }}</p>
                        <p>Recommend? {{ review.recommend }}</p>
                    </li>
                </ul>
            </div>
            <product-review v-if="selectedTab === 'Make a Review'"></product-review>
        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
});