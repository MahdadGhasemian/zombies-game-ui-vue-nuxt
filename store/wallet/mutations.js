export default {
  setAccount(state, account) {
    state.account = account
    state.isEnable = true
  },
  clearAccount(state) {
    state.account = null
    state.isEnable = false
  },
  setZombies(state, zombies) {
    state.zombies = zombies
  },
  increaseZombieLevel(state, zombieId) {
    const index = state.zombies.findIndex((item) => {
      return item.id === zombieId
    })
    if (index > -1)
      state.zombies[index].level = String(++state.zombies[index].level)
  },
  editNameOfZombie(state, { zombieId, newName }) {
    const index = state.zombies.findIndex((item) => {
      return item.id === zombieId
    })
    if (index > -1) state.zombies[index].name = String(newName)
  },
}
