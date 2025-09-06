"use client"

import { useEffect, useRef } from "react";
import { TriangleHuarongRoadProps } from "./type";
import { useDebounceFn, useSetState } from 'ahooks';
import HuarongItem from "./huarongItem";
import { ITEM_NUM } from "./config";

export default function Huarong(props: TriangleHuarongRoadProps) {
  const { gap, width, data, onComplete, onResize, children, ...ret } = props
  const huarongRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useSetState({
    height: 100,
    /** 每一个格子的大小 */
    gridSize: 50,
    /** 索引对应的列表 */
    data: new Array(4) as boolean[]
  })

  useEffect(() => {
    if(!data?.length) {
      state.data = new Array(4) as boolean[]
    }
  }, [data])

  const renderChildren = () => {
    const hasNum = Object.values(children?.valueOf() ?? {}).length
    if(ITEM_NUM - hasNum <= 0) return children
    const fillArr = []
    for(let i = hasNum; i < ITEM_NUM; i++) {
      fillArr.push(
        <HuarongItem 
          key={i} 
          index={i} 
        >
          {i}
        </HuarongItem>
      )
    }
    return (
      <>
        {children}
        {fillArr}
      </>
    )
  }

  return (
    <div 
      style={{
        padding: gap + 'px', 
        width,
      }}
    >
      <div ref={huarongRef} className="relative" style={{height: state.height + 'px',}}>
        {renderChildren()}
      </div>
    </div>
  );
}