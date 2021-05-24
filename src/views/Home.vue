<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div class="">vuex</div>
    <div>
      <div><span>count:</span><span>{{count}}</span></div>
      <div><span>num:</span><span>{{num}}</span></div>
      <div><span>count2:</span><span>{{count2}}</span></div>
      <div><span>num2:</span><span>{{num2}}</span></div>
      <div><span>count3:</span><span>{{count3}}</span></div>
      <div><span>num3:</span><span>{{num3}}</span></div>
      <div><button @click="clickCountHandle">click</button></div>
      <div><button @click="clickCountHandle2">click2</button></div>
      <div><button @click="clickCountHandle3">click3</button></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed: {
    ...mapGetters([
      'count', 'num'
    ]),
    ...mapGetters({
      count2: 'count2', num2: 'num2'
    }),
    ...mapGetters('bb', {
      count3: 'count', num3: 'num'
    })
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    ...mapMutations([
      'UPDATECOUNT' // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ]),
    ...mapActions({ // // 将 `this.updateCount()` 映射为 `this.$store.dispatch('updateCount')`
      updateCount: 'updateCount'
    }),
    ...mapActions({ // // 将 `this.updateCount()` 映射为 `this.$store.dispatch('updateCount')`
      updateCount2: 'updateCount2'
    }),
    ...mapActions('bb', { // // 将 `this.updateCount()` 映射为 `this.$store.dispatch('updateCount')`
      updateCount3: 'updateCount'
    }),
    clickCountHandle (e) {
      // this.$store.commit('UPDATECOUNT', 9)
      // this.UPDATECOUNT(9)
      // this.$store.dispatch('updateCount')
      this.updateCount()
    },
    clickCountHandle2 () {
      this.updateCount2(2)
    },
    clickCountHandle3 () {
      this.updateCount3(3)
    }
  }
}
</script>
