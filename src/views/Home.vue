<template>
	<div class="home">
		<div class="welcome">
		    <div class="genre">
		    	<div class="genre-title">Категории</div>
		    	<a href="/" class="genre-elem">Все</a>
		    	<a href="/" class="genre-elem">Учебная лит.</a>
		    	<a href="/" class="genre-elem">Бизнес</a>
		    	<a href="/" class="genre-elem">Инвестиции</a>
		    	<a href="/" class="genre-elem">Философия</a>
		    </div>

		    <div class="list">
				<div class="book-short" v-for="result in results">
		    		<router-link :to="{path: path(result.alias)}">
			    		<img :src="img_import(result.image)" class="bs-img">
			    	</router-link>
			    	<div class="bs-btn">Читать</div>
		    	</div>
		    </div>

		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',

	data() {
		return {
			results: []
		}
	},

	mounted() {
		this.axios.get('http://localhost:8000/api/books')
			.then(response => this.results = response.data)
	},

	methods: {
        img_import(img) {
        	return require('@/assets/images/' + img)
        },

        path(url) {
        	return '/view/' + url
        }
    }
}
</script>
