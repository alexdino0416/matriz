<template>
	<div>
		<div class="card">
      <div class="card-content">
        <span class="card-title center">Ingresa el orden</span>
        <form class="col s12" @[formEvent].prevent="calculateMatrix">
          <div class="section">
            <div class="row">
              <div class="input-field col s6 offset-s3" v-tooltip.bottom="!validOrder && errors.first('order')">
                <input type="number"
                        :class="{ 'valid': validOrder, 'invalid': !validOrder }"
                        min="2" max="9" 
                        maxlength="1" 
                        id="order" 
                        v-model="parsedOrder"
                        v-validate="'required'"
                        data-vv-name="order"
                        data-vv-validate-on="change|input"
                />
                <label for="order">Orden de los determinantes</label>
              </div>
              <!-- <div class="col s6 input-field">
                <button class="btn blue darken-2 right" id="create-order"><i class="fa fa-plus"></i> Crear Matriz</button>
              </div> -->
            </div>
          </div>
          <div class="divider"></div>
          <div class="section">
            <div class="card-title">
              <span class="center">Ingresar Filas de la Matriz</span>
              <button class="btn blue darken-2 right" 
                      :class="{ 'disabled': !validMatrix }" id="create-order">
                <i class="fa fa-plus"></i> 
                Crear Matriz
              </button>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <TagInput v-for="(rows, index) in matrix"
                          :key="index" 
                          :disabled="!order" 
                          :order="order" 
                          :tags="rows" 
                          :index="index"
                          @updateTags="updateTags($event, index)"
                          v-tooltip.bottom="!validMatrix && errors.first(`row-${index}`)"
                  />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
      {{ matrix }}
	</div>
</template>

<script>
import TagInput from './TagInput';

export default {
  name: "order-card",
  components: {
    TagInput,
  },
	data () {
    return {
      order: '',
      matrix: [],
    };
  },
  computed: {
    parsedOrder: {
      get() {
        return String(this.order);
      },
      set(value){
        this.order = Number(value);
      }
    },
    // VALIDATIONS COMPUTEDS
    formEvent() {
      return (!this.validOrder || !this.validMatrix) ? null : 'submit';
    },
    validOrder() {
      return !this.errors.has('order');
    },
    validMatrix() {
      return !this.errors.items.length;
    }
  },
  watch: {
    order(newVal, oldVal) {
      let newMatrix = [];
      for (let i = 0; i < newVal; i++) {
        newMatrix = [...newMatrix, []];
      }
      this.matrix = newMatrix;
    }
  },
  methods: {
    calculateMatrix() {
      const parsedTags = this.matrix.map((el) => el.map((element) => Number(element.text)));
      console.log("PARSED TAGS", parsedTags);
    },
    updateTags(tags, index) {
      const clonedData = [...this.matrix];
      clonedData[index] = tags;
      this.matrix = clonedData;
    }
  }
}
</script>

