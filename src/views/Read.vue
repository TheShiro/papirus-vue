<template>
	<div class="read">
		<h3 class="title">{{chapter.name}}</h3>
		<h6><router-link :to="{path: '/view/' + chapter.book.alias}">{{chapter.book.title}}</router-link></h6>

		<div class="nav-page">
			<a href="1" class="btn-green btn-prev">Назад</a>
			<a href="2" class="btn-green btn-next">Вперёд</a>
		</div>

		<div class="text">{{chapter.text}}</div>

		<div class="nav-page">
			<a href="" class="btn-green btn-prev">Назад</a>
			<a href="" class="btn-green btn-next">Вперёд</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Read',
	data() {
		return {
			chapter: null
		}
	},

	mounted() {
		this.axios.get('http://localhost:8000/api/chapters/' + this.$route.params.title + '/' + this.$route.params.chapter)
			.then(response => this.chapter = response.data)
	}
}
</script>