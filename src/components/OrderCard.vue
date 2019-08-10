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
            </div>
          </div>
          <div class="divider"></div>
          <div class="section">
            <div class="card-title">
              <span class="center">Ingresar Filas de la Matriz</span>
              <button class="btn blue darken-2 right" 
                      :class="{ 'disabled': !canCreateMatrix || !order }" id="create-order">
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
                          v-tooltip.bottom="!canCreateMatrix && errors.first(`row-${index}`)"
                  />
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
const isEmpty = require('lodash.isempty');
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
    // VALIDATIONS COMPUTEDS
    formEvent() {
      return (!this.validOrder || !this.validMatrix) ? null : 'submit';
    },
    validOrder() {
      return !this.errors.has('order');
    },
    isMatrixComplete() {
      return !this.matrix.some((row) => isEmpty(row));
    },
    canCreateMatrix() {
      const hasErrors = !this.errors.items.length;
      return !hasErrors || this.isMatrixComplete;
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
      if (this.order % 2 == 0 && this.order != 2) {
        this.rowSum(parsedTags);
        this.multiplyColumn(parsedTags);
      }else if (this.order % 2 != 0 && this.order % 3 == 0 && this.order != 3) {
        this.firstOp = this.det(parsedTags);
        this.firstOpText = 'El determinante de la matriz es';
      }else if (this.order == 2  || this.order == 3) {
        this.firstOp = this.det(parsedTags);
        this.firstOpText = 'El determinante de la matriz es';
        this.rowMinus(parsedTags);
      }else if ((this.order > 4  && this.order < 8) && this.order != 6) {
        let m = parsedTags.map((row) => row.map((el) => Math.cbrt(el)));
        this.firstOp = this.det(parsedTags);
        this.firstOpText = 'El determinante de la matriz luego de sacar la raiz cubica a cada elemento es';
        let n = parsedTags.map((row) => row.map((el) => Math.log(Math.abs(el))));
        this.secondOp = this.det(parsedTags);
        this.secondOpText = 'El determinante de la matriz luego de sacar el logaritmo natural al valor absoluto de cada elemento es';
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
    rowMinus(arr) {
      let minus = 1;
      for (let i = 0; i < this.order; i++) {
        for (let j = 0; j < this.order; j++) {
          minus -= arr[i][j];
        }        
      }
      this.secondOp = minus;
      this.secondOpText = 'La sustracci\u00F3n de todos los elementos de cada fila es';
    },
    multiplyColumn(arr) {
      let mul = 1;
      for (let i = 0; i < this.order; i++) {
        for (let j = 0; j < this.order; j++) {
          mul *= arr[j][i];
          
        }        
      }
      this.secondOp = mul;
      this.secondOpText = 'El producto de todos los elementos de cada columna es';
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

