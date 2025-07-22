"use client"

import { useRef } from "react";
import { TriangleHuarongRoadProps } from "./type";
import { useDebounceFn, useSetState } from 'ahooks';

export default function Huarong(props: TriangleHuarongRoadProps) {
  const { gap, width, onComplete, onResize, children, ...ret } = props
  const huarongRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useSetState({
    height: 100,
    /** 每一个格子的大小 */
    gridSize: 50,
    /** 索引对应的列表 */
    data: new Array(4) as boolean[]
  })

  const renderChildren = () => {
    return (
      <></>
    )
  }

  return (
    <div 
      style={{
        padding: gap + 'px', 
        width,
      }}
    >
      <div ref={huarongRef} style={{height: state.height + 'px',}}>
        {renderChildren()}
      </div>
    </div>
  );
}