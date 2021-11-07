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
    state.zombies[zombieId].level = String(++state.zombies[zombieId].level)
  },
}
