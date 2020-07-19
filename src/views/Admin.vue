<template>
	<div class="admin">
		<h3 class="title">Загрузка</h3>
		<div class="choice">
			<div :class="{active: bookPages}" @click="switchAction('BookAction')">Книги</div>
			<div :class="{active: chapPages}" @click="switchAction('ChapterAction')">Главы</div>
			<div :class="{active: catPages}" @click="switchAction('CategoryAction')">Категории</div>
		</div>

		<component :is="action">
		</component>
	</div>
</template>

<script>
import BookAction from '@/components/upload/book'
import ChapterAction from '@/components/upload/chapter'
import CategoryAction from '@/components/upload/category'

import AddBook from '@/components/upload/add/book'
import AddChapter from '@/components/upload/add/chapter'
import AddCategory from '@/components/upload/add/category'

import EditBook from '@/components/upload/edit/book'
import EditChapter from '@/components/upload/edit/chapter'
import EditCategory from '@/components/upload/edit/category'

export default {
	name: 'Admin',

	data() {
		return {
			action: 'BookAction',
			props: null
		}
	},

	computed: {
		bookPages() {
			if(this.action == 'BookAction' || this.action == 'AddBook' || this.action == 'EditBook')
				return true
			else
				return false
		},

		chapPages() {
			if(this.action == 'ChapterAction' || this.action == 'AddChapter' || this.action == 'EditChapter')
				return true
			else
				return false
		},

		catPages() {
			if(this.action == 'CategoryAction' || this.action == 'AddCategory' || this.action == 'EditCategory')
				return true
			else
				return false
		}
	},

	methods: {
		switchAction(act) {
			this.action = act
		}
	},

	components: {
		BookAction,
		ChapterAction,
		CategoryAction,

		AddBook,
		AddChapter,
		AddCategory,

		EditBook,
		EditChapter,
		EditCategory
	}
}
</script>