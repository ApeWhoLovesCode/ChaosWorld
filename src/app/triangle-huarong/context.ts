import React, { RefObject } from "react";
import { Direction } from "@/utils/tool";
import { GridPosition, TriangleDataItem, TriangleHuarongRoadCommon, ZeroInfo } from "./type";

export const HuarongRoadCtx = React.createContext<HuarongRoadCtxType>({
  gap: 2,
  data: [],
  gridArr: [],
  gridSize: 50,
  zeroInfo: {row: 0, col: 0, canMoveArr: []},
  rowNum: 0,
  colNum: 0,
  startLeftArr: [],
  isNotBg: false,
  touchIndex: void 0,
  onChangeGrid: (p: onChangeGridParams) => {}
})

export type HuarongRoadCtxType = {
  gap: number
  /** 初始的格子信息 */
  data: number[][]
  /** 变化的格子信息 */
  gridArr: number[][]
  /** 每个格子的大小 */
  gridSize: number
  zeroInfo: ZeroInfo
  startLeftArr: number[]
  /** 当前触摸的格子索引 */
  touchIndex?: number
  onChangeGrid: (p: onChangeGridParams) => void
} & Required<TriangleHuarongRoadCommon>

export type onChangeGridParams = {
  /** 移动节点之前的位置 */
  p: GridPosition
  /** 移动节点到达的目标位置 */
  target: GridPosition
  /** 1:上 2:右 3:下 4:左 */
  direction: Direction
  index: number
}