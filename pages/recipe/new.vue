<template>
  <div class="max-w-md mx-auto">
    <nuxt-link class="btn btn-primary btn-outline" to="/recipe">{{$t('recipe.back')}}</nuxt-link>
    <input type="text" :placeholder="$t('recipe.name')" class="input input-bordered w-full mt-[35%]" v-model="name" />
    <textarea type="text" :placeholder="$t('recipe.description')" class="textarea textarea-bordered w-full mt-4" v-model="description"></textarea>
    <client-only>
      <date-picker v-model="date">
        <template v-slot="{ inputValue, inputEvents }">
          <input
            :placeholder="$t('recipe.date')"
            class="input input-bordered w-full mt-4"
            :value="inputValue"
            v-on="inputEvents"
          />
        </template>
      </date-picker>
    </client-only>
    <h2 class="h2 mt-8" v-if="ingredients.length > 0">{{$t('recipe.ingredients')}}</h2>
    <div>
      <ItemCard v-for="ing of ingredients" :key="ing.$id" :item="ing" :navigate="false">{{ing.$id}}</ItemCard>
    </div>
    <label class="btn btn-primary btn-outline w-full mt-4" @click="showItems = true">
      {{$t('recipe.add-item')}}
    </label>
    <div v-if="uploadError">{{$t('recipe.upload-error')}}</div>
    <button class="btn btn-primary mt-4" :class="{loading: loading}" @click="addRecipe">
      {{$t('recipe.add-recipe')}}
    </button>
    <input type="checkbox" id="my-modal" class="modal-toggle" v-model="showItems" />
    <div class="modal">
      <div class="modal-box">
        <ItemList @selected="selectItem"></ItemList>
        <div class="modal-action">
          <label class="btn btn-primary btn-outline" @click="showItems = false">{{$t('recipe.cancel-item')}}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewRecipe',
  middleware: 'auth',
  data () {
    return {
      name: '',
      description: '',
      date: new Date(),
      ingredients: [],
      loading: false,
      uploadError: false,
      showItems: false
    }
  },
  methods: {
    async addRecipe () {
      this.loading = true
      try {
        await this.$appwrite.database.createDocument('632c838c59c24d8d18d0', '63359bfe8e8206bca49a', 'unique()', {
          name: this.name,
          description: this.description,
          date: this.date,
          ingredients: this.ingredients.map(ing => ing.$id)
        })
        this.uploadError = false
        this.loading = false
        this.$router.push('/recipe')
      } catch (e) {
        this.uploadError = true
        this.loading = false
        console.log(e)
      }
    },
    selectItem (payload) {
      this.ingredients.push(payload)
      this.showItems = false
    }
  }
}
</script>

<style>

</style>