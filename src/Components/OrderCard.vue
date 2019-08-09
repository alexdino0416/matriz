<template>
	<div>
		<div class="card">
      <div class="card-content">
        <span class="card-title center">Ingresa el orden</span>
        <form class="col s12" @submit.prevent="calculateMatrix">
          <div class="section">
            <div class="row">
              <div class="input-field col s6 offset-s3">
                <input type="number" class="validate"
                        min="2" max="9" 
                        maxlength="1" 
                        id="order" 
                        v-model="parsedOrder"
                        
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
          <span class="card-title center">Ingresar Filas de la Matriz</span>
            <div class="row">
              <div class="input-field col s6">
                <TagInput v-for="(rows, index) in matrix" 
                          :key="index" 
                          :disabled="!order" 
                          :order="order" 
                          :tags="rows" 
                          @updateTags="updateTags($event, index)" 
                  />
              </div>
              <div class="input-field col s6">
                <button class="btn blue darken-2 right" id="create-order"><i class="fa fa-plus"></i> Crear Matriz</button>
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
import TagInput from './TagInput.vue';

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

