<template>
	<div class="message">
		<transition name="message">
			<div class="success" v-if="success">{{message}}</div>
		</transition>
		<transition name="message">
			<div class="error" v-if="error">{{message}}</div>
		</transition>
	</div>
</template>

<script>
export default {
	/*data() {
		return {
			success: true,
			error: false,
			message: ''
		}
	},

	methods: {
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
	}*/
}
</script>