import TruffleContract from '@truffle/contract'
import Web3 from 'web3'
import ZombiesGameArtifact from '~/static/contracts/ZombiesGame.json'

export default {
  initWallet(vuexContext) {
    return initWeb3(this)
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
        console.log(result) // eslint-disable-line no-console
        vuexContext.commit('increaseZombieLevel', zombieId)
      })
      .catch((error) => {
        return error
      })
  },
  editZombieName(vuexContext, { zombieId, newName }) {
    const account = vuexContext.rootState.wallet.account

    editNameOfZombie(account, zombieId, newName)
      .then((result) => {
        console.log(result) // eslint-disable-line no-console
        vuexContext.commit('editNameOfZombie', { zombieId, newName })
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
  zombiesGameInstance: null,
}

function initWeb3(context) {
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
    .then(async ({ provider, accounts }) => {
      App.web3Provider = provider
      App.accounts = accounts
      App.web3 = new Web3(provider)

      // init contract
      App.contracts.ZombiesGame = TruffleContract(ZombiesGameArtifact)
      // Set the provider for our contract
      App.contracts.ZombiesGame.setProvider(App.web3Provider)

      App.zombiesGameInstance = await App.contracts.ZombiesGame.deployed()

      //  TODO filter events
      App.zombiesGameInstance
        .NewZombie()
        .on('data', (event) => {
          const zombie = event.returnValues
          // We can access this event's 3 return values on the `event.returnValues` object:

          context.$notifier.showMessage({
            content: [
              'A new zombie was born! (',
              'id: ',
              zombie.zombieId,
              ', name: ',
              zombie.name,
              ', dna: ',
              zombie.dna,
              ')',
            ].join(''),
            type: 'success',
            timeout: 4,
          })
        })
        .on('error', (error) => {
          context.$notifier.showMessage({
            content: error,
            type: 'error',
          })
        })

      App.zombiesGameInstance
        .getPastEvents('NewZombie', { fromBlock: 0, toBlock: 'latest' })
        .then(function (events) {
          // `events` is an array of `event` objects that we can iterate, like we did above
          // This code will get us a list of every zombie that was ever created
          console.log({ pastEvents: events })
        })

      // return new Promise.resolve(accounts)
      return accounts[0]
    })
    .catch((error) => {
      return error
    })
}

function getZombies(account) {
  return new Promise((resolve, reject) => {
    return App.zombiesGameInstance
      .getZombiesByOwner(account, { from: account })
      .then(function (zombies) {
        const itemsPromise = []
        zombies.forEach((zombie) => {
          itemsPromise.push(
            new Promise((resolve, reject) => {
              getZombieDetails(account, zombie)
                .then(function (zombies) {
                  zombies.id = Number(zombie)
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
                  id: item.id,
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

function editNameOfZombie(account, zombieId, newName) {
  return App.zombiesGameInstance.changeName(zombieId, newName, {
    from: account,
    // gas: 178898,
    // value: Web3.utils.toWei('0.001', 'ether'),
  })
}

function levelUpTheZombie(account, zombieId) {
  return App.zombiesGameInstance.levelUp(zombieId, {
    from: account,
    // gas: 178898,
    value: Web3.utils.toWei('0.001', 'ether'),
  })
}

function createNewZombie(account, name) {
  return App.zombiesGameInstance.createRandomZombieFree(name, {
    from: account,
    // gas: 178898,
    // value: Web3.utils.toWei('1', 'ether'),
  })
}

function getZombieDetails(account, id) {
  return App.zombiesGameInstance.zombies(id, {
    from: account,
  })
}
