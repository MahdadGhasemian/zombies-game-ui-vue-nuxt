<template>
  <div>
    <div class="notify-class">
      <div v-for="message in messages" :key="message.id">
        <alert :type="message.type">
          {{ message.content }}
        </alert>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      const _id = state.notify.id
      const _timeout = state.notify.timeout
      if (mutation.type === 'notify/showMessage') {
        this.messages.unshift({
          title: state.notify.title,
          content: state.notify.content,
          type: state.notify.type,
          timeout: _timeout,
          id: _id,
          outlined: state.notify.outlined,
        })
        this.check(_id, _timeout)
      }
    })
  },
  methods: {
    check(id, timeout) {
      setTimeout(() => {
        const index = this.messages.findIndex((message) => message.id === id)
        this.messages.splice(index, 1)
      }, timeout * 1000)
    },
  },
}
</script>

<style scoped>
.notify-class {
  position: -webkit-fixed;
  position: fixed;
  align-self: flex-end;
  left: 1rem;
  bottom: 2rem;
  z-index: 999999;
}
</style>
