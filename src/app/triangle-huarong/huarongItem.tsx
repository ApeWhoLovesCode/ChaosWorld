'use client';

import { useContext, useEffect, useMemo, useRef } from 'react';
import { TriangleHuarongRoadItemProps } from './type';
import { useSetState } from 'ahooks';
import { HuarongRoadCtx } from './context';
import useTouchEvent from '@/hooks/useTouchEvent';
import './index.css';
import { checkDirectionVal, checkDirectionXY, DirectionType, range } from '@/utils/compute';
import type { Direction } from '@/utils/tool';

export default function HuarongItem(props: TriangleHuarongRoadItemProps) {
  const { index, children, row, col, value, ...ret } = props as Required<TriangleHuarongRoadItemProps>;
  const { gap, gridSize, zeroInfo, gridArr, data, rowNum, colNum, startLeftArr, onChangeGrid } = useContext(HuarongRoadCtx);

  /** 是否为正三角形 △ */
  const isTriangle = (row < rowNum / 2 ? !(col % 2) : col % 2);

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

  useEffect(() => {
    setInfo({ rowNum: row, colNum: col });
  }, [row, col]);

  /** 当前可移动的方向 */
  const moveDirection = useMemo(
    () => {
      const canMoveItem = zeroInfo.canMoveArr.find((v) => v.row === info.rowNum && v.col === info.colNum)
      if(!canMoveItem) return 0
      return canMoveItem.d
    },
    [zeroInfo, info.rowNum, info.colNum],
  );

  const { info: _info, onTouchFn } = useTouchEvent({
    onTouchStart() {
      isVerticalRef.current = void 0;
      setInfo({ startX: info.x, startY: info.y, duration: 0 });
    },
    onTouchMove() {
      const { directionX, directionY } = checkDirectionXY(_info.deltaX, _info.deltaY);
      const gridW = gridSize + gap
      if (directionX === moveDirection) {
        setInfo({ x: range(_info.deltaX, -gridW, gridW) + info.startX });
      } else if (directionY === moveDirection) {
        setInfo({ y: range(_info.deltaY, -gridW, gridW) + info.startY});
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
      console.log('x, y: ', x, y);
      setInfo({ x, y, duration: 0.4, rowNum, colNum });
    },
    isDisable: {
      all: !moveDirection,
    },
    isStopPropagation: true,
  });

  const cardStyle = useMemo(() => {
    const handleGap = (v: number) => (0 < v ? v * gap : 0);
    const startLeft = startLeftArr[row] || 0;
    return {
      width: gridSize,
      height: gridSize,
      top: gridSize * row + handleGap(row),
      left: startLeft + (gridSize / 2) * col + handleGap(col),
    };
  }, [gridSize, gap]);

  return (
    <div
      className={`absolute select-none`}
      style={{
        ...cardStyle,
        transitionDuration: info.duration + 's',
        transform: `translate(${info.x}px, ${info.y}px)`,
      }}
      {...onTouchFn}
    >
      {value ? (
        <div
          className={`flex size-full items-center justify-center bg-gray-200 transition-all select-none dark:bg-gray-600 ${isTriangle ? 'triangle' : 'triangle-flip'}`}
        >
          {value ? children : null}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
