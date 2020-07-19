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

		<div class="plus" @click="switchAction('AddChapter')"></div>

		<select v-model="select" class="margin">
			<option disabled value="">Выберите книгу</option>
			<option v-for="book in books" :value="book.id">{{book.title}}</option>
		</select>

		<div class="table" v-if="done">
			<div class="elem">
				<div>Название</div>
				<div>Действие</div>
			</div>
			<div class="elem" v-for="chapter in chapters" v-if="chapter.book_id === select">
				<div>{{chapter.name}}</div>
				<div class="action">
					<div class="edit" @click="edit(chapter)"></div>
					<div class="delete" @click="del(chapter.id)"></div>
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
			chapters: [],
			books: [],
			select: 0,
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
			this.axios.get(this.$root.api + 'chapters')
				.then(response => (
					this.chapters = response.data,

					this.axios.get(this.$root.api + 'books')
						.then(response => (
							this.books = response.data
						)),

					this.done = true
				))
		},

		switchAction(act) {
			this.$parent.$data.action = act
		},

		edit(data) {
			this.$parent.$data.props = {
				id: data.id,
				book_id: data.book_id,
				name: data.name,
				text: data.text,
				ord: data.ord
			}
			this.switchAction('EditChapter')
		},

		del(id) {
			var params = 'id=' + id
			
			//add book
			this.axios.post(this.$root.api + 'chapters/delete', params)
			.then((response) => {
				this.set_message('success', 'Запись удалена')
				this.start()
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