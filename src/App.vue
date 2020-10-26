<template>
  <div class="hookah-choice">
    <span class="hookah-choice-title">Кто первый будет кальянить ?</span>
    <hookah-select></hookah-select>
    <get-started ref="getStarted" :isStart="isStart" ></get-started>
  </div>
</template>
<script>

import hookahSelect from './hookahChoice'
import getStarted from './getStarted'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      timerId: null,
      isStart: false,
      itemIndex: 0,
      delimiter: 0,
      countdown: 0
    }
  },
  components: {
    hookahSelect,
    getStarted
  },
  computed: {
    ...mapState(['mans'])
  },
  methods: {
    ...mapMutations(['SET_MANS_LIST']),
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
    },
    round (delimiter, countdown, isEnd) {
        this.timerId = setInterval(() => {
          countdown--
          if (this.$refs.getStarted) {
            this.$refs.getStarted.getColor()
          }
          
          let mans = this.mans
          if (mans[this.itemIndex]) {
            if (mans[this.itemIndex + 1]) {
              mans[this.itemIndex].isChoiced = false
              mans[this.itemIndex +1].isChoiced = true
              this.itemIndex++
            } else {
              this.itemIndex = 0
              mans[this.itemIndex].isChoiced = true
              mans[mans.length - 1].isChoiced = false
            }
            this.SET_MANS_LIST(mans)
          }
          if (!countdown) {
            clearInterval(this.timerId)
            if (isEnd) {
              if (this.mans.find(m => m.isChoiced).isGold) {
                this.mans.find(m => m.isChoiced).isGold = false
                this.round(300, 1, true)
              } else {
                this.endRound()
              }
            } else {
              this.lastTick()
            }
          }
        }, delimiter)
    },
    getStarted () {
      if (this.mans.length > 1) {
        this.mans[0].isChoiced = true
        this.delimiter = 150
        this.countdown = this.getRandomInt(20) + 20        
        this.round(this.delimiter, this.countdown)
      }
    },
    lastTick () {
      this.round(300, 2, true)
    },
    endRound () {
      this.itemIndex = 0
      this.mans.find((m => m.isChoiced)).isDeleted = true
      setTimeout(() => {
          this.SET_MANS_LIST(this.mans.filter(m => !m.isChoiced))
        if (this.mans.length > 1) {
          this.getStarted()
        } else {
          this.$refs.getStarted.getFinal()
        }
      }, 1500)
    },
    addManList (mans) {
        this.timerId = setInterval(() => {
          if (mans.length) {
            this.mans.push(mans.shift())
          } else {
            this.isStart = true
            clearInterval(this.timerId)
          }
        }, 300)
    },
  },
  mounted () {
    this.$on('start', mans => {
      this.addManList(mans)
    })
    this.$on('getStarted', () => {
      this.getStarted()
    })
  },
  watch: {
    itemIndex (index) {
      if (!this.mans[index]) {
        this.itemIndex = 0
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .hookah-choice {
    padding: 10px;
    &-title {
      display: block;
      font-size: 22px;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
</style>
