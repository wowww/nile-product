export type SlippageStateType = "warning" | "safe" | "normal" | "danger";

export interface SlippageDetailType {
  state: SlippageStateType;
  title: string;
  percent: string;
}

export interface TokenHistoryParams {
  token: string;
  unit: "hour" | "day" | "month";
  type: "price" | "liquidity" | "volume";
  unit_count: number;
}

export type ChartPeriodType = "day" | "week" | "month" | "all";
// for swap
export type chartKeyType = "price" | "liquidity" | "volume";
// for pool
export type chartKeyType_P = "liquidity" | "volume";
