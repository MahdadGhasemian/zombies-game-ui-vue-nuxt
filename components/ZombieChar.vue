<template>
  <!-- <div
    v-images-loaded="zombieLoaded"
    class="relative border-2 border-green-400 rounded-2xl"
  > -->
  <!-- <div
      v-show="!isZombieLoaded"
      class="zombie-loading object-contain h-72"
    ></div> -->
  <div class="relative h-96 w-auto ml-2 border-2 border-green-400">
    <div
      v-show="isZombieLoaded"
      class="border-2 border-red-400"
      :class="partsVisible"
    >
      <img
        v-show="!catMode"
        :style="clothesColor"
        class="left-feet"
        src="~/assets/zombieparts/left-feet-1@2x.png"
      />
      <img
        v-show="!catMode"
        :style="clothesColor"
        class="right-feet"
        src="~/assets/zombieparts/right-feet-1@2x.png"
      />

      <img
        v-show="!catMode"
        :style="clothesColor"
        class="left-leg"
        src="~/assets/zombieparts/left-leg-1@2x.png"
      />
      <img
        v-show="!catMode"
        :style="clothesColor"
        class="right-leg"
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
  </div>

  <!-- </div> -->
</template>

<script>
import 'babel-polyfill'
import sha3 from 'js-sha3'
import bigInt from 'big-integer'
import imagesLoaded from 'vue-images-loaded'
export default {
  name: 'ZombieChar',
  directives: {
    imagesLoaded,
  },
  props: {
    optionalDna: {
      default: '',
      type: String,
    },
    zombieName: {
      default: '',
      type: String,
    },
    zombieDescription: {
      default: '',
      type: String,
    },
    hideNameField: {
      default: true,
      type: Boolean,
    },
    skinColorChoice: {
      default: 1,
      type: [Number, String],
    },
    eyeColorChoice: {
      default: 1,
      type: [Number, String],
    },
    clothesColorChoice: {
      default: 1,
      type: [Number, String],
    },
    headChoice: {
      default: 1,
      type: [Number, String],
    },
    eyeChoice: {
      default: 1,
      type: [Number, String],
    },
    shirtChoice: {
      default: 1,
      type: [Number, String],
    },
    autoGenerate: {
      default: false,
      type: Boolean,
    },
    catMode: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      isZombieLoaded: true,
    }
  },
  computed: {
    currentDna() {
      if (this.optionalDna) {
        return this.optionalDna
      } else {
        const name = this.zombieName
        const hash = sha3.keccak256(name)
        let num = bigInt(hash, 16)
        num = num.mod(Math.pow(10, 16))
        let dnaStr = String(num)
        while (dnaStr.length < 16) dnaStr = '0' + dnaStr
        return dnaStr
      }
    },
    currentHeadChoice() {
      return this.autoGenerate
        ? (parseInt(this.currentDna.substring(0, 2)) % 7) + 1
        : this.headChoice
    },
    currentEyeChoice() {
      return this.autoGenerate
        ? (parseInt(this.currentDna.substring(2, 4)) % 11) + 1
        : this.eyeChoice
    },
    currentShirtChoice() {
      return this.autoGenerate
        ? (parseInt(this.currentDna.substring(4, 6)) % 6) + 1
        : this.shirtChoice
    },
    currentSkinColorChoice() {
      return this.autoGenerate
        ? (parseInt(this.currentDna.substring(6, 8)) / 100) * 360
        : this.skinColorChoice
    },
    currentEyeColorChoice() {
      return this.autoGenerate
        ? (parseInt(this.currentDna.substring(8, 10)) / 100) * 360
        : this.eyeColorChoice
    },
    currentClothesColorChoice() {
      return this.autoGenerate
        ? (parseInt(this.currentDna.substring(10, 12)) / 100) * 360
        : this.clothesColorChoice
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
    partsVisible() {
      const headVisible = `head-visible-${this.currentHeadChoice}`
      const eyeVisible = `eye-visible-${this.currentEyeChoice}`
      const shirtVisible = `shirt-visible-${this.currentShirtChoice}`
      return `${headVisible} ${eyeVisible} ${shirtVisible}`
    },
    hideNameFieldClass() {
      return !!this.hideNameField || !this.isZombieLoaded
        ? 'hide'
        : 'zombie-card card bg-shaded'
    },
    currentZombieDescription() {
      return this.zombieDescription
    },
  },
  methods: {
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
      return i === this.currentHeadChoice
        ? `head head-part-${i} visible`
        : `head head-part-${i} hidden`
    },
    eyeClass(i) {
      return i === this.currentEyeChoice
        ? `eye eye-part-${i} visible`
        : `eye eye-part-${i} hidden`
    },
    shirtClass(i) {
      return i === this.currentShirtChoice
        ? `shirt shirt-part-${i} visible`
        : `shirt shirt-part-${i} hidden`
    },
    zombieLoaded(instance) {
      // const self = this
      // setTimeout(() => {
      //   self.isZombieLoaded = true
      // }, 200050) // 2050
    },
    getColor(deg) {
      return `filter: hue-rotate(${deg}deg);`
    },
  },
}
</script>

<style scoped>
.visible {
  visibility: visible;
}

.hidden {
  visibility: hidden;
}

.zombie-loading {
  background: url('~assets/zombiebg/zombierun.png') left center;
  width: 192px;
  animation: play 0.7s steps(24) infinite;
}
@keyframes play {
  100% {
    background-position: -4608px;
  }
}

.head {
  width: 28vh;
  position: absolute;
  left: 13vh;
  top: -4vh;
}
.eye {
  width: 13vh;
  position: absolute;
  left: 23vh;
  top: 8vh;
}
.shirt {
  width: 13vh;
  position: absolute;
  left: 15.6vh;
  top: 13vh;
}
.mouth {
  width: 6vh;
  position: absolute;
  left: 27vh;
  top: 15vh;
}
.torso {
  width: 13vh;
  position: absolute;
  left: 15.6vh;
  top: 13vh;
}
.left-thigh {
  width: 6vh;
  position: absolute;
  left: 17.3vh;
  top: 22vh;
}
.right-thigh {
  width: 6vh;
  position: absolute;
  left: 20.4vh;
  top: 22vh;
}
.cat-legs {
  width: 10vh;
  position: absolute;
  left: 15.4vh;
  top: 18vh;
}
.left-hand {
  width: 4vh;
  position: absolute;
  left: 24.3vh;
  top: 19vh;
}
.right-hand {
  width: 4vh;
  position: absolute;
  left: 28.4vh;
  top: 19vh;
}
.left-forearm {
  width: 4vh;
  position: absolute;
  left: 22.3vh;
  top: 20vh;
}
.right-forearm {
  width: 4vh;
  position: absolute;
  left: 26.4vh;
  top: 20vh;
}
.left-upper-arm {
  width: 6vh;
  position: absolute;
  left: 19.3vh;
  top: 16vh;
}
.right-upper-arm {
  width: 6vh;
  position: absolute;
  left: 23.4vh;
  top: 16vh;
}
.left-leg {
  width: 4vh;
  position: absolute;
  left: 18.3vh;
  top: 27vh;
}
.right-leg {
  width: 3.3vh;
  position: absolute;
  left: 22.3vh;
  top: 27.6vh;
}
.left-feet {
  width: 4vh;
  position: absolute;
  left: 18.3vh;
  top: 30vh;
}
.right-feet {
  width: 3.3vh;
  position: absolute;
  left: 22.3vh;
  top: 30.3vh;
}
</style>
