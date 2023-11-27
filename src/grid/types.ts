import type { RowType, ColType } from "./components";

export type DataColType = ColType & { slotStyle: React.CSSProperties, isHover?: boolean };

export type DataRowType = RowType & { cols: Array<DataColType>, useCustom?: boolean};

export interface Data {
  resizable?: boolean;
  rows: Array<DataRowType>;
  style?: React.CSSProperties;
}


export enum WidthUnitEnum {
  Px = "px",
  Auto = "auto",
  Percent = "%",
}

export enum HeightUnitEnum {
  Px = "px",
  Auto = "auto",
  Percent = "%",
}