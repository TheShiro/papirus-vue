<template>
  <div id="app">
  	<component :is="layout">
    </component>
	<router-view/>
  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import ReadLayout from '@/layouts/ReadLayout'

export default {
	computed: {
		layout() {
			return (this.$route.meta.layout || 'main') + '-layout'
		}
	},
	components: {
		MainLayout,
		ReadLayout
	}
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/papirus.css';
</style>
