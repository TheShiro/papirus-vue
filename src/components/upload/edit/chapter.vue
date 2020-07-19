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
			<h3 class="title">Редактирование</h3>
			<div class="back-btn" @click="switchAction('ChapterAction')">Назад</div>
		</div>

		<div class="form">
			<select v-model="book_id">
				<option disabled value="">Выберите книгу</option>
				<option v-for="book in books" :value="book.id">{{book.title}}</option>
			</select>
			<input type="text" v-model="name" placeholder="Название">
			<div class="add-descr long-text">
				<textarea v-model="text" placeholder="Текст" class="area"></textarea>
				<div class="area-result" v-html="this.$options.filters.marked(text)"></div>
			</div>

			<button @click="sendForm()">Сохранить</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			//field in DB
			id: 0,
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

	created() {
		this.id = this.$parent.$data.props.id
		this.book_id = this.$parent.$data.props.book_id
		this.name = this.$parent.$data.props.name
		this.text = this.$parent.$data.props.text
		this.ord = this.$parent.$data.props.ord
	},

	methods: {
		switchAction(act) {
			this.$parent.$data.action = act
		},

		sendForm() {
			var params = 'id='+this.id+'&'+
				'book_id='+this.book_id+'&'+
				'name='+this.name+'&'+
				'text='+this.text+'&'+
				'ord='+this.ord
			
			//add chapter
			this.axios.post(this.$root.api + 'chapters/update', params)
			.then((response) => {
				this.set_message('success', 'Изменения сохранены')
			})
			.catch((response) => {
				this.set_message('error', 'Ошибка сохранения изменений')
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

			//hide message
			setTimeout(() => {
				this.success = false
				this.error = false
			}, 5000)
		}
	},

	mounted() {
		this.axios.get(this.$root.api + 'books')
			.then(response => this.books = response.data)
	}
}
</script>