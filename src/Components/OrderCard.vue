<template>
	<div>
		<div class="card">
      <div class="card-content">
        <span class="card-title center">Ingresa el orden</span>
        <form class="col s12" @submit.prevent="calculateMatrix">
          <div class="section">
            <div class="row">
              <div class="input-field col s6 offset-s3">
                <input type="number" min="2" max="9" class="validate" maxlength="1" placeholder="Ejem. 2" id="order" v-model="parsedOrder">
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
                <TagInput v-for="(rows, index) in matrix" :key="index" :disabled="!order" :order="order" :tags="rows" @updateTags="updateTags($event, index)" />
              </div>
              <div class="input-field col s6">
                <button class="btn blue darken-2 right" id="create-order"><i class="fa fa-plus"></i> Crear Matriz</button>
              </div>
            </div>
          </div>
        </form>
        <div class="divider"></div>
        <div class="section">
          <div class="row">
            <div class="col s6">
              <blockquote v-if="firstOp">
                {{ firstOpText }}: {{ firstOp }}
              </blockquote>
            </div>
            <div class="col s6">
              <blockquote v-if="secondOp">
                {{ secondOpText }}: {{ secondOp }}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      firstOp: 0,
      secondOp: 0,
      firstOpText: '',
      secondOpTex: '',
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
      if (this.order % 2 == 0 && this.order != 2) {
        this.rowSum(parsedTags);
        this.multiplyColumn(parsedTags);
      }else if (this.order % 2 != 0 && this.order % 3 == 0 && this.order != 3) {
        this.firstOp = det(parsedTags);
        this.firstOpText = 'El determinante de la matriz es';
      }else if (this.order == 2  || this.order == 3) {
        this.firstOp = det(parsedTags);
        this.firstOpText = 'El determinante de la matriz es';
        this.rowMinus(parsedTags);
      }else if ((this.order > 2  && this.order < 8) && this.order != 6) {
        
      }
    },
    updateTags(tags, index) {
      const clonedData = [...this.matrix];
      clonedData[index] = tags;
      this.matrix = clonedData;
    },
    rowSum(arr) {
      const sum = arr.map((row) => row.reduce((preVal, curVal) => preVal + curVal));
      this.firstOp = sum.reduce((preVal, curVal) => preVal + curVal);
      this.firstOpText = 'La sumatoria de todas las filas de la matriz es';
    },
    rowMinus() {
      let minus = 1;
      for (let i = 0; i < this.order; i++) {
        for (let j = 0; j < this.order; j++) {
          minus *= arr[i][j];
          
        }        
      }
      this.secondOp = minus;
      this.secondOpTex = 'La sustracci\u00F3n de todos los elementos de cada fila es';
    },
    multiplyColumn(arr) {
      let mul = 1;
      for (let i = 0; i < this.order; i++) {
        for (let j = 0; j < this.order; j++) {
          mul *= arr[j][i];
          
        }        
      }
      this.secondOp = mul;
      this.secondOpTex = 'El producto de todos los elementos de cada columna es';
    },
    det(M) {
      if (M.length == 2) { return (M[0][0]*M[1][1])-(M[0][1]*M[1][0]); }
      let answer = 0;
      for (let i=0; i < M.length; i++) { 
        answer += Math.pow(-1,i) * M[0][i] * det(deleteRowAndColumn(M,i)); 
      }
      return answer;
    },
    deleteRowAndColumn(M, index) {
      let temp = [];
      for (let i = 0; i < M.length; i++) { temp.push(M[i].slice(0)); } 
      temp.splice(0,1); 
      for (let i = 0; i < temp.length; i++) { temp[i].splice(index,1); } 
      return temp;
    }
  }
}
</script>

