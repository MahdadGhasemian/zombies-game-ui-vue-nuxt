export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage({
      title = '',
      content = '',
      type = '',
      timeout = 4,
      outlined = false,
    }) {
      store.commit('notify/showMessage', {
        title,
        content,
        type,
        timeout,
        outlined,
      })
    },
  })
}
