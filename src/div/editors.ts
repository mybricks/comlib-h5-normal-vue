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
          set({ data, slot }: EditorResult<any>, val) {
            data.slotStyle = val;
            setSlotLayout({ slotStyle: val, slotInstance: slot.get('content') })
          },
        },
      },
    ]
  }
}

export const setSlotLayout = ({
  slotStyle,
  slotInstance,
}: any & {
  slotStyle: any;
}) => {
  if (slotStyle.position === "absolute") {
    slotInstance.setLayout(slotStyle.position);
  } else if (slotStyle.display === "flex") {
    if (slotStyle.flexDirection === "row") {
      slotInstance.setLayout("flex-row");
    } else if (slotStyle.flexDirection === "column") {
      slotInstance.setLayout("flex-column");
    }
  }
};