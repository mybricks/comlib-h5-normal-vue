import { uuid } from "../utils";

function getTabItem(data, focusArea) {
  const tabId = focusArea.dataset.tabId;
  for (let item of data.tabList) {
    if (item.tabId === tabId) {
      return item;
    }
  }
  return {};
}

const getFocusTab = (props) => {
  const { data, focusArea } = props;
  if (!focusArea) return {};
  const { index } = focusArea;
  return data.tabs[index];
};

function computedAction({ before, after }) {
  let beforeIds = before.map((item) => item._id);
  let afterIds = after.map((item) => item._id);

  switch (true) {
    case before.length > after.length: {
      let diffId = beforeIds.filter((x) => !afterIds.includes(x))[0];
      let diffItem = before.filter((x) => diffId.includes(x._id))[0];
      return {
        name: "remove",
        value: diffItem,
      };
    }
    case before.length < after.length: {
      let diffId = afterIds.filter((x) => !beforeIds.includes(x))[0];
      let diffItem = after.filter((x) => diffId.includes(x._id))[0];
      return {
        name: "add",
        value: diffItem,
      };
    }

    case before.length === after.length: {
      let diffItem = null;

      for (let i = 0; i < before.length; i++) {
        if (before[i].tabName !== after[i].tabName) {
          diffItem = after[i];
          console.warn("diffItem", diffItem);
          break;
        }
      }

      return {
        name: "update",
        value: diffItem,
      };
    }
  }
}

export default {
  "@init"({ style }) {
    style.width = "100%";
    style.height = "auto";
  },
  ":root": {
    style: [
      {
        title: '标签栏',
        options: [
          { type: 'background' },
          { type: 'size' }
        ],
        target: '.mybricks-tabs'
      },
      {
        title: '内容区域',
        options: [
          { type: 'background' },
          { type: 'size' }
        ],
        target: '.mybricks-tabs-body'
      }
    ],
    items({ data }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
       
        {
          title: '布局模式',
          description: '标签数量少的时候从哪里开始布局',
          type: 'select',
          options: [
            { label: '居左', value: 'left' },
            { label: '居中', value: 'center' },
            { label: '居右', value: 'right' }
          ],
          value: {
            get({ data }) {
              return data.tabsXLayout ?? 'center';
            },
            set({ data }, value) {
              data.tabsXLayout = value;
            },
          }
        },
        {
          title: "标签项",
          type: "array",
          options: {
            selectable: false,
            getTitle: (item, index) => {
              return [`${item.tabName || ""}`];
            },
            onAdd() {
              let defaultItem = {
                tabName: "标签名",
              };
              return defaultItem;
            },
            onSelect(_id, index) {
              if (index !== -1) {
                data.edit.currentTabId = data.tabs[index]?._id;
              }
            },
            items: [
              {
                title: "标签名",
                type: "text",
                value: "tabName",
              },
            ],
          },
          value: {
            get({ data }) {
              return data.tabs;
            },
            set({ data, slot }, value) {
              let action = computedAction({
                before: data.tabs,
                after: value,
              });
  
              switch (action?.name) {
                case "remove":
                  slot.remove(action?.value._id);
                  break;
                case "add":
                  slot.add(action?.value._id);
                  break;
                case "update":
                  slot.setTitle(action?.value._id, action?.value.tabName);
                  break;
              }
              data.tabs = value;
              console.log("data.tabs",data.tabs)
            },
          },
        },
        {
          title: "事件",
          items: [
            {
              title: "标签切换",
              type: "_event",
              options: {
                outputId: "changeTab",
              },
            },
          ],
        },
        {
          title: '其它',
          items: [
            {
              title: "支持滑动",
              type: "switch",
              value: {
                get({ data }) {
                  return data.swipeable;
                },
                set({ data }, value) {
                  data.swipeable = value;
                },
              },
            },
            {
              title: "隐藏内容",
              type: "switch",
              value: {
                get({ data }) {
                  return data.hideContent;
                },
                set({ data }, value) {
                  data.hideContent = value;
                },
              },
            },
          ]
        },
      ];
  
      cate2.title = '高级';
      cate2.items = [
        {
          title: "初始化时触发一次「标签切换」事件",
          type: "switch",
          value: {
            get({ data }) {
              return data.initChangeTab;
            },
            set({ data }, value) {
              data.initChangeTab = value;
            },
          },
        },
      ]
    },
  },
  ".taroify-tabs__tab": {
    title: '标签项',
    style: [      
      {
        title: '标签项',
        items: [
          {
            title: '默认Tab',
            catelog: '默认',
            options: [
              { type: 'font', config: { disableTextAlign: true } },
              { type: 'size'},
              { type: 'border'},
              { type: 'padding' },
              { type: 'background' }
            ],
            target: '.taroify-tabs__tab:not(.taroify-tabs__tab--active)',
          },
          {
            title: '选中Tab',
            catelog: '选中',
            options: [
              { type: 'font', config: { disableTextAlign: true } },
              { type: 'size'},
              { type: 'border'},
              { type: 'padding' },
              { type: 'background' }
            ],
            target: '.taroify-tabs__tab--active',
          },
        ]
      },
      {
        title: '选中条',
        options: [
          { type: 'background' },
          { type: 'size' }
        ],
        target: '.taroify-tabs__tab--active .taroify-tabs__line'
      },
    ],
    items(props, cate1, cate2, cate3) {
      if (!props.focusArea) return;
      const focusItem = getFocusTab(props);
  
      cate1.title = "常规";
      cate1.items = [
        {
          title: "标签项",
          type: "text",
          value: {
            get({ data, focusArea }) {
              return focusItem?.tabName;
            },
            set({ data, focusArea, slot }, value) {
              if (!focusArea) return;
              focusItem.tabName = value;
              slot.setTitle(focusItem._id, value);
            },
          },
        },
        {
          items: [
            {
              title: "删除标签项",
              type: "Button",
              value: {
                set({ data, slot, focusArea }) {
                  if (!focusArea) return;
                  data.tabs.splice(focusArea.index, 1);
                  slot.remove(focusItem._id);
                },
              },
            },
          ],
        },
      ];
    },
  } 
  
};
