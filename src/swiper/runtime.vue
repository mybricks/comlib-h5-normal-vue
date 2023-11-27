<template>
  <div ref="swiper" class="swiper mybricks-swiper-wrapper">
    <div class="swiper-wrapper">
      <template v-for="item in m?.data.items ?? []">
        <div class="swiper-slide mybricks-swiper-item" :key="item._id">
          <slot :name="item._id"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { debounce } from './../utils'
import "swiper/swiper-bundle.css";

function getDefaultCurrTabId(props) {
  const { data, env } = props;
  if (env?.edit && data?.edit?.currentTabId) {
    return data?.edit?.currentTabId;
  }
  if (data?.items.length > 0) {
    return data.items[0]._id || "";
  }
  return "";
}

export default {
  props: ["env", "data", "inputs", "outputs", "m"],
  data() {
    return {
      currentTabId: getDefaultCurrTabId(this.m),
    };
  },
  computed: {
    currentIndex() {
      return this.getCurIndex();
    },
  },
  watch: {
    currentIndex(index) {
      this.swiperRef.slideTo(index, 400);
    },
  },
  methods: {
    getCurIndex() {
      return (this.m?.data?.items ?? []).findIndex(
        (t) => t._id === this.currentTabId
      );
    },
    getIsLoop() {
      const { circular } = this.m?.data;
      return !!circular
    },
  },
  mounted() {

    console.log('12321', this.m.env, !!this.m.env.edit)
    const { currentIndex } = this;
    const { duration } = this.m?.data;
    this.swiperRef = new Swiper(this.$refs.swiper, {
      speed: this.m?.env?.edit ? 0 : 400,
      spaceBetween: 0,
      initialSlide: currentIndex,
      slidesPerView: 1,
      speed: 300,
      observer: true,
      observeParents: true,
      loop: this.m?.env?.edit ? false : this.getIsLoop()
      // on: {
      //   slideChange: function () {
      //     console.log(this.activeIndex);
      //   },
      // },
    });

    if (this.m?.env.edit) {
      // 设计态不允许拖拽
      this.swiperRef.detachEvents()

      this.$watch("m.data.edit.currentTabId", (val) => {
        this.currentTabId = val;
      });
    }

    setTimeout(() => {
      this.swiperRef.update();
    }, 500);
  },
  beforeDestroy() {
    if (this.swiperRef) {
      this.swiperRef.destroy();
    }
  },
};
</script>

<style lang="less" scoped>
.mybricks-swiper-wrapper {
  width: 100%;
  height: 100%;
}
.mswiper {
  width: 100%;
  height: 100%;
}

.mswiper-item {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
