<template>
  <div class="rounded-md border-gray-200 border h-full">
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
    name: {
      type: String,
      require: true,
      default: 'Zombie',
    },
    dna: {
      type: String,
      require: true,
      default: 'Zombie',
    },
    level: {
      type: String,
      require: true,
      default: '1',
    },
    readyTime: {
      type: String,
      require: true,
      default: '0',
    },
    winCount: {
      type: String,
      require: true,
      default: '0',
    },
    lossCount: {
      type: String,
      require: true,
      default: '0',
    },
  },
}
</script>
