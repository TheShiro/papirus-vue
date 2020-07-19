<template>
	<div class="read">
		<div v-if="done">
			<h3 class="title">{{chapter.name}}</h3>
			<h6><router-link :to="{path: '/view/' + chapter.book.alias}">{{chapter.book.title}}</router-link></h6>

			<div class="nav-page">
				<a href="1" class="btn-green btn-prev">Назад</a>
				<a href="2" class="btn-green btn-next">Вперёд</a>
			</div>

			<div class="text" v-html="this.$options.filters.marked(chapter.text)">{{chapter.text}}</div>

			<div class="nav-page">
				<a href="" class="btn-green btn-prev">Назад</a>
				<a href="" class="btn-green btn-next">Вперёд</a>
			</div>
		</div>

		<div class="loading" v-else>
	    	загрузка...
	    </div>
	</div>
</template>

<script>
export default {
	name: 'Read',
	data() {
		return {
			chapter: null,
			done: false
		}
	},

	created() {
		this.axios.get(this.$root.api + 'chapters/' + this.$route.params.title + '/' + this.$route.params.chapter)
			.then(response => (
				this.chapter = response.data,
				this.done = true
			))
	}
}
</script>