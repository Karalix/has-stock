<template>
  <div class="flex flex-row border rounded-lg w-full p-4 mt-2 hover:bg-slate-100" @click="navigate ? $router.push(`/recipe/${recipe.$id}`) : $emit('selected', recipe)">
    <div class="grow">
      <div class="font-bold text-lg">{{recipe.name}}</div>
      <div class="text-sm">{{(new Date(recipe.date)).toLocaleDateString()}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeCard',
  props: {
    recipe: {
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