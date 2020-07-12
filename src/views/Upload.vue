<template>
	<div class="upload">
		<component :is="action">
		</component>
	</div>
</template>

<script>
import IndexAction from '@/components/upload/index'
import BookAction from '@/components/upload/book'
import ChapterAction from '@/components/upload/chapter'
import CategoryAction from '@/components/upload/category'

export default {
	name: 'Upload',

	data() {
		return {
			action: 'IndexAction'
		}
	},

	components: {
		IndexAction,
		BookAction,
		ChapterAction,
		CategoryAction
	}
}
</script>