<template>
	<div>
		<vue-tags-input
			v-model="tag"
			:tags="tags"
			@tags-changed="emitTags"
			:validation="validation"
			:avoid-adding-duplicates="false"
			:disabled="disabled"
		/>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
	props: {
		tags: {
			type: Array,
			required: true,
		},
		disabled: {
			type: Boolean,
			required: true,
		},
		order: {
			type: Number,
			required: true,
		},
	},
	components: {
		VueTagsInput
	},
	data() {
		return {
			tag: '',
			validation: [
				{
					classes: 'no-letters',
					rule: /^([^a-z]*)$/,
					disableAdd: true,
				},
				{
					classes: 'max-tags',
					rule: tags => this.tags.length >= this.order,
					disableAdd: true,
				}
			]
		};
	},
	methods: {
		emitTags(tags) {
			this.$emit('updateTags', tags);
		}
	}
};
</script>
