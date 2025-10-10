import { Direction } from "@/utils"
import { CSSProperties, Ref } from "react"

export type TriangleHuarongRoadCommon = {
  /** 
   * 总行数
   * @default 4 
   */
  rowNum?: number
  /** 
   * 总列数 （仅代表第一行有多少列）
   * @default 5
   */
  colNum?: number
  /** 子三角是否不需要背景色 */
  isNotBg?: boolean
}

export type TriangleHuarongRoadInstance = {
  initData: () => void
}

export type TriangleHuarongRoadProps = {
  /**
   * 整体的宽度（高度等于宽度的1.25倍）
   * @default 100%
   */
  width?: string | number
  /** 
   * 滑块之间的间隙 单位px
   * @default 2
   */
  gap?: number
  /** 即将排列就绪 */
  isReadyComplete?: boolean
  /** ref */
  ref?: Ref<TriangleHuarongRoadInstance>
  /** 拼图完成了的回调 */
  onComplete?: () => void
  /** 拼图整体大小发生了变化的回调 */
  onResize?: (gridSize: number) => void
  /** 类名 */
  className?: string;
  /** style样式 */
  style?: CSSProperties;
  /** children节点 */
  children?: React.ReactNode
} & TriangleHuarongRoadCommon

export type TriangleHuarongRoadItemProps = { 
  /** 当前 item 的值，0代表是空格 */
  value: number
  /** 当前 item 的索引 */
  index: number
  /** 所在的行数 */
  row: number
  /** 所在的列数 */
  col: number
  /** 类名 */
  className?: string;
  /** style样式 */
  style?: CSSProperties;
  /** children节点 */
  children?: React.ReactNode
}

export type TriangleDataItem = {
  value: number
  top: number
  left: number
  /** 是否是倒三角 */
  isInverted: boolean
}

export type GridPosition = {row: number, col: number}
export type CanMoveItem = {
  /** 可以移动的方向 */
  d: Direction
} & GridPosition
export type ZeroInfo = GridPosition & {canMoveArr: CanMoveItem[]}