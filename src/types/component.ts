import { CSSProperties } from "react";

export type NativeProps<S extends string = never> = {
  /** 类名 */
  className?: string;
  /** style样式 */
  style?: CSSProperties & Partial<Record<S, string>>;
  /** children节点 */
  children?: React.ReactNode
}