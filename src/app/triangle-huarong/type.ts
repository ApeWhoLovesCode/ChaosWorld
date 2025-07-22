import { CSSProperties } from "react"

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
}