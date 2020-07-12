<template>
	<div class="indexAction">
		<h3 class="title">Загрузка</h3>
		<div class="add">
			<div @click="switchAction('BookAction')">
				<p>Добавить книгу</p>
				<div class="plus"></div>
			</div>
			<div @click="switchAction('ChapterAction')">
				<p>Добавить главу</p>
				<div class="plus"></div>
			</div>
			<div @click="switchAction('CategoryAction')">
				<p>Добавить категорию</p>
				<div class="plus"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		switchAction(act) {
			this.$parent.$data.action = act
		}
	},
}
</script>