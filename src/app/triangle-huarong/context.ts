import React from "react";
import { Direction } from "@/utils/tool";
import { TriangleHuarongRoadCommon } from "./type";

export const HuarongRoadCtx = React.createContext<HuarongRoadCtxType>({
  gap: 2,
  data: [],
  gridArr: [],
  gridSize: 50,
  rowNum: 0,
  colNum: 0,
  startLeftArr: [],
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
  startLeftArr: number[]
  onChangeGrid: (p: onChangeGridParams) => void
} & Required<TriangleHuarongRoadCommon>

export type GridPosition = {row: number, col: number}

export type onChangeGridParams = {
  p: GridPosition
  target: GridPosition
  /** 1:上 2:右 3:下 4:左 */
  direction: Direction
  index: number
}