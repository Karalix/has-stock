<template>
  <div>
    <div v-for="item of items" :key="item.$id">
      {{item.name}}
    </div>
    <nuxt-link class="btn btn-primary fixed bottom-4 right-4 rounded-full" to="/item/new">
      {{$t('item.add')}}
    </nuxt-link>
  </div>
</template>

<script>

  export default {
    name: 'Items',
    data () {
      return  {
        items: []
      }
    },
    async beforeMount () {
      let resp = await this.$appwrite.database.listDocuments('632c838c59c24d8d18d0', '632c839eaf3d4acc89b0')
      this.items = resp.documents
    }
  }
</script>