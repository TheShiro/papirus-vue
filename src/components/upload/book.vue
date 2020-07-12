<template>
	<div class="bookAction">
		<div class="header-action">
			<h3 class="title">Загрузка > Добавить книгу</h3>
			<div class="back-btn" @click="switchAction('IndexAction')">Назад</div>
		</div>
		<div class="form">
			<input type="text" v-model="title" placeholder="Название">
			<div class="description">
				<textarea v-model="description" placeholder="Описание" class="area"></textarea>
				<div class="area-result" v-html="this.$options.filters.marked(description)"></div>
			</div>
			<input type="text" v-model="author" placeholder="Автор">
			<select v-model="category_id">
				<option disabled value="">Выберите категорию</option>
				<option value="1">Философия</option>
			</select>
			<input type="file" >
			<input type="text" v-model="alias" placeholder="Алиас">

			<button v-on:click="sendForm()">Добавить</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: 'test',
			description: 'test',
			author: 'test',
			category_id: '1',
			image: 'test',
			alias: 'test'
		}
	},

	methods: {
		switchAction(act) {
			this.$parent.$data.action = act
		},

		sendForm() {
			const params = 'title='+this.title+'&'+
				'description='+this.description+'&'+
				'author='+this.author+'&'+
				'category_id='+this.category_id+'&'+
				'image='+this.image+'&'+
				'alias='+this.alias
			// console.log(params)
			// console.log(this.$data)
			
			this.axios.post('http://localhost:8000/api/books', params)
			.then((response) => {
				console.log(response);
			})
			.catch((response) => {
				console.log(response);
			})
		}
	},

	mounted() {
		//
	}
}
</script>