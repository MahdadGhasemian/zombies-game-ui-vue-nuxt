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
        mt-4
      "
    >
      <div
        v-for="(zombie, index) in zombies"
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
        />
        <button
          class="w-full block text-white rounded bg-blue-600 my-4 p-2"
          type="button"
          @click="levelUpZombie({ zombieId: index })"
        >
          Level Up ( {{ index }} )
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
    }),
    generateRandomName() {
      return 'Zombie ' + Math.random().toString(10).substring(4, 6)
    },
    headColor() {
      return this.getColor(this.currentSkinColorChoice)
    },
    eyeColor() {
      return this.getColor(this.currentEyeColorChoice)
    },
    clothesColor() {
      return this.getColor(this.currentClothesColorChoice)
    },
    headSrc(i) {
      return require('~/assets/zombieparts/head-' + i + '@2x.png')
    },
    eyeSrc(i) {
      return require('~/assets/zombieparts/eyes-' + i + '@2x.png')
    },
    shirtSrc(i) {
      return require('~/assets/zombieparts/shirt-' + i + '@2x.png')
    },
    headClass(i) {
      return i === 1
        ? `head head-part-${i} visible`
        : `head head-part-${i} hidden`
    },
    eyeClass(i) {
      return i === 2 ? `eye eye-part-${i} visible` : `eye eye-part-${i} hidden`
    },
    shirtClass(i) {
      return i === 3
        ? `shirt shirt-part-${i} visible`
        : `shirt shirt-part-${i} hidden`
    },
  },
}
</script>

<style scoped>
.head {
  position: absolute;
  width: 16.4rem; /* 28vh */
  left: 7.6rem; /* 13vh */
  top: -2.34rem; /* -4vh */
}
.eye {
  position: absolute;
  width: 7.6rem; /* 13vh */
  left: 13.5rem; /* 23vh */
  top: 4.7rem; /* 8vh */
}
.shirt {
  position: absolute;
  width: 7.6rem; /* 13vh */
  left: 9.1rem; /* 15.6vh */
  top: 7.6rem; /* 13vh */
}
.mouth {
  position: absolute;
  width: 3.5rem; /* 6vh */
  left: 15.8rem; /* 27vh */
  top: 8.8rem; /* 15vh */
}
.torso {
  position: absolute;
  width: 7.6rem; /* 13vh */
  left: 9.1rem; /* 15.6vh */
  top: 7.6rem; /* 13vh */
}
.left-thigh {
  position: absolute;
  width: 3.5rem; /* 6vh */
  left: 10.1rem; /* 17.3vh */
  top: 12.9rem; /* 22vh */
}
.right-thigh {
  position: absolute;
  width: 3.5rem; /* 6vh */
  left: 12rem; /* 20.4vh */
  top: 12.9rem; /* 22vh */
}
.cat-legs {
  position: absolute;
  width: 5.85rem; /* 10vh */
  left: 9rem; /* 15.4vh */
  top: 10.5rem; /* 18vh */
}
.left-hand {
  position: absolute;
  width: 2.34rem; /* 4vh */
  left: 14.2rem; /* 24.3vh */
  top: 11.1rem; /* 19vh */
}
.right-hand {
  position: absolute;
  width: 2.34rem; /* 4vh */
  left: 16.6rem; /* 28.4vh */
  top: 11.1rem; /* 19vh */
}
.left-forearm {
  position: absolute;
  width: 2.34rem; /* 4vh */
  left: 13rem; /* 22.3vh */
  top: 11.8rem; /* 20vh */
}
.right-forearm {
  position: absolute;
  width: 2.34rem; /* 4vh */
  left: 15.5rem; /* 26.4vh */
  top: 11.7rem; /* 20vh */
}
.left-upper-arm {
  position: absolute;
  width: 3.5rem; /* 6vh */
  left: 11.3rem; /* 19.3vh */
  top: 9.4rem; /* 16vh */
}
.right-upper-arm {
  position: absolute;
  width: 3.5rem; /* 6vh */
  left: 13.7rem; /* 23.4vh */
  top: 9.4rem; /* 16vh */
}
.left-leg {
  position: absolute;
  width: 2.34rem; /* 4vh */
  left: 10.7rem; /* 18.3vh */
  top: 15.8rem; /* 27vh */
}
.right-leg {
  position: absolute;
  width: 1.9rem; /* 3.3vh */
  left: 13rem; /* 22.3vh */
  top: 16.1rem; /* 27.6vh */
}
.left-feet {
  position: absolute;
  width: 2.34rem; /* 4vh */
  left: 10.7rem; /* 18.3vh */
  top: 17.6rem; /* 30vh; */
}
.right-feet {
  position: absolute;
  width: 1.9rem; /* 3.3vh */
  left: 13rem; /* 22.3vh */
  top: 17.75rem; /* 30.3vh */
}
</style>
