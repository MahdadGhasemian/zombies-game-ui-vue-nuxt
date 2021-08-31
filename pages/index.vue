<template>
  <div class="container mx-auto">
    <div class="h-96 w-96 border-2 border-blue-600 rounded-sm">
      <img
        v-show="!catMode"
        :style="clothesColor"
        class="left-feet absolute"
        src="~/assets/zombieparts/left-feet-1@2x.png"
      />
      <img
        v-show="!catMode"
        :style="clothesColor"
        class="right-feet absolute"
        src="~/assets/zombieparts/right-feet-1@2x.png"
      />

      <img
        v-show="!catMode"
        :style="clothesColor"
        class="left-leg absolute"
        src="~/assets/zombieparts/left-leg-1@2x.png"
      />
      <img
        v-show="!catMode"
        :style="clothesColor"
        class="right-leg absolute w-1/6"
        src="~/assets/zombieparts/right-leg-1@2x.png"
      />

      <img
        v-show="!catMode"
        :style="clothesColor"
        class="left-thigh"
        src="~/assets/zombieparts/left-thigh-1@2x.png"
      />
      <img
        v-show="!catMode"
        :style="clothesColor"
        class="right-thigh"
        src="~/assets/zombieparts/right-thigh-1@2x.png"
      />

      <img
        :style="headColor"
        class="left-forearm"
        src="~/assets/zombieparts/left-forearm-1@2x.png"
      />
      <img
        :style="headColor"
        class="right-forearm"
        src="~/assets/zombieparts/right-forearm-1@2x.png"
      />

      <img
        :style="headColor"
        class="right-upper-arm"
        src="~/assets/zombieparts/right-upper-arm-1@2x.png"
      />

      <img
        :style="clothesColor"
        class="torso"
        src="~/assets/zombieparts/torso-1@2x.png"
      />

      <img
        v-show="catMode"
        :style="clothesColor"
        class="cat-legs"
        src="~/assets/zombieparts/catlegs.png"
      />

      <img
        v-for="n in 6"
        :key="'shirt-img-' + n"
        :style="clothesColor"
        :class="shirtClass(n)"
        :src="shirtSrc(n)"
      />

      <img
        :style="headColor"
        class="left-upper-arm"
        src="~/assets/zombieparts/left-upper-arm-1@2x.png"
      />

      <img
        :style="headColor"
        class="left-forearm"
        src="~/assets/zombieparts/left-forearm-1@2x.png"
      />
      <img
        :style="headColor"
        class="right-forearm"
        src="~/assets/zombieparts/right-forearm-1@2x.png"
      />

      <img
        :style="headColor"
        class="left-hand"
        src="~/assets/zombieparts/hand1-1@2x.png"
      />
      <img
        :style="headColor"
        class="right-hand"
        src="~/assets/zombieparts/hand-2-1@2x.png"
      />

      <img
        v-for="n in 7"
        :key="'head-img-' + n"
        :style="headColor"
        :class="headClass(n)"
        :src="headSrc(n)"
      />
      <img
        v-for="n in 11"
        :key="'eye-img-' + n"
        :style="eyeColor"
        :class="eyeClass(n)"
        :src="eyeSrc(n)"
      />
      <img class="mouth" src="~/assets/zombieparts/mouth-1@2x.png" />
    </div>
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

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      catMode: false,

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
