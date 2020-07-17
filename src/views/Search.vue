<template>
	<div class="search">
		<h3 class="title">Поиск</h3>
		<input v-model="search" name="search" class="fsearch" placeholder="Поиск" autofocus>
		<div class="list">
	    	<div class="book-short" v-for="result in results">
	    		<router-link :to="{path: path(result.alias)}">
		    		<img :src="img_import(result.image)" class="bs-img">
		    	</router-link>
		    	<div class="bs-btn">Читать</div>
	    	</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Search',
	data() {
		return {
			search: '',
			results: []
		}
	},


    methods: {
        fetch() {
        	// console.log(this.search)

            this.axios.get('http://localhost:8000/api/books/search/' + this.search)
                .then(response => this.results = response.data)
        },

        img_import(img) {
        	return require('@/assets/images/' + img)
        },

        path(url) {
        	return '/view/' + url
        }
    },

    watch: {
		search() {
			this.result = []
			this.fetch()
		}
	}
}
</script>