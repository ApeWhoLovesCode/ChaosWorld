"use client"

import { useContext, useMemo, useRef } from "react";
import { TriangleHuarongRoadItemProps } from "./type";
import { useDebounceFn, useSetState } from 'ahooks';
import { HuarongRoadCtx } from "./context";
import useTouchEvent from "@/hooks/useTouchEvent";
import './index.css';

export default function HuarongItem(props: TriangleHuarongRoadItemProps) {
  const { index, children, ...ret } = props
  const { gap, gridSize, gridArr, data, isReset, onChangeGrid } =
  useContext(HuarongRoadCtx);
  
  const [info, setInfo] = useSetState({
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    duration: 0,
    /** 当前处于的行列数 */
    rowNum: 0,
    colNum: 0,
  });

  const { info: _info, onTouchFn } = useTouchEvent({
    onTouchStart() {
      setInfo({ startX: info.x, startY: info.y, duration: 0 });
    },
    onTouchMove() {
    },
    onTouchEnd() {
      // setInfo({ x, y, duration: 0.4, rowNum, colNum });
    },
    // isDisable: {
    //   all: !moveDirection,
    // },
    isStopPropagation: true,
  });

  const cardStyle = useMemo(() => {
    let row = 0, col = 0;
    const handleGap = (v: number) => (0 < v ? v * gap : 0);
    console.log('data: ', data);
    data.some((dArr, dI) => {
      if(dArr.length * (dI + 1) > index) {
        return false
      }
      row = dI;
      col = index - dArr.length * dI 
      return true
    })
    console.log(index, row, col);
    return {
      width: gridSize,
      height: gridSize,
      top: gridSize * row + handleGap(row),
      left: (gridSize / 2) * col + handleGap(col),
    };
  }, [gridSize, index, data, gap]);

  return (
    <div
      className={`absolute ${index % 2 === 0 ? 'triangle' : 'triangle-flip'}`}
      style={{
        ...cardStyle,
        transitionDuration: info.duration + "s",
        transform: `translate(${info.x}px, ${info.y}px)`,
      }}
      {...onTouchFn}
    >
      {children}
    </div>
  );
}