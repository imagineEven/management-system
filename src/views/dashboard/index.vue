<template>
  <div class="dashboard-container">
    <div class="dashboard-text" @click="onclick">name:这个是什么页面</div>
    <div class="dashboard-text" @click="showA">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  data() {
    return {
      a : 0
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
  },
    methods: {
      async() {
        setTimeout(() => {
          //debugger
          this.a++;
        },1000)
      },
      onclick() {
        this.a = 0;
        this.async();
        console.log(this.a);
      },
      showA() {
        console.log(this.a)
      }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
