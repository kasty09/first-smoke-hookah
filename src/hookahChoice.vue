<template>
  <div
    class="hookah-choice-select"
    :class="{'hookah-choice-select-start': isStarted}"
  >
    <div
      v-for="(man, i) in names" :key="i" class="hookah-choice-select-item"
      @click="setActive(man)"
    >
      <div
        class="hookah-choice-select-item-checkbox"
        :class="{'hookah-choice-select-item-checkbox-active': man.isActive}"
      ></div>
      <span
        class="hookah-choice-select-item-name"
        :class="{ 'hookah-choice-select-item-name-gold': man.isGoldAnimated }"
      >{{ man.name }}</span>
    </div>
    <button @click="start" class="hookah-choice-select-item-btn">Старт</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isStarted: false,
      names: [
        {
          name: 'Азик',
          isAddChance: 0,
          isActive: true
        },
        {
          name: 'Мухаджир',
          isAddChance: 0,
          isActive: true
        },
        {
          name: 'Огрули',
          isAddChance: 0,
          isActive: true
        },
        {
          name: 'Тёма',
          isAddChance: 0,
          isActive: true
        },
        {
          name: 'Куша',
          isAddChance: 0,
          isActive: true
        },
        {
          name: 'Хус',
          isAddChance: 0,
          isActive: true
        }
      ]
    }
  },
  methods: {
    setActive (man) {
      if (!man.isActive && !man.isGold) {
        man.isAddChance < 2 ? man.isAddChance++ : this.addChance(man)
      }
      man.isActive = !man.isActive
    },
    addChance(man) {
      man.isGold = true
      man.isGoldAnimated = true
      setTimeout(() => {
        man.isGoldAnimated = false
        this.names = this.names.slice('')

      }, 100)
    },
    start () {
      this.isStarted = true
    },
    getStart () {
      setTimeout(() => {
        this.names = this.names.sort(() => Math.random() - 0.5)
        this.$parent.$emit('start', this.names.filter(man => man.isActive))
      }, 500) 
    }
  },
  mounted () {
    document.addEventListener('transitionend', this.getStart)
  }
}
</script>
<style lang="less">
  .hookah-choice-select {
    transition: all 0.3s linear;
    max-height: 400px;
    overflow: hidden;
    &-start {
      max-height: 0;
    }
    &-item {
      display: flex;
      margin: 20px 0;
      &-checkbox {
        width: 20px;
        height: 20px;
        border: 1px solid black;
        margin-right: 10px;
        &-active {
          background: rebeccapurple;
        }
      }
      &-name {
        font-size: 20px;
        font-family: Arial, Helvetica, sans-serif;
        &-gold {
          color: gold;
        }
      }
      &-btn {
        height: 60px;
        box-sizing: border-box;
        border-radius: 5px;
        outline: none;
        border: none;
        font-size: 20px;
        color: white;
        text-shadow: 1px 1px 0  #444;
        background: #7c1ee7;
        margin-top: auto;
        width: 100%;
      }
    }
  }
</style>