<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-2 mx-2 gap-4 mt-2">
      <input
        v-model="name"
        type="text"
        class="border border-green-500 rounted-sm"
      />
      <button
        class="w-full block text-white rounded py-2 bg-green-600"
        type="button"
        @click="createNewZombie(name)"
      >
        Get new Zombie
      </button>
    </div>

    <div
      class="
        grid grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-4
        mt-4
      "
    >
      <div
        v-for="zombie in zombies"
        :key="zombie.id"
        class="grid grid-cols-1 border border-red-100 p-2"
      >
        <zombie-template
          :is-zombie-loaded="true"
          :name="zombie.name"
          :dna="zombie.dna"
          :level="zombie.level"
          :ready-time="zombie.readyTime"
          :win-count="zombie.winCount"
          :loss-count="zombie.lossCount"
          @save="saveName($event, zombie.id)"
        />
        <button
          class="w-full block text-white rounded bg-blue-600 my-4 p-2"
          type="button"
          @click="levelUpZombie({ zombieId: zombie.id })"
        >
          Level Up ( {{ zombie.id }} )
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      name: this.generateRandomName(),
    }
  },
  computed: {
    ...mapGetters({
      walletIsEnable: 'wallet/walletIsEnable',
      account: 'wallet/getAccount',
      zombies: 'wallet/getZombies',
    }),
  },
  methods: {
    ...mapActions({
      createZombie: 'wallet/createZombie',
      levelUpZombie: 'wallet/levelUpZombie',
      editZombieName: 'wallet/editZombieName',
    }),
    generateRandomName() {
      return 'Zombie ' + Math.random().toString(10).substring(4, 6)
    },
    saveName(name, zombieId) {
      this.editZombieName({ zombieId, newName: name })
    },
    createNewZombie(name) {
      this.createZombie({ name })
        .then((result) => {
          console.log({ createZombieResult: result }) // eslint-disable-line
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: error,
            type: 'error',
            timeout: 6,
          })
        })
    },
  },
}
</script>
