<script>
import { useSafeStore } from '../stores/safe';

const MAX_DIGIT = 4; // PIN max length
const CLEAR_KEY = "CLR"; // Value to clear the display
const ENTER_KEY = "=>"; // Value to enter (validate) the PIN
const INVALID_MSG = "INVALID"; // Messages shown when there is an invalid input

export default {
  setup() {
    const safeStore = useSafeStore();
    return { safeStore };
  },
  data() {
    return {
      keys: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        CLEAR_KEY,
        "0",
        ENTER_KEY,
      ],
      enteredPin: "",
      message: "",
    };
  },
  methods: {
    setKey(key) {
      // Execute different flows based on the value and type of the key pressed
      try {
        let self = this;
        // Check if the key pressed was a number or one of the options (CLR or =>)
        if (isNaN(key)) {
          switch (key) {
            case CLEAR_KEY:
              self.resetDisplay();
              break;
            case ENTER_KEY:
              self.validatePin();
              break;
            default:
              break;
          }
        } else if (self.message.length < MAX_DIGIT) {
          // Add the new digit to the entered pin and display it on the screen
          self.enteredPin += key;
          self.message += key;
        }
      } catch (error) {
        console.error(error.message);
        alert("There was an error when pressing the '" + key + "' button.");
      }
    },
    validatePin() {
      // Validate the length of the entered pin and the state of the safe to
      // determine whether the safe should be locked or unlocked
      try {
        let self = this;
        // Validate if the entered pin is valid
        if (self.isValidPin) {
          // Validate if the safe is locked
          if (self.safeStore.getIsLocked) {
            // Validate if the entered pin is equal to the stored one
            if (self.isPinCorrect) {
              // Unlock the safe and reset the display
              self.safeStore.unlockSafe();
              self.resetDisplay();
            } else self.message = INVALID_MSG;
          } else {
            // Store the pin when the safe is unlocked and reset the display
            self.savePin();
            self.resetDisplay();
          }
        } else self.message = INVALID_MSG;
      } catch (error) {
        console.error(error.message);
        alert("There was an error validating the pin.");
      }
    },
    savePin() {
      // Store the entered pin to be validated later on and lock the safe
      try {
        let self = this;
        self.safeStore.setPin(self.enteredPin);
        self.safeStore.lockSafe()
      } catch (error) {
        console.error(error.message);
        alert("There was an error when saving the pin.");
      }
    },
    resetDisplay() {
      // Clear both the message on the display and the entered pin
      try {
        let self = this;
        self.message = "";
        self.enteredPin = "";
      } catch (error) {
        console.error(error.message);
        alert("There was an error reseting the display message.");
      }
    },
  },
  computed: {
    isValidPin() {
      // Validate if the entered pin meets the 'max digit' restriction
      let self = this;
      return self.enteredPin.length == MAX_DIGIT;
    },
    isPinCorrect() {
      // Determine if the entered pin matches the saved one
      let self = this;
      return self.safeStore.getPin == self.enteredPin;
    },
  },
};
</script>

<template>
  <div class="section">
    <button class="key" @click="setKey(key)" v-for="key in keys" :key="key">
      {{ key }}
    </button>
  </div>
  <div class="section">
    <div class="display">
      <label for="">{{ message }}</label>
    </div>
    <div class="indicator">
      <button class="indicator" :class="{ lockedColor: safeStore.getIsLocked }"></button>
    </div>
  </div>
</template>

<style scoped>
div.section {
  margin: 0px 25px;
  width: 300px;
}

button.key {
  height: 100px;
  width: 100px;
}

button.indicator {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: green;
}

button.lockedColor {
  background-color: red;
}

div.display {
  border-style: dotted;
  height: 100px;
  width: 300px;
  border: 1px black solid;
}

div.indicator {
  margin-top: 20px;
  height: 100px;
  width: 300px;
  text-align: center;
}
</style>
