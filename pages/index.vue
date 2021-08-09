<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-2 mx-2">
      <input
        v-model="name"
        type="text"
        class="border border-green-500 rounted-sm"
      />
      <button
        class="w-full block text-white rounded py-2 bg-green-600"
        type="button"
        @click="createZombie({ name })"
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
        sm:gap-6
        md:gap-4
        lg:gap-4
        mt-2
        sm:mt-10
        mx-2
        md:mx-4
        lg:mx-8
      "
    >
      <div v-for="zombie in zombies" :key="zombie.id">
        <ZombieChar
          :zombie-name="zombie.name"
          :optional-dna="zombie.dna"
          :auto-generate="true"
          :cat-mode="false"
          :hide-name-field="true"
        />
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
      // zombies: [
      //   {
      //     name: 'New Zombie',
      //     dna: '4858414537809200',
      //   },
      // ],
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
    }),
    generateRandomName() {
      return 'Zombie ' + Math.random().toString(10).substring(4, 6)
    },
  },
}
</script>

<style></style>
