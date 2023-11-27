<template>
  <div
    :class="`popup ${this.show ? 'show' : ''} mybricks-popup`"
    :style="popupStyle"
  >
    <div class="overlay mybricks-overlay" @click="handleOverlayClick"></div>
    <div :class="mainCx">
      <div :class="contentClasses" :style="data.contentStyle">
        <slot name="content"></slot>
      </div>
      <div
        v-if="data.visibleClose"
        class="close mybricks-close"
        @click="handleCloseClick"
      ></div>
    </div>
  </div>
</template>

<script>
import { isEdit, isDesigner } from "../utils/env";

export default {
  props: ["data", "inputs", "outputs", "env", "_env", "slots"],
  data() {
    return {
      show: false,
    };
  },
  computed: {
    mainCx() {
      return {
        main: true,
        center: this.data.position === "center",
        top: this.data.position === "top",
        bottom: this.data.position === "bottom",
        left: this.data.position === "left",
        right: this.data.position === "right",
      };
    },
    contentClasses() {
      return {
        content: true,
        empty: this.slots?.["content"]?.size === 0,
        "mybricks-content": true,
      };
    },
    popupStyle() {
      if (isEdit(this.env)) {
        /** 新场景需要一个宽高 */
        return {
          width: "375px",
          height: "667px",
          position: "relative",
        };
      }
      if (isDesigner(this.env)) {
        /** 设计器runtime时需要fixed会相对于更上层的元素 */
        return {
          width: "375px",
        };
      }
      return {};
    },
  },
  created() {
    this.show = true;
  },
  beforeDestroy() {
    this.show = false;
  },
  methods: {
    handleOverlayClick() {
      if (this.data.maskClose) {
        this.handleClose();
      }
    },
    handleCloseClick() {
      this.handleClose();
    },
    handleClose() {
      if (this.env?.edit) {
        return;
      }
      this._env?.currentScenes?.close?.();
      this.show = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "./style.less";
</style>
