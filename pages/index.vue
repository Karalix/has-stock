<template>
  <div>
    <nuxt-link class="btn btn-primary" to="/login">{{$t('login.login')}}</nuxt-link>
    <nuxt-link class="btn btn-primary" to="/signup">{{$t('login.goto-signup')}}</nuxt-link>
  </div>
</template>

<script>
export default {
  async mounted () {
    try {
      await this.$appwrite.account.getSessions()
      this.$router.push('/item')
    } catch (e) {
      this.$router.push('/login')
      console.log(e)
    }
  }
}
</script>
