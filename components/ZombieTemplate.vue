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
      <strong>Name</strong>:
      <div class="inline-flex">
        <input
          type="text"
          :value="name"
          class="flex-1 outline-none"
          @input="change"
          @click="editEnable = true"
        />
        <button class="" type="button flex-1" @click="save">
          <svg
            v-show="editEnable"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </div>

      <br />
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
  data() {
    return {
      value: '',
      editEnable: false,
    }
  },
  mounted() {
    this.value = this.name
  },
  methods: {
    change(input) {
      this.value = input.target.value
    },
    save() {
      this.$emit('save', this.value)
    },
  },
}
</script>
