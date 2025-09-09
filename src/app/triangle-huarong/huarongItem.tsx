'use client';

import { useContext, useMemo, useRef } from 'react';
import { TriangleHuarongRoadItemProps } from './type';
import { useDebounceFn, useSetState } from 'ahooks';
import { HuarongRoadCtx } from './context';
import useTouchEvent from '@/hooks/useTouchEvent';
import './index.css';

export default function HuarongItem(props: TriangleHuarongRoadItemProps) {
  const { index, children, row, col, ...ret } = props as Required<TriangleHuarongRoadItemProps>;
  const { gap, gridSize, gridArr, data, rowNum, colNum, startLeftArr, onChangeGrid } = useContext(HuarongRoadCtx);

  const [info, setInfo] = useSetState({
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    duration: 0,
  });

  const { info: _info, onTouchFn } = useTouchEvent({
    onTouchStart() {
      setInfo({ startX: info.x, startY: info.y, duration: 0 });
    },
    onTouchMove() {},
    onTouchEnd() {
      // setInfo({ x, y, duration: 0.4, rowNum, colNum });
    },
    // isDisable: {
    //   all: !moveDirection,
    // },
    isStopPropagation: true,
  });

  const cardStyle = useMemo(() => {
    const handleGap = (v: number) => (0 < v ? v * gap : 0);
    const startLeft = startLeftArr[row] || 0
    return {
      width: gridSize,
      height: gridSize,
      top: gridSize * row + handleGap(row),
      left: startLeft + (gridSize / 2) * col + handleGap(col),
    };
  }, [gridSize, data, gap]);

  return (
    <div
      className={`absolute flex items-center justify-center bg-gray-200 select-none dark:bg-gray-600 ${(row < rowNum / 2 ? !(col % 2) : col % 2) ? 'triangle' : 'triangle-flip'}`}
      style={{
        ...cardStyle,
        transitionDuration: info.duration + 's',
        transform: `translate(${info.x}px, ${info.y}px)`,
      }}
      {...onTouchFn}
    >
      {children}
    </div>
  );
}
