<template>
	<div class="home">
		<div class="welcome">
		    <div class="genre">
		    	<div class="genre-title">Категории</div>
		    	<!-- TODO переделать в ul li и категории брать из базы. Категории должны работать как фильтры -->
		    	<a href="/" class="genre-elem">Все</a>
		    	<a href="/" class="genre-elem">Учебная лит.</a>
		    	<a href="/" class="genre-elem">Бизнес</a>
		    	<a href="/" class="genre-elem">Инвестиции</a>
		    	<a href="/" class="genre-elem">Философия</a>
		    </div>

		    <div class="list" v-if="done">
				<div class="book-short" v-for="result in results">
		    		<router-link :to="{path: path(result.alias)}">
			    		<img :src="get_img(result.image)" class="bs-img">
			    	</router-link>
			    	<div class="bs-btn">Читать</div>
		    	</div>
		    </div>

		    <div class="loading" v-else>
		    	загрузка...
		    </div>

		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',

	data() {
		return {
			results: [],
			categories: [],
			done: false
		}
	},

	created() {
		this.start()
	},

	methods: {
        get_img(img) {
        	return this.$root.storage + img
        },

        path(url) {
        	return '/view/' + url
        },

        start() {
        	this.axios.get(this.$root.api + 'books')
				.then(response => this.results = response.data)

			this.axios.get(this.$root.api + 'category')
				.then(response => this.categories = response.data)

			this.done = true
        }
    }
}
</script>
