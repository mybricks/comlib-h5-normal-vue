<template>
  <div class="layout mybricks-layout">
    <template v-for="row in m.data?.rows ?? []">
      <div class="row mybricks-row" :style="rowStyle(row)" :key="row.key">
        <template v-for="(col, colIndex) in row?.cols ?? []">
          <div
            class="col mybricks-col"
            :style="colStyle(col, row, colIndex)"
            :key="col.key"
          >
            <slot
              :name="col.key"
              :m="{
                key: col.key,
                style: col.slotStyle,
              }"
            />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import { WidthUnitEnum, HeightUnitEnum } from "./types";

export default {
  props: ["env", "data", "inputs", "outputs", "title", "m"],
  created() {},
  methods: {
    onClick() {
      if (!this.env.runtime) {
        return;
      }
      this.outputs["onClick"]();
    },
    rowStyle(row) {
      const style = { ...(row.style ?? {}) };
      if (row.heightMode === HeightUnitEnum.Auto) {
        style.height = row.heightMode;
      }
      if (row.heightMode === HeightUnitEnum.Px) {
        style.height = `${parseFloat(row.height)}px`;
      }
      if (row.heightMode === HeightUnitEnum.Percent) {
        style.height = `${parseFloat(row.height)}%`;
      }
      return style;
    },
    colStyle(col, row, index) {
      const isLastCol = index === row.cols.length - 1;
      const _col = {
        ...col,
        widthMode: isLastCol ? WidthUnitEnum.Auto : col.widthMode,
      };

      const style = {};
      if (_col.widthMode === WidthUnitEnum.Auto) {
        style.flex = 1;
        style.minWidth = 30;
      }
      if (_col.widthMode === WidthUnitEnum.Px) {
        style.width = _col.width;
      }
      if (_col.widthMode === WidthUnitEnum.Percent) {
        style.flex = `0 0 ${_col.width}%`;
        style.maxWidth = `${_col.width}%`;
      }
      return { ...style, ...(_col.style ?? {}) };
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.row {
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  align-items: stretch;
  flex-shrink: 0;
  flex-grow: 0;
  &:last-child {
    flex: 1;
  }
}

.col {
  flex-shrink: 0;
  flex-grow: 0;
  overflow: hidden;
  // &:last-of-type {
  //   flex: 1 !important;
  // }
}
</style>
