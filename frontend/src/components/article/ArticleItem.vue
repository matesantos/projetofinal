<template>
  <div class="article-item">
      <router-link :to="{name: 'articleById', params: { id: article.id } }">
          <div class="article-item-img d-none d-sm-block">
              <img v-if="article.imageUrl" :src="article.imageUrl"
                    width="150" height="150" alt="Artigo" />
              <iframe v-else src="@/assets/article.png" 
                      width="150" height="150" alt="Artigo" />
          </div>

          <div class="article-item-info">
              <h2>{{ article.name }}</h2>
              <p>{{ article.description }}</p>
              <span class="article-item-author">
                  <strong>Autor: </strong>{{ article.author }}
              </span>
          </div>
      </router-link>
  </div>
</template>

<script>
export default {
    name:'ArticleItem',
    props: ['article'],
}
</script>

<style>

.article-item{
    border-radius: 8px;
    margin-bottom: 20px;
    background-color: #FFF;
    padding: 20px;
    border: solid 1px rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.article-item a {
    display: flex;
    align-items: flex-start;
    text-decoration: none;
    color: #000;
}

.article-item-img{
    margin-right: 20px;
    padding-right: 20px;
    border-right: 1px solid #AAA;
}

.article-item-img img{
    border-radius: 5px;
}

.article-item-info h2{
    font: 1.7rem;
}

.article-item-info{
    display: flex;
    flex-direction: column;
    align-self: stretch;
}

.article-item-info p{
    flex: 1;
    color: #555;
    font-size: 1.1rem;
}

</style>