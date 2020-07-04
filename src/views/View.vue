<template>
	<div class="view">
		<div class="view-head">
			<div class="view-background">
				<img :src="background_image">
			</div>
			<div class="view-content">
				<div class="info">
					<div class="book-title">{{title}}</div>
					<div class="book-author">{{author}}</div>
					<div class="book-category">{{category}}</div>
				</div>
			</div>
		</div>
		<div class="description">
			<p>Описание</p>
			<p>{{description}}</p>
		</div>

		<p>Оглавление</p>
		<div class="chapters">
			<div class="chapter-elem" v-for="chapter in chapters"><router-link :to="{path: chapter.path}">{{chapter.name}}</router-link></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'View',
	data() {
		return {
			book: null,
			id: null,
		  	background_image: null,
		  	title: '',
		  	author: '',
		  	category_id: '',
		  	category: '',
		  	description: '',
		  	chapters: [],
		  	alias: '',
		}
	},

	mounted() {
		this.axios.get('http://localhost:8000/api/books/' + this.$route.params.title)
			.then(response => (
				this.book = response,
				this.id = response.data.id,
				this.title = response.data.title,
				this.author = response.data.author,
				this.category_id = response.data.category,
				this.description = response.data.description,
				this.background_image = require('@/assets/images/' + response.data.image),
				this.alias = response.data.alias
			))

		this.axios.get('http://localhost:8000/api/chapters/' + this.$route.params.title)
			.then(response => this.chapters = response.data)
	}
}
</script>