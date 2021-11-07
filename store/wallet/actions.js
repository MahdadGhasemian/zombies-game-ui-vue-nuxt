import TruffleContract from '@truffle/contract'
import Web3 from 'web3'
import ZombiesGameArtifact from '~/static/contracts/ZombiesGame.json'

export default {
  initWallet(vuexContext) {
    return initWeb3()
      .then((account) => {
        vuexContext.commit('setAccount', account)

        getZombies(account).then((result) => {
          vuexContext.commit('setZombies', result)
        })

        return account
      })
      .catch((error) => {
        return error
      })
  },
  createZombie(vuexContext, { name }) {
    const account = vuexContext.rootState.wallet.account

    createNewZombie(account, name)
      .then((result) => {
        getZombies(account).then((result) => {
          vuexContext.commit('setZombies', result)
        })
      })
      .catch((error) => {
        return error
      })
  },
  levelUpZombie(vuexContext, { zombieId }) {
    const account = vuexContext.rootState.wallet.account

    levelUpTheZombie(account, zombieId)
      .then((result) => {
        vuexContext.commit('increaseZombieLevel', zombieId)
      })
      .catch((error) => {
        return error
      })
  },
}

const App = {
  web3Provider: null,
  contracts: {},
  web3: {},
  accounts: null,
}

function initWeb3() {
  // Modern dapp browsers...
  return new Promise((resolve, reject) => {
    if (window.ethereum) {
      try {
        // Request account access
        window.ethereum
          .request({
            method: 'eth_requestAccounts',
          })
          .then((accounts) => {
            resolve({ provider: window.ethereum, accounts })
          })
          .catch((error) => {
            reject(error)
          })
      } catch (error) {
        reject(new Error('User denied account access'))
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      resolve({ provider: window.web3.currentProvider, accounts: null })
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      const provider = new Web3.providers.HttpProvider('http://localhost:7545')
      resolve({ provider, accounts: null })
    }
  })
    .then(({ provider, accounts }) => {
      App.web3Provider = provider
      App.accounts = accounts
      App.web3 = new Web3(provider)

      // init contract
      App.contracts.ZombiesGame = TruffleContract(ZombiesGameArtifact)
      // Set the provider for our contract
      App.contracts.ZombiesGame.setProvider(App.web3Provider)

      // return new Promise.resolve(accounts)
      return accounts[0]
    })
    .catch((error) => {
      return error
    })
}

function getZombies(account) {
  return new Promise((resolve, reject) => {
    let zombiesGameInstance

    App.contracts.ZombiesGame.deployed()
      .then(function (instance) {
        zombiesGameInstance = instance

        return zombiesGameInstance.getZombiesByOwner(account, { from: account })
      })
      .then(function (zombies) {
        const itemsPromise = []
        zombies.forEach((zombie) => {
          itemsPromise.push(
            new Promise((resolve, reject) => {
              getZombieDetails(account, zombie)
                .then(function (zombies) {
                  resolve(zombies)
                })
                .catch(function (err) {
                  reject(err.message)
                })
            })
          )
        })

        Promise.all(itemsPromise)
          .then((details) => {
            resolve(
              details.map((item) => {
                return {
                  name: item.name.toString(),
                  dna: item.dna.toString(),
                  level: item.level.toString(),
                  readyTime: item.readyTime.toString(),
                  winCount: item.winCount.toString(),
                  lossCount: item.lossCount.toString(),
                }
              })
            )
          })
          .catch((error) => {
            reject(error)
          })
      })
      .catch(function (err) {
        reject(err.message)
      })
  })
}

function levelUpTheZombie(account, zombieId) {
  return new Promise((resolve, reject) => {
    let zombiesGameInstance

    App.contracts.ZombiesGame.deployed()
      .then(function (instance) {
        zombiesGameInstance = instance

        // Execute levelUp as a transaction by sending account
        return zombiesGameInstance.levelUp(zombieId, {
          from: account,
          // gas: 178898,
          value: Web3.utils.toWei('0.001', 'ether'),
        })
      })
      .then(function (result) {
        resolve(result)
      })
      .catch(function (err) {
        reject(err.message)
      })
  })
}

function createNewZombie(account, name) {
  return new Promise((resolve, reject) => {
    let zombiesGameInstance

    App.contracts.ZombiesGame.deployed()
      .then(function (instance) {
        zombiesGameInstance = instance

        // Execute createRandomZombie as a transaction by sending account
        return zombiesGameInstance.createRandomZombieFree(name, {
          from: account,
          // gas: 178898,
          // value: Web3.utils.toWei('1', 'ether'),
        })
      })
      .then(function (result) {
        resolve(result)
      })
      .catch(function (err) {
        reject(err.message)
      })
  })
}

function getZombieDetails(account, id) {
  return new Promise((resolve, reject) => {
    let zombiesGameInstance

    App.contracts.ZombiesGame.deployed()
      .then(function (instance) {
        zombiesGameInstance = instance

        // Execute createRandomZombie as a transaction by sending account
        return zombiesGameInstance.zombies(id, {
          from: account,
        })
      })
      .then(function (result) {
        resolve(result)
      })
      .catch(function (err) {
        reject(err.message)
      })
  })
}
