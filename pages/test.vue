<template>
  <div>
    <zombie-char-component-vue2
      v-for="zombie in zombies"
      :key="zombie.name"
      :is-zombie-loaded="true"
      :optional-dna="zombie.dna"
      :zombie-name="zombie.name"
      :auto-generate="true"
      :cat-mode="false"
    />
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      zombies: [
        {
          dna: '010101010101',
          name: 'Zombie1',
        },
        {
          dna: '020202020202',
          name: 'Zombie2',
        },
      ],
    }
  },
}
</script>
