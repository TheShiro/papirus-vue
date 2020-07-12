<template>
	<div class="bookAction">
		<div class="header-action">
			<h3 class="title">Загрузка > Добавить главу</h3>
			<div class="back-btn" @click="switchAction('IndexAction')">Назад</div>
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