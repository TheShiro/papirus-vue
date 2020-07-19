<template>
	<div class="categoryAction">
		<div class="message">
			<transition name="message">
				<div class="success" v-if="success">{{message}}</div>
			</transition>
			<transition name="message">
				<div class="error" v-if="error">{{message}}</div>
			</transition>
		</div>

		<div class="plus" @click="switchAction('AddCategory')"></div>

		<div class="table" v-if="done">
			<div class="elem">
				<div>Название</div>
				<div>Действие</div>
			</div>
			<div class="elem" v-for="category in categories">
				<div>{{category.name}}</div>
				<div class="action">
					<div class="edit" @click="edit(category)"></div>
					<div class="delete" @click="del(category.id)"></div>
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
			categories: [],
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
			this.axios.get(this.$root.api + 'category')
				.then(response => (
					this.categories = response.data,
					this.done = true
				))
		},

		switchAction(act) {
			this.$parent.$data.action = act
		},

		edit(data) {
			this.$parent.$data.props = {
				id: data.id,
				name: data.name
			}
			this.switchAction('EditCategory')
		},

		del(id) {
			var params = 'id=' + id
			
			//add book
			this.axios.post(this.$root.api + 'category/delete', params)
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