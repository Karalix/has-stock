<template>
  <div class="min-h-screen">
    <div class="mx-auto my-auto max-w-md">
      <input type="email" :placeholder="$t('login.email')" class="input input-bordered w-full mt-[35%]" v-model="email" @keypress.enter="login" />
      <input type="password" :placeholder="$t('login.password')" class="input input-bordered w-full mt-4" v-model="password" @keypress.enter="login" />
      <div class="flex flex-row justify-between mt-4">
        <nuxt-link class="btn btn-primary btn-outline" :to="'/signup'">
          {{ $t('login.goto-signup') }}
        </nuxt-link>
        <button class="btn btn-primary" :class="{loading: loading}" @click="login">
          {{ $t('login.login') }}
        </button>
      </div>
      <p v-if="error" class="text-error">{{$t('login.login-error')}}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: false,
      loading: false
    }
  },
  methods: {
    async login() {
      try {
        this.loading = true
        //const res = await this.$appaccount.createEmailSession(this.email, this.password)
        const res = await this.$appwrite.account.createEmailSession(this.email, this.password)
        this.$router.push('/item')
        this.error = false
        this.loading = false
        console.log(res)
      } catch (e) {
        console.log(e)
        this.loading = false
        this.error = true
      }
    },
  },
}
</script>

<style>

</style>