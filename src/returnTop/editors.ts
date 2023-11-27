// import { styleEditor } from '../stickyItem/editors'

export default {
  '@init'({ data, style, slot }) {
    style.position = 'fixed';
    style.top = 600;
    style.right = 12;
    style.width = 40;
    style.height = 40;
  },
  "@resize": {
    options: ["width", "height"],
  },
  ':root': {
    style: [
      {
        title: '',
        options: ["background", "padding", "size"],
        target: 'mybricks-to-top',
      }
    ],
    items: [
      {
        title: '图标',
        type: 'imageSelector',
        value: {
          get({ data }) {
            return data.src;
          },
          set({ data }, value: any) {
            data.src = value;
          },
        }
      },
      {},
      {
        title: '显示条件',
        type: 'Radio',
        options: [
          { label: '一直显示', value: '0' },
          // { label: '半屏高度', value: 'half' },
          { label: '自定义', value: 'custom' },
        ],
        value: {
          get({ data }) {
            return data.visibleCondition;
          },
          set({ data }, value: any) {
            data.visibleCondition = value;
          },
        },
      },
      {
        title: '自定义显示高度',
        type: 'Slider',
        ifVisible({ data }) {
          return data.visibleCondition === 'custom';
        },
        options: {
          max: 2000,
          min: 0,
        },
        value: {
          get({ data }) {
            return data.visibleHeight;
          },
          set({ data }, value: any) {
            data.visibleHeight = value;
          },
        },
      },
    ]
  }
};
