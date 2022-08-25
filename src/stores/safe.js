import { defineStore } from "pinia";

export const useSafeStore = defineStore({
  id: "safe",
  state: () => ({
    isLocked: false,  //  The safe starts being unlocked
    pin: ''
  }),
  getters: {
    getIsLocked: (state) => state.isLocked,
    getPin: (state) => state.pin,
  },
  actions: {
    lockSafe() {
      this.isLocked = true;
    },
    unlockSafe() {
      this.isLocked = false;
    },
    setPin(newPin) {
      this.pin = newPin;
    },
  },
});
