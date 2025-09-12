'use client';

import { useContext, useMemo, useRef } from 'react';
import { TriangleHuarongRoadItemProps } from './type';
import { useDebounceFn, useSetState } from 'ahooks';
import { HuarongRoadCtx } from './context';
import useTouchEvent from '@/hooks/useTouchEvent';
import './index.css';
import { checkDirectionXY, range } from '@/utils/compute';
import  { checkRoadDirection } from './utils';
import type { Direction } from '@/utils/tool';

export default function HuarongItem(props: TriangleHuarongRoadItemProps) {
  const { index, children, row, col, value, ...ret } = props as Required<TriangleHuarongRoadItemProps>;
  const { gap, gridSize, gridArr, data, rowNum, colNum, startLeftArr, onChangeGrid } = useContext(HuarongRoadCtx);

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
  const isVerticalRef = useRef<boolean>(void 0);

    /** 当前可移动的方向 */
  const moveDirection = useMemo(
    () => checkRoadDirection(gridArr, info.rowNum, info.colNum),
    [gridArr, info.rowNum, info.colNum]
  );

  const { info: _info, onTouchFn } = useTouchEvent({
    onTouchStart() {
      isVerticalRef.current = void 0;
      setInfo({ startX: info.x, startY: info.y, duration: 0 });
    },
    onTouchMove() {
      const { directionX, directionY } = checkDirectionXY(
        _info.deltaX,
        _info.deltaY
      );
      if (!moveDirection) return;
      if (
        moveDirection[directionX as Direction] &&
        isVerticalRef.current !== true
      ) {
        if (isVerticalRef.current === void 0) {
          isVerticalRef.current = false;
        }
        const rangeVal =
          (gridSize + gap) * moveDirection[directionX as Direction];
        setInfo({ x: range(_info.deltaX, -rangeVal, rangeVal) + info.startX });
      } else if (
        moveDirection[directionY as Direction] &&
        isVerticalRef.current !== false
      ) {
        if (isVerticalRef.current === void 0) {
          isVerticalRef.current = true;
        }
        const rangeVal =
          (gridSize + gap) * moveDirection[directionY as Direction];
        setInfo({ y: range(_info.deltaY, -rangeVal, rangeVal) + info.startY });
      }
    },
    onTouchEnd() {
      let isVertical = false;
      let diff = info.x - info.startX;
      if (!diff) {
        diff = info.y - info.startY;
        isVertical = true;
      }
      // 检测当前方向上的移动
      if (!diff) return;
      let { startX: x, startY: y, rowNum, colNum } = info;
      const size = gridSize + gap;
      // 发生改变
      if (Math.abs(diff) >= size / 2) {
        const moveTwoSize = Math.abs(diff) >= size * 1.5 ? 2 : 1;
        const xy = (diff > 0 ? 1 : -1) * moveTwoSize;
        let direction: Direction = 1;
        if (isVertical) {
          y += size * xy;
          direction = diff > 0 ? 3 : 1;
        } else {
          x += size * xy;
          direction = diff > 0 ? 2 : 4;
        }
        switch (direction) {
          case 1:
            rowNum -= moveTwoSize;
            break;
          case 2:
            colNum += moveTwoSize;
            break;
          case 3:
            rowNum += moveTwoSize;
            break;
          case 4:
            colNum -= moveTwoSize;
            break;
        }
        onChangeGrid({
          p: { row: info.rowNum, col: info.colNum },
          target: { row: rowNum, col: colNum },
          index,
          direction,
        });
      }
      setInfo({ x, y, duration: 0.4, rowNum, colNum });
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
      className={`absolute flex items-center justify-center transition-all bg-gray-200 select-none dark:bg-gray-600 ${(row < rowNum / 2 ? !(col % 2) : col % 2) ? 'triangle' : 'triangle-flip'}`}
      style={{
        ...cardStyle,
        transitionDuration: info.duration + 's',
        transform: `translate(${info.x}px, ${info.y}px)`,
      }}
      {...onTouchFn}
    >
      {value ? children : null}
    </div>
  );
}
