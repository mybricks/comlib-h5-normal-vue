export default {
  "@init"({ style }) {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ':root': {
    style: [
      {
        title: "",
        options: ["border", "background", "padding", "overflow"],
        target: `.mybricks-div`,
      }
    ],
    items: [
      {
        // title: "内容布局",
        type: "layout",
        value: {
          get({ data }: EditorResult<any>) {
            return data.slotStyle;
          },
          set({ data }: EditorResult<any>, val) {
            data.slotStyle = val
          },
        },
      },
    ]
  }
}