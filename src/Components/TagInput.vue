<template>
	<vue-tags-input
		v-model="tag"
		:tags="tags"
		:validation="validation"
		:max-tags="order"
		:disabled="disabled"
		:avoid-adding-duplicates="false"
		@tags-changed="emitTags"
		v-tooltip="rowErrors"
	/>
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
		index: {
			type: Number,
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
			]
		};
	},
	computed: {
		rowErrors() {
			this.errors.items.length && this.errors.first(`row-${this.index}`);
		}
	},
	methods: {
		emitTags(tags) {
			this.validateTags(tags);
			this.$emit('updateTags', tags);	
		},
		// VALIDATION METHOD
		validateTags(tags) {
			// FAST EXIT TO CLEAR VALIDATIONS
			if(tags.length === this.order) return this.$validator.errors.remove(`row-${this.index}`);
			// ADD ERRORS TO ERROR BAG
			return this.$validator.errors.add({
				field: `row-${this.index}`,
				msg: `The row #${this.index + 1} needs to have ${this.order} columns`,
			});
		}
	}
};
</script>
