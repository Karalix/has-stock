<template>
  <div class="w-screen max-w-full">
    <div class="m-2">
      <Nuxt keep-alive/>
    </div>
    <div class="fixed w-screen max-w-full bottom-0 bg-white drop-shadow-lg flex flex-row space-x-2 p-2">
      <nuxt-link class="btn btn-primary grow" :class="{'btn-outline': $route.path != '/item'}" to="/item">Produits</nuxt-link>
      <nuxt-link class="btn btn-primary grow" :class="{'btn-outline': $route.path != '/recipe'}" to="/recipe">Réalisations</nuxt-link>
    </div>
  </div>
</template>

