<template>
  <div class="category-admin">
      <h1>Categoria Admin</h1>
      <b-form>
          <input id="catagoryId" type="hidden" v-model="category.id" />
          <b-row>
              <b-col xs=12>
                <b-form-group label="Nome" label-for="category-name">
                  <b-form-input id="category-name" type="text" v-model="category.name"
                                required
                                 placeholder="Informe o Nome da Categoria...." />
                  
                </b-form-group>
              </b-col>
          </b-row>
      </b-form>
      <b-table hover striped :items="categories" :fields="fields">
      </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global.js'
import axios from "axios";

export default {
    name:'CategoryAdmin',
    data: function(){
      return {
          mode:'save',
          category: {},
          categories:[],
          fields:[
            { key: 'id', label:'Código', sortable:true},
            { key: 'name', label:'Nome', sortable:true},
            { key: 'parentId', label:'Categoria Pai', sortable:true}
          ]
        }
    },
    methods: {
      save(){

      },
      remove(){

      },
      loadCategories(){
        const url = `${baseApiUrl}/categories`
          axios.get(url).then(res => {
              this.categories = res.data
              console.log(this.categories)
          })
          .catch(showError)
      }
    },
    mounted(){
      this.loadCategories()
    }
}
</script>

<style>

</style>