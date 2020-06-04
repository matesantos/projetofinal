<template>
  <div class="article-admin">
      <b-form>
          <input id="articleId" type="hidden" v-model="article.id" />
          <b-form-group label="Nome do Artigo:" label-for="article-name">
              <b-form-input id="article-name" type="text"
                            v-model="article.name"
                            :readonly="mode === 'remove'"
                            placeholder="Digite o Nome do Artigo..."/>
          </b-form-group>
          
          <b-form-group label="Descrição:" label-for="article-description">
              <b-form-input id="article-description" type="text"
                            v-model="article.description"
                            :readonly="mode === 'remove'"
                            placeholder="Digite a Descrição do Artigo..."/>
          </b-form-group>
          
          <b-form-group label="Imagem [URL]:" label-for="article-imageUrl">
              <b-form-input id="article-imageUrl" type="text"
                            v-model="article.imageUrl"
                            :readonly="mode === 'remove'"
                            placeholder="Informe a URL da Imagem do Artigo..."/>
          </b-form-group>

          <b-form-group v-if="mode === 'save'" label="Categoria:" label-for="article-categoryId">
              <b-form-select id="article-categoryId"
                              :options="categories" 
                              v-model="article.categoryId" />
          </b-form-group>

          <b-form-group v-if="mode === 'save'" label="Autor:" label-for="article-userId">
              <b-form-select id="article-userId"
                             :options="users" v-model="article.userId" />
          </b-form-group>

          <b-form-group  v-if="mode === 'save'"  label="Conteúdo:" label-for="article-categoryId">
            <VueEditor v-model="article.content" placeholder="Informe o conteúdo do artigo." />
          </b-form-group> 

          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>

      <b-table hover striped :items="articles" :fields="fields">
        <template v-slot:cell(actions)="data">
            <b-button variant='warning' @click="loadArticle(data.item)" class="mr-2">
                <i class="fa fa-pencil"></i>
            </b-button>
            
            <b-button variant='danger' @click="loadArticle(data.item,'remove')">
                <i class="fa fa-trash"></i>
            </b-button>
        </template>
      </b-table> 
      <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />     
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name:'ArticleAdmin',
    components:{ VueEditor },
    data: function (){
      return {
        mode:'save',
        articles:[],
        article: {},
        categories:[],
        users:[],
        page:1,
        limit:0,
        count:0,
        fields: [
          { key:'id', label: 'Código', sortable: true },
          { key: 'name', label: 'Nome', sortable: true },
          { key:'description', label: 'Descrição', sortable: true },
          { key: 'actions', label: 'Ações' }
        ]
      }
    },
    methods: {
      save(){
        const id = this.article.id ? `/${this.article.id}` : ''
        const method = this.article.id ? 'put' :'post'
        axios[method](`${baseApiUrl}/articles${id}`,this.article)
                     .then(()=>{
                       this.$toasted.global.defaultSuccess()
                       this.reset()
                     })
                     .catch(showError)
      },
      remove(){
        const id = this.article.id
        const url = `${baseApiUrl}/articles/${id}`
        axios.delete(url).then( () => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
      },
      loadArticles(){
          const url = `${baseApiUrl}/articles?page=${this.page}`
          axios.get(url)
               .then(res => {
                    this.articles = res.data.data
                    this.count = res.data.count
                    this.limit = res.data.limit
                 } )
               .catch(showError)
      },
      loadArticle(article, mode = 'save'){
        this.mode = mode
        axios.get(`${baseApiUrl}/articles/${article.id}`)
                .then(res => this.article = res.data)
      },
      reset(){
        this.mode = 'save'
        this.article = {}
        this.loadArticles()
      },
       loadCategories() {
            const url = `${baseApiUrl}/categories`
            axios.get(url).then(res => {
                this.categories = res.data.map(category => {
                    return { value: category.id, text: category.path }
                })
            })
        },
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data.map(user => {
                    return { value: user.id, text: `${user.name} - ${user.email}` }
                })
            })
        }
    },
    watch: {
      page() {
        this.loadArticles()
      }
    },
    mounted(){
      this.loadArticles()
      this.loadCategories()
      this.loadUsers()
    }
}
</script>

<style>

</style>