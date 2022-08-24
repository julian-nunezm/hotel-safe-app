<script>
const MAX_DIGIT = 4;     // PIN max length
const CLEAR_KEY = 'CLR'  // Value to clear the display
const ENTER_KEY = '=>'   // Value to enter (validate) the PIN

export default {
    data() {
        return {
            keys: ['1','2','3','4','5','6','7','8','9',CLEAR_KEY,'0',ENTER_KEY],
            message: '',
            isSafeLocked: false
        }
    },
    methods: {
        setKey(key) {
            let self = this;
            console.log(key)
            if (isNaN(key)) {
                switch (key) {
                    case CLEAR_KEY:
                        self.message = ''
                        self.isSafeLocked = true
                        break;
                    case ENTER_KEY:
                        self.message = ''
                        self.isSafeLocked = false
                        break;
                    default:
                        break;
                }
            }
            else if (self.message.length < MAX_DIGIT)
                self.message += key
        }
    }
}
</script>

<template>
  <div class="section">
    <button class="key" @click="setKey(key)" v-for="key in keys" :key="key">{{key}}</button>
  </div>
  <div class="section">
    <div class="display">
        <label for="">{{message}}</label>
    </div>
    <div class="indicator">
        <button class="indicator" :class="{lockedColor: isSafeLocked}" v-text="''"></button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

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
