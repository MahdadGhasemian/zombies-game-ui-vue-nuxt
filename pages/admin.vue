<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-2 mx-2 mt-2 gap-4">
      <button
        class="w-full block text-white rounded py-2 bg-blue-600 col-span-2"
        type="button"
        :disabled="owner"
        @click="getOwnerId()"
      >
        {{ owner ? 'Owner Id = ' + owner : 'Show Current Owner' }}
      </button>
      <button
        class="w-full block text-white rounded py-2 bg-yellow-600 col-span-2"
        type="button"
        @click="withdraw()"
      >
        Withdraw
      </button>
      <input
        v-model="newOnwer"
        type="text"
        class="border border-green-500 rounted-sm px-4"
      />
      <button
        class="w-full block text-white rounded py-2 bg-red-600"
        type="button"
        @click="transferOwnership"
      >
        Transfer owner
      </button>
      <input
        v-model="feeValue"
        type="text"
        class="border border-green-500 rounted-sm px-4"
      />
      <button
        class="w-full block text-white rounded py-2 bg-green-600"
        type="button"
        @click="setFee()"
      >
        Set Level Up Fee
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      feeValue: 0.001,
      owner: null,
      newOnwer: '0x00',
    }
  },
  methods: {
    ...mapActions({
      transferOwnershipToNew: 'wallet/transferOwnershipToNew',
      getOwnerContract: 'wallet/getOwnerContract',
      withdrawBalance: 'wallet/withdrawBalance',
      setLevelUpFeeValue: 'wallet/setLevelUpFeeValue',
    }),
    setFee() {
      this.setLevelUpFeeValue({ feeValue: this.feeValue })
    },
    getOwnerId() {
      this.getOwnerContract().then((owner) => {
        this.owner = owner
      })
    },
    transferOwnership() {
      this.transferOwnershipToNew({ newOnwer: this.newOnwer }).then(() => {
        this.getOwnerId()
      })
    },
    withdraw() {
      this.withdrawBalance()
        .then((result) => {
          this.$notifier.showMessage({
            content: result,
            type: 'success',
            timeout: 6,
          })
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
