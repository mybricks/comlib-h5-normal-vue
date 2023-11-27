<template>
  <div class="layout mybricks-div">
    <slot name="content" :m="{ style: m?.data?.slotStyle }"></slot>
  </div>
</template>

<script>
export default {
  props: ["env", "data", "inputs", "outputs", "m"],
  computed: {},
  methods: {},
};
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
}

</style>
