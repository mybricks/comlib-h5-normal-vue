<template>
  <div v-if="visible" class="returnTop mybricks-to-top" @click="toTop">
    <img class="img" :src="m?.data?.src">
    <template></template>
    <!-- <slot name="content" :m="{ style: m?.data?.slotStyle }"></slot> -->
  </div>
</template>

<script>
import { throttle } from '../utils';

const cubic = (value) => Math.pow(value, 3);
const easeInOutCubic = (value) => (value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2);

const Scroll = {
  ele: document.scrollingElement || document.documentElement || document.body,
  toTop() {
    const { ele } = this;
    const beginTime = Date.now();
    const beginValue = ele.scrollTop;
    const rAF = window.requestAnimationFrame || ((func) => setTimeout(func, 16));
    const frameFunc = () => {
      const progress = (Date.now() - beginTime) / 500;
      if (progress < 1) {
        ele.scrollTop = beginValue * (1 - easeInOutCubic(progress));
        rAF(frameFunc);
      } else {
        ele.scrollTop = 0;
      }
    };
    rAF(frameFunc);
  },
};


export default {
  props: ["env", "data", "inputs", "outputs", "m"],
  data() {
    return {
      visible: this.finalVisible(),
    }
  },
  // computed: {
  //   visibleProps() {
  //     const { visibleCondition, visibleHeight } = this.m?.data ?? {};
  //     return { visibleCondition, visibleHeight }
  //   },
  // },
  // watch: {
  //   visibleProps({ visibleCondition, visibleHeight }) {
  //     console.log(11111, visibleCondition, visibleHeight)  
  //   }
  // },
  created() {
    if (this.m?.env?.canvasElement?.firstChild) {
      Scroll.ele = this.m?.env?.canvasElement?.firstChild;
    }

    this._throttleHandleScroll_ = throttle(this.handleScroll, 300);
    Scroll.ele.addEventListener('scroll', this._throttleHandleScroll_, true)
  },
  beforeDestroy() {
    Scroll.ele.removeEventListener('scroll', this._throttleHandleScroll_, true)
  },
  methods: {
    shouldVisible() {
      const { visibleCondition, visibleHeight } = this.m?.data ?? {};
      let vbHeight = 0;
      if (visibleCondition == 0) {
        vbHeight = 0;
      } else if (visibleCondition === 'custom') {
        vbHeight = visibleHeight;
      }
      const ele = Scroll.ele;
      return ele.scrollTop >= vbHeight
    },
    finalVisible() {
      const { runtime } = this.m?.env ?? {}
      return runtime ? this.shouldVisible() : true;
    },
    handleScroll() {
      this.visible = this.finalVisible();
    },
    toTop() {
      Scroll.toTop()
    }
  },
};
</script>

<style lang="less" scoped>
.returnTop {
  width: 100%;
  height: 100%;
  .img {
    width: 100%;
    height: 100%;
  }
}

</style>
