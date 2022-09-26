<template>
  <div class="mx-auto my-auto max-w-md relative">
    <nuxt-link class="hidden btn btn-primary rounded-full mb-8 md:flex" to="/item/new">
      {{$t('item.add')}}
    </nuxt-link>
    <div>
      <label class="label cursor-pointer">
        <span class="label-text">{{$t('item.show-finished')}}</span>
        <input type="checkbox" class="toggle toggle-primary" v-model="showFinished" />
      </label>
    </div>
    <ItemCard v-for="item of filteredItems" :key="item.$id" :item="item" class="cursor-pointer">
    </ItemCard>
    <div v-show="loading" class="text-sm text-slate-400">{{$t('loading')}}</div>
    <div v-if="error">{{$t('error')}}</div>
    <nuxt-link class="btn btn-primary fixed bottom-20 right-4 rounded-full md:hidden" to="/item/new">
      {{$t('item.add')}}
    </nuxt-link>
  </div>
</template>

<script>

  export default {
    name: 'Items',
    middleware: 'auth',
    layout: 'apppage',
    data () {
      return  {
        items: [],
        loading: true,
        error: false,
        showFinished: false
      }
    },
    computed: {
      filteredItems() {
        return this.items.filter(item => !item.finished || this.showFinished).reverse()
      }
    },
    async beforeMount () {
      try {
        let resp = await this.$appwrite.database.listDocuments('632c838c59c24d8d18d0', '632c839eaf3d4acc89b0')
        this.items = resp.documents
        this.loading = false

        this.$appwrite.client.subscribe('databases.632c838c59c24d8d18d0.collections.632c839eaf3d4acc89b0.documents', async () => {
          try {
            this.loading = true
            let resp = await this.$appwrite.database.listDocuments('632c838c59c24d8d18d0', '632c839eaf3d4acc89b0')
            this.items = resp.documents
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
    }
  }
</script>