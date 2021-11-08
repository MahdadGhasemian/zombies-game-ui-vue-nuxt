<template>
  <div class="my-2">
    <div
      class="text-white px-6 py-4 border-0 rounded relative mb-4"
      :class="getColor"
    >
      <span class="text-xl inline-block mr-5 align-middle">
        <i class="fas fa-bell" />
      </span>
      <slot class="inline-block align-middle mr-8"> </slot>
      <button
        class="
          absolute
          bg-transparent
          text-2xl
          font-semibold
          leading-none
          right-0
          top-0
          mt-4
          mr-6
          outline-none
          focus:outline-none
        "
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      default: 'success',
      type: String,
    },
  },
  computed: {
    getColor() {
      return this.type === 'success'
        ? 'bg-green-500'
        : this.type === 'info'
        ? 'bg-blue-500'
        : this.type === 'warning'
        ? 'bg-yellow-500'
        : this.type === 'error'
        ? 'bg-red-500'
        : ''
    },
  },
}
</script>
