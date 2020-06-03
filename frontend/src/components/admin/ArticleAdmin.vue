<template>
  <div class="article-admin">
      <b-form>
           <input id="articleId" type="hidden" v-model="article.id" />
           <b-form-group label="Nome do Artigo:" label-for="article-name">
                <b-form-input id="article-name" type="text"
                              v-model="article.name"
                              required 
                              :readonly="mode === 'remove'"
                              placeholder="Digite o Nome do Artigo..."/>
           </b-form-group>
           
           <b-form-group label="Descrição:" label-for="article-description">
                <b-form-input id="article-description" type="text"
                              v-model="article.description"
                              required 
                              :readonly="mode === 'remove'"
                              placeholder="Digite a Descrição do Artigo..."/>
           </b-form-group>
           
           <b-form-group label="Imagem [URL]:" label-for="article-name">
                <b-form-input id="article-name" type="text"
                              v-model="article.name"
                              required 
                              :readonly="mode === 'remove'"
                              placeholder="Informe a URL da Imagem do Artigo..."/>
           </b-form-group>

           <b-form-group label="Categoria:" label-for="article-categoryId">
                <b-form-select id="article-categoryId" />

           </b-form-group>

           <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
           <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
           <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
      <b-table hover striped :items="articles" :fields="fields">
      </b-table>      
  </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
export default {
    name:'ArticleAdmin',
    data: function (){
      return {
        mode:'save',
        articles:[],
        article: {},
        fields: [
          { key:'id', label: 'Código', sortable: true },
          { key:'description', label: 'Descrição', sortable: true },
          { key:'content', label: 'Conteúdo', sortable: true },
          { key:'userId', label: 'Ator', sortable: true },
          { key:'categoryId', label: 'Categoria', sortable: true }
        ]
      }
    },
    methods: {
      save(){
        const id = this.article.id ? `/${this.article.id}` : ''
        const method = this.article.id ? 'put' :'post'
        axios[method](`${baseApiUrl}/articles${id}`,this.articles)
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
          const url = `${baseApiUrl}/articles`
          axios.get(url).then(res => {
            const { data } = res.data
            this.articles = data
          })
          .catch(showError)
      },
      loadArticle(article, mode = 'save'){
        this.mode = mode
        this.article = { ...article }
      },
      reset(){
        this.mode = 'save'
        this.article = {}
        this.loadArticles()
      }
    },
    mounted(){
      this.loadArticles()
    }
}
</script>

<style>

</style>