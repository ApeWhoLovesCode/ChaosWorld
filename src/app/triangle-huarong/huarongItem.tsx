"use client"

import { useContext, useMemo, useRef } from "react";
import { TriangleHuarongRoadItemProps } from "./type";
import { useDebounceFn, useSetState } from 'ahooks';
import { getPositionItem } from "./utils";
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
    const { row, col, width, height } = getPositionItem({
      gridSize,
      index,
      data,
      gap,
    });
    const handleGap = (v: number) => (0 < v ? v * gap : 0);
    return {
      width,
      height,
      top: gridSize * row + handleGap(row),
      left: (gridSize / 2) * col + handleGap(col),
    };
  }, [gridSize, index, data, gap, getPositionItem]);

  return (
    <div
      className={index % 2 === 0 ? 'triangle' : 'triangle-flip'}
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