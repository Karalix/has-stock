<template>
  <div class="mx-auto my-auto max-w-md relative">
    <nuxt-link class="hidden btn btn-primary rounded-full mb-8 md:flex" to="/recipe/new">
      {{$t('recipe.add')}}
    </nuxt-link>
    <RecipeCard v-for="recipe of recipes" :key="recipe.$id" :recipe="recipe" class="cursor-pointer"></RecipeCard>
    <div v-show="loading" class="text-sm text-slate-400">{{$t('loading')}}</div>
    <div v-if="error">{{$t('error')}}</div>
    <div class="mb-32"> </div>
    <nuxt-link class="btn btn-primary fixed bottom-20 right-4 rounded-full md:hidden" to="/recipe/new">
      {{$t('recipe.add')}}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'apppage',
  data () {
    return {
      recipes: [],
      loading: true,
      error: false
    }
  },
  async beforeMount () {
      try {
        let resp = await this.$appwrite.database.listDocuments('632c838c59c24d8d18d0', '63359bfe8e8206bca49a')
        this.recipes = resp.documents.reverse()
        this.loading = false

        this.$appwrite.client.subscribe('databases.632c838c59c24d8d18d0.collections.63359bfe8e8206bca49a.documents', async () => {
          try {
            this.loading = true
            let resp = await this.$appwrite.database.listDocuments('632c838c59c24d8d18d0', '63359bfe8e8206bca49a')
            this.recipes = resp.documents.reverse()
            this.loading = false
          } catch (e) {
            console.log(e)
            this.loading = false
            this.error = true
          }
        })
      } catch (e) {
        console.log(e)
        this.loading = false
        this.error = true
      }
    },
}
</script>

<style>

</style>