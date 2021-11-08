export const state = () => ({
  list: [],
  title: '',
  content: '',
  type: '',
  timeout: 0,
  id: 0,
  outlined: false,
})

export const mutations = {
  showMessage(state, payload) {
    state.title = payload.title
    state.content = payload.content
    state.type = payload.type
    state.timeout = payload.timeout
    state.id = Math.floor(Math.random() * 1000)
    state.outlined = payload.outlined
  },
  add(state, payload) {
    state.list.unshift({
      title: payload.title,
      content: payload.content,
      type: payload.type,
      timeout: payload.timeout,
      id: Math.floor(Math.random() * 1000),
      outlined: payload.outlined,
    })
  },
  remove(state, index) {
    state.list.splice(index, 1)
  },
}

export const getters = {
  getList(state) {
    return state.list
  },
}
