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
			<div class="back-btn" @click="switchAction('CategoryAction')">Назад</div>
		</div>

		<div class="form">
			<input type="text" v-model="name" placeholder="Название">

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
			name: '',
			//message
			success: true,
			error: false,
			message: '',
		}		
	},

	created() {
		this.id = this.$parent.$data.props.id
		this.name = this.$parent.$data.props.name
	},

	methods: {
		switchAction(act) {
			this.$parent.$data.action = act
		},

		sendForm() {
			var params = 'id='+this.id+'&'+
				'name='+this.name
			
			//add boocategoryk
			this.axios.post(this.$root.api + 'category/update', params)
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
		},

		start() {
			//
		}
	},
}
</script>