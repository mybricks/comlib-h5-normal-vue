<template>
  <div>
    <div v-if="emptyView" class="empty">暂无内容，请配置标签项</div>
    <Tabs
      v-else
      className="mybricks-tabs"
      :value="currentTabId"
      :items="m?.data?.tabs"
      @change="setCurrentTabId"
      :justifyContent="m?.data?.tabsXLayout"
    >
      <div class="mybricks-tabs-body" v-for="tab in m.data.tabs">
        <div v-show="currentTabId === tab._id">
          <div v-show="!m.data.hideContent">
            <slot :name="tab._id"></slot>
          </div>
        </div>
      </div>
    </Tabs>
  </div>
</template>

<script>
import Tabs from "./../components/tabs/index.vue";

export default {
  props: ["data", "inputs", "outputs", "env", "title", "m"],
  components: {
    Tabs,
  },
  data() {
    return {
      currentTabId: "tabName1",
    };
  },
  computed: {
    emptyView() {
      return this.env.edit && this.data.tabs.length === 0;
    },
    // justifyContent() {
    //     console.log(111, this.m, this.m?.data?.tabsXLayout, this.data.tabsXLayout)
    //     return this.m?.data?.tabsXLayout ?? 'center'
    // }
  },
  watch: {},
  created() {
    this.currentTabId = this.getDefaultCurrTabId(this.data.tabs);
  },
  mounted() {
    this.inputs["tabList"]?.((ds) => {
      if (Array.isArray(ds)) {
        this.data.tabs = ds;
      }
    });

    this.inputs["activeTabId"]?.((tabId) => {
      if (tabId !== undefined || tabId !== null) {
        this.setCurrentTabId(tabId);
      }
    });
  },
  methods: {
    getDefaultCurrTabId(tabs) {
      if (tabs.length > 0) {
        return tabs[0]._id || "";
      }
      return "";
    },
    setCurrentTabId(newTabId) {
      this.currentTabId = newTabId;
      const index = this.data.tabs.findIndex((tab) => tab._id == newTabId);
      if (index === -1) {
        return;
      }
      const findItem = this.data.tabs[index];
      this.outputs.changeTab?.({
        id: findItem._id,
        title: findItem.tabName,
        index,
      });
    }
  },
};
</script>

<style scoped lang="less">
@import "./style.less";
</style>
