<template>
  <div>
    <div>
      <input type="file" @change="fetchVideo" accept="video/*">
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      fetchVideo() {
        console.log(111);
      }
    }
  }
</script>
<style lang="scss">

</style>
