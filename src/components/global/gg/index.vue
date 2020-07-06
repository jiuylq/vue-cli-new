<template>
  <div class="gg">
    <h1>{{ msg }}</h1>
    <svg-icon icon-class="bug" id="bug" />
  </div>
</template>

<script>
import { A } from '@/api/article'
export default {
  name: 'gg',
  props: {
    msg: String
  },
  created () {
  },
  mounted () {
    let aa = 1
    A({ user: 1 }).then(data => {
      console.log(data)
    })
    console.log(aa)
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
#bug {
  width: 200px;
  height: auto;
}
</style>
