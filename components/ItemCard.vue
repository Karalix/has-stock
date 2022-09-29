<template>
  <div class="flex flex-row border rounded-lg w-full p-4 mt-2 hover:bg-slate-100" @click="navigate ? $router.push(`/item/${item.$id}`) : $emit('selected', item)">
    <div class="grow">
      <div class="font-bold text-lg" :class="{'text-slate-400': item.finished}">{{item.name}}</div>
      <div class="text-sm" :class="{'text-slate-400': item.finished}">{{item.quantity ?? ''}} {{item.unit ?? ''}}</div>
    </div>
    <div class="grow-0">
      {{item.lot ? '✅' : '❌'}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    item: {
      type: Object,
      required: true
    },
    navigate: {
      type: Boolean,
      default: true
    }
  },
}
</script>

<style>

</style>