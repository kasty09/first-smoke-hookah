<template>
    <div
    >
      <div
          v-if="!isFinal"
      >
      <div
        v-for="(man, i) in mans" :key="i" class="get-start-item"
        @click="setActive(man)"
      >
        <div
          class="get-start-item-checkbox"
          :class="{'get-start-item-checkbox-ischoiced': man.isChoiced}"
        >
          <div
            class="get-start-item-checkbox-circle"
            :style="{ background: cirlceColor }"
          ></div>
          </div>
          <span
            class="get-start-item-name"
            :style="addColorInChoice(man)"

          >{{ man.name }}</span>
        </div>
      </div>
      <div
        v-if="isFinal"
        class="get-start-item-vinner"
      >
      {{ vinner.name }}
      </div>
      <div v-if="isStart && countdown" class="get-start-item-countdown">{{ countdown }}</div>
    </div>
</template>
<script>

import { mapState } from 'vuex'

  export default {
    data () {
      return {
        countdown: 3,
        cirlceColor: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
        timerId: null,
        isFinal: false,
        vinner: null
      }
    },
    computed: {
      ...mapState(['mans'])
    },
    props: {
      isStart: Boolean
    },
    methods: {
      getRandomIntInInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      getCountdown () {
        this.timerId = setInterval(() => {
          if (this.countdown) {
            this.countdown--
          } else {
            clearInterval(this.timerId)
          }
        }, 1000)
      },
      getFinal () {
        this.vinner = this.mans[0]
        this.isFinal = true
      },
      getColor () {
        this.cirlceColor = `#${this.getRandomIntInInterval(100000, 900000)}`
      },
      addColorInChoice (man) {
        if (man.isGold) return { color: 'gold' }
        return man.isChoiced ? { color: man.isDeleted ? 'red' : this.cirlceColor } : {}
      }
    },
    watch: {
      isStart (isStart) {
        if (isStart) {
        this.getCountdown()
        }
      },
      countdown (countdown) {
        if (!countdown) {
        this.$parent.$emit('getStarted')
        }
      }
    }
  }
</script>
<style lang="less">
  .get-start-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
    &-checkbox {
      width: 30px;
      height: 30px;
      border: 2px solid rebeccapurple;
      border-radius: 50%;
      margin-right: 20px;
      &-ischoiced {
        display: flex;
        align-items: center;
        justify-content: center;
        .get-start-item-checkbox-circle {
          width: 80%;
          height: 80%;
          background: orange;
          border-radius: 50%;
        }
      }
    }
    &-name {
      font-size: 20px;
      font-family: Arial, Helvetica, sans-serif;
    }
    &-countdown {
      font-size: 80px;
      font-family: Arial, Helvetica, sans-serif;
      text-align: center;
    }
    &-vinner {
      display: flex;
      justify-content: center;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 40px;
      margin-top: 40px;
    }
  }
</style>
