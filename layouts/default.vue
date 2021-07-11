<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware: ['check-wallet'],
  fetchOnServer: false,
  fetch() {
    this.$store
      .dispatch('wallet/initWallet')
      .then(() => {})
      .catch((error) => {
        console.error(error) // eslint-disable-line
      })
  },
}
</script>
<style></style>
