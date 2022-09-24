<template>
  <div class="min-h-screen">
    <div class="mx-auto my-auto max-w-md">
      <input type="email" :placeholder="$t('login.email')" class="input input-bordered w-full mt-[35%]" v-model="email"/>
      <input type="password" :placeholder="$t('login.password')" class="input input-bordered w-full mt-4" v-model="password" />
      <input type="text" :placeholder="$t('login.name')" class="input input-bordered w-full mt-4" v-model="name" />
      <div class="flex flex-row justify-between mt-4">
        <nuxt-link class="btn btn-primary btn-outline" :to="'/login'">
          {{ $t('login.goto-login') }}
        </nuxt-link>
        <button class="btn btn-primary" @click="login">
          {{ $t('login.signup') }}
        </button>
      </div>
      <p v-if="error" class="text-error">{{$t('login.signup-error')}}</p>
      <p v-if="success">{{$t('login.signup-success')}}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      error: false,
      success: false
    }
  },
  methods: {
    async login() {
      try {
        const res = await this.$appwrite.account.create('unique()', this.email, this.password)
        this.success = true
        this.$router.push('/login')
        console.log(res)
      } catch (e) {
        console.log(e)
        this.error = true
      }
    },
  },
}
</script>

<style>

</style>