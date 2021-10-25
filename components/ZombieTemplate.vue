<template>
  <div class="rounded-md border-gray-200 border h-full">
    <div class="w-full p-4">
      <ZombieChar
        :is-zombie-loaded="isZombieLoaded"
        :optional-dna="dna"
        :auto-generate="true"
        :cat-mode="false"
      />
    </div>

    <div class="w-full pl-4">
      <strong>Name</strong>: <span>{{ name }}</span
      ><br />
      <strong>DNA</strong>: <span>{{ dna }}</span
      ><br />
      <strong>Level</strong>: <span>{{ level }}</span
      ><br />
      <strong>ReadyTime</strong>: <span>{{ readyTime }}</span
      ><br />
      <strong>WinCount</strong>: <span>{{ winCount }}</span
      ><br />
      <strong>LossCount</strong>: <span>{{ lossCount }}</span
      ><br />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isZombieLoaded: {
      default: false,
      type: Boolean,
    },
    name: {
      default: '',
      type: String,
    },
    dna: {
      default: '',
      type: String,
    },
    level: {
      default: '',
      type: String,
    },
    readyTime: {
      default: '',
      type: String,
    },
    winCount: {
      default: '',
      type: String,
    },
    lossCount: {
      default: '',
      type: String,
    },
  },
}
</script>
