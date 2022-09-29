<template>
  <div class="mx-auto my-auto max-w-md relative">
    <div>
      <label class="label cursor-pointer">
        <span class="label-text">{{$t('item.show-finished')}}</span>
        <input type="checkbox" class="toggle toggle-primary" v-model="showFinished" />
      </label>
    </div>
    <ItemCard v-for="item of filteredItems" :key="item.$id" :item="item" class="cursor-pointer" @selected="selectItem" :navigate="false">
    </ItemCard>
    <div v-show="loading" class="text-sm text-slate-400">{{$t('loading')}}</div>
    <div v-if="error">{{$t('error')}}</div>
  </div>
</template>

<script>

  export default {
    name: 'ItemList',
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
    },
    methods: {
      selectItem (payload) {
        this.$emit('selected', payload)
      }
    }
  }
</script>