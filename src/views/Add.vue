<template>
  <div class="add">
  	<component :is="select">
    </component>
	<router-view/>
  </div>
</template>

<script>
export default {
	name: 'Add',

	computed: {
		select() {
			return this.$route.params.title
		}
	},
}
</script>