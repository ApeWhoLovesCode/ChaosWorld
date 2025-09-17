import { Direction } from "@/utils/tool"
import { CSSProperties } from "react"

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
}

export type TriangleHuarongRoadProps = { 
  /**
   * 整体的宽度（高度等于宽度的1.25倍）
   * @default 100%
   */
  width?: string | number
  /** 
   * 数据的位置
   * 例： 
   * [
   *  [    1,  2,  3,  4,  5     ],
   *  [6,  7,  8,  9,  10, 11, 12],
   *  [13, 14, 15, 16, 17, 18, 19],
   *  [    20, 21, 22, 23, 24    ],
   * ]
   */
  data?: number[][]
  /** 
   * 滑块之间的间隙 单位px
   * @default 2
   */
  gap?: number
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

export type GridPosition = {row: number, col: number}
export type CanMoveItem = {
  /** 可以移动的方向 */
  d: Direction
} & GridPosition
export type ZeroInfo = GridPosition & {canMoveArr: CanMoveItem[]}