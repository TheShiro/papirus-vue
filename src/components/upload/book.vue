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

		<div class="plus" @click="switchAction('AddBook')"></div>

		<div class="table" v-if="done">
			<div class="elem">
				<div>Название</div>
				<div>Автор</div>
				<div>Алиас</div>
				<div>Действие</div>
			</div>
			<div class="elem" v-for="book in books" >
				<div>{{book.title}}</div>
				<div>{{book.author}}</div>
				<div>{{book.alias}}</div>
				<div class="action">
					<div class="edit" @click="edit(book)"></div>
					<div class="delete" @click="del(book.id)"></div>
				</div>
			</div>
		</div>
		<div class="loading" v-else>
	    	загрузка...
	    </div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			books: [],
			done: false,
			//message
			success: true,
			error: false,
			message: '',
		}
	},

	created() {
		this.start()
	},

	methods: {
		start() {
			this.axios.get(this.$root.api + 'books')
				.then(response => (
					this.books = response.data,
					this.done = true
				))
		},

		switchAction(act) {
			this.$parent.$data.action = act
		},

		edit(data) {
			this.$parent.$data.props = {
				id: data.id,
				title: data.title,
				description: data.description,
				author: data.author,
				category_id: data.category_id,
				image: data.image,
				alias: data.alias
			}
			this.switchAction('EditBook')
		},

		del(id) {
			var params = 'id=' + id
			
			//add book
			this.axios.post(this.$root.api + 'books/delete', params)
			.then((response) => {
				this.start()
				this.set_message('success', 'Запись удалена')
			})
			.catch((response) => {
				this.set_message('error', 'Ошибка удаления записи')
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
	}
}
</script>