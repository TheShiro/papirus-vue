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

		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<div class="header-action">
			<h3 class="title">Редактирование</h3>
			<div class="back-btn" @click="switchAction('BookAction')">Назад</div>
		</div>

		<div class="form">
			<input type="text" v-model="title" placeholder="Название">
			<div class="add-descr">
				<textarea v-model="description" placeholder="Описание" class="area"></textarea>
				<div class="area-result" v-html="this.$options.filters.marked(description)"></div>
			</div>
			<input type="text" v-model="author" placeholder="Автор">
			<select v-model="category_id">
				<option disabled value="">Выберите категорию</option>
				<option v-for="category in categories" :value="category.id">{{category.name}}</option>
			</select>
			<div class="preview_image">
				<label class="label">
					<i class="material-icons">attach_file</i>
					<span class="add-file">Добавить файл</span>
					<input type="file" ref="file" @change="uploadFile()">
				</label>
				<img :src="file_path" v-if="upload_image">
			</div>
			<input type="text" v-model="alias" placeholder="Алиас">

			<button @click="sendForm()">Сохранить</button>
			<!-- <button @click="test()">test</button> -->
		</div>
	</div>
</template>

<script>
import message from '@/components/root/message'

export default {
	data() {
		return {
			//field in DB
			id: 0,
			title: '',
			description: '',
			author: '',
			category_id: '',
			image: '',
			alias: '',
			categories: [],
			//message
			success: true,
			error: false,
			message: '',
			//upload file
			file: null,
			upload_image: false,
			file_path: ''
		}
	},

	components: {
		message
	},

	created() {
		this.id = this.$parent.$data.props.id
		this.title = this.$parent.$data.props.title
		this.description = this.$parent.$data.props.description
		this.author = this.$parent.$data.props.author
		this.category_id = this.$parent.$data.props.category_id
		this.image = this.$parent.$data.props.image
		this.alias = this.$parent.$data.props.alias
		this.file_path = this.$root.storage + this.image
		this.upload_image = true
	},
	
	methods: {
		switchAction(act) {
			this.$parent.$data.action = act
		},

		sendForm() {
			var params = 'id='+this.id+'&'+
				'title='+this.title+'&'+
				'description='+this.description+'&'+
				'author='+this.author+'&'+
				'category_id='+this.category_id+'&'+
				'image='+this.image+'&'+
				'alias='+this.alias
			
			//add book
			this.axios.post(this.$root.api + 'books/update', params)
			.then((response) => {
				this.set_message('success', 'Изменения сохранены')
			})
			.catch((response) => {
				this.set_message('error', 'Ошибка сохранения изменений')
			})
		},

		uploadFile() {
			this.file = this.$refs.file.files[0]

			let formData = new FormData()
			formData.append('file', this.file)

			this.axios.post(this.$root.api + 'file/upload', formData)
			.then((response) => {
				this.image = response.data
				this.file_path = this.$root.storage + response.data
				this.upload_image = true
			})
			.catch((response) => {
				this.set_message('error', 'Ошибка загрузки изображения')
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
		this.axios.get(this.$root.api + 'category')
			.then(response => this.categories = response.data)
	}
}
</script>