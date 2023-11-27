<template>
  <div>
    <div :class="`tabs ${className}`" :style="justifyContent ? { justifyContent } : {}">
      <div class="tab_list">
        <div
          v-for="item in items"
          :key="item._id"
          @click="tabClick(item._id)"
          :class="[
            'tabItem',
            'taroify-tabs__tab',
            isActive(item._id) ? 'active taroify-tabs__tab--active' : '',
          ]"
        >
          <!-- 激活的情况 -->
          <div v-show="isActive(item._id)">
            <div>{{ item.tabName }}</div>
            <div
              v-show="item._id === value"
              class="line taroify-tabs__line"
            ></div>
          </div>
          <!-- 非激活的情况 -->
          <div v-show="!isActive(item._id)">
            <div>{{ item.tabName }}</div>
          </div>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  inheritAttrs: true,
  props: ["value", "items", "className", "justifyContent"],
  data() {
    return {};
  },
  created() {
  },
  mounted() {},
  methods: {
    tabClick(id) {
      this.$emit("change", id);
    },
    isActive(itemId) {
      return itemId === this.value ? true : false;
    },
  },
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
