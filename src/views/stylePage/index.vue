<template>
<div>
  <!-- 变量 对象 数组 只是用来定义类名的；-->
  <!-- 支持字符串 -->
  <div :class="'activeZero'"></div>
  <!-- 不在状态里面定义的时候会报错 下面情况就会报错 -->
  <div :class="activeOne"></div>
  <!-- 在状态里面定义 -->
  <div :class="activeTwo"></div>
  <!-- 这里的key不需要是字符串，因为本身就是字符串的定义形式 -->
  <div :class="{activeThree: true}"></div>

  <div>----内联样式style----</div>
  <!-- 内联样式style 就没有那么多套路 -->
  <!-- 也是支持字符串的 -->
  <div :style="'height: 100px;width: 100px;background:black'"></div>
  <div :style="{height: '100px', width: '100px', background: 'pink'}"></div>
  <div :style="activeFore"></div>
</div>
</template>
<script>
export default {
  data() {
    return {
      // 在这里key必须是字符串；
      activeOne: 'activeOne',
      activeTwo: {
        'class-a': true
      },
      // 在style 中是支持下面的写法；
      activeFore: {
        height: '100px',
        width: '100px',
        background: 'green'
      }
    }
  }
}
</script>
<style>
.activeZero {
  height: 100px;
  width: 100px;
  background: blanchedalmond;
}
.activeOne {
  height: 100px;
  width: 100px;
  background: red;
}
.class-a {
  height: 100px;
  width: 100px;
  background: violet;
}
.activeTwo {
  height: 100px;
  width: 100px;
  background-color: yellow;
}
.activeThree {
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
</style>
