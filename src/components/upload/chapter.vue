<template>
	<div class="bookAction">
		<div class="message">
			<transition name="message">
				<div class="success" v-if="success">{{message}}</div>
			</transition>
			<transition name="message">
				<div class="error" v-if="error">{{message}}</div>
			</transition>
		</div>

		<div class="header-action">
			<h3 class="title">Загрузка > Добавить главу</h3>
			<div class="back-btn" @click="switchAction('IndexAction')">Назад</div>
		</div>

		<div class="form">
			<select v-model="book_id">
				<option disabled value="">Выберите книгу</option>
				<option v-for="book in books" :value="book.id">{{book.title}}</option>
			</select>
			<input type="text" v-model="name" placeholder="Название">
			<div class="text">
				<textarea v-model="text" placeholder="Текст" class="area"></textarea>
				<div class="area-result" v-html="this.$options.filters.marked(text)"></div>
			</div>

			<button @click="sendForm()">Добавить</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			//field in DB
			books: [],
			book_id: 0,
			name: '',
			text: '',
			ord: 0,
			//message
			success: true,
			error: false,
			message: '',
		}		
	},

	methods: {
		switchAction(act) {
			this.$parent.$data.action = act
		},

		sendForm() {
			var params = 'book_id='+this.book_id+'&'+
				'name='+this.name+'&'+
				'text='+this.text+'&'+
				'ord='+this.ord
			
			//add chapter
			this.axios.post('http://localhost:8000/api/chapters', params)
			.then((response) => {
				this.set_message('success', 'Запись добавлена')
			})
			.catch((response) => {
				this.set_message('error', 'Ошибка добавления записи')
			})
		},

		set_message(type, message) {
			this.message = message
			if(type == 'error') {
				this.success = false
				this.error = true
			} else {
				this.success = true
				this.error = false
			}
		}
	},

	mounted() {
		this.axios.get('http://localhost:8000/api/books')
			.then(response => this.books = response.data)
	}
}
</script>