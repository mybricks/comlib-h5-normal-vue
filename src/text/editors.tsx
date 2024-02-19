export default {
  "@init"({ style }) {
    style.width = "fit-content";
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "样式",
        options: ["font", "padding", "border", "background"],
        target: ".mybricks-text",
      },
      {
        title: "开启文本省略",
        type: "Switch",
        value: {
          get({ data }) {
            return data.ellipsis;
          },
          set({ data }, val: boolean) {
            data.ellipsis = val;
          },
        },
      },
      {
        ifVisible({ data }) {
          return data.ellipsis;
        },
        title: "最大行数",
        type: "InputNumber",
        options: [{ min: 1 }],
        value: {
          get({ data }) {
            return [data.maxLines];
          },
          set({ data }, val) {
            data.maxLines = val[0];
          },
        },
      },
    ],
    spm: [
      {
        id: 'text',
        title: '文本',
        type: 'CLK' // 可选参数，支持的事件种类，CLK代表点击，EXP代表曝光，同时dom上会自动监听这些事件并曝光
      }
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "文本内容",
          type: "textarea",
          value: {
            get({ data }) {
              return data.text;
            },
            set({ data }, value: string) {
              data.text = value;
            },
          },
        },
        {
          title: "事件",
          items: [
            {
              title: "单击",
              type: "_event",
              options: {
                outputId: "onClick",
              },
            },
          ],
        },
      ];
    },
  },
};
