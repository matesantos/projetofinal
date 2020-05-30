<template>
  <div class="admin-pages">
      <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastro & Cia" />
      <div class="admin-pages-tabs">
          <b-card no-body>
            <b-tabs>
                
                <b-tab title="Artigos" active>
                  <ArticleAdmin />
                </b-tab>
                
                <b-tab title="Categorias">
                  <CategoryAdmin />
                </b-tab>
                
                <b-tab title="Usuário">
                  <UserAdmin />
                </b-tab>
            
            </b-tabs>
          </b-card> 
      </div>
  </div>
</template>

<script>
import PageTitle from '../templates/PageTitle'
import ArticleAdmin from './ArticleAdmin'
import UserAdmin from './UserAdmin'
import CategoryAdmin from './CategoryAdmin'

export default {
    name:'AdminPages',
    components:{ PageTitle, UserAdmin, CategoryAdmin, ArticleAdmin }
}
</script>

<style>

</style>