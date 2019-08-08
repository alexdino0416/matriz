<template>
  <div id="app">
    <navbar></navbar>
    <br>
    <div class="container">
      <div class="card">
        <div class="card-content">
          <span class="card-title center">Ingresa el orden</span>
          <form class="col s12" v-on:submit.prevent="">
            <div class="row">
              <div class="input-field col s6">
                <input type="number" min="2" max="9" class="validate" maxlength="1" placeholder="Ejem. 2" id="order" v-model="order">
                <label for="order">Orden de los determinantes</label>
              </div>
              <div class="col s6 input-field">
                <button class="btn blue darken-2 right" id="create-order" type="button"><i class="fa fa-plus"></i> Crear Matriz</button>
              </div>
					  </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      order: ''
    }
  }
}
</script>
