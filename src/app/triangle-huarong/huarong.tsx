'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { TriangleHuarongRoadProps } from './type';
import { useDebounceFn, useSetState } from 'ahooks';
import HuarongItem from './huarongItem';
import useMergeProps from '@/hooks/useMergeProps';
import { HuarongRoadCtx, onChangeGridParams } from './context';
import { checkToWin } from './utils';

const defaultProps: TriangleHuarongRoadProps = {
  rowNum: 4,
  colNum: 5,
  gap: 2,
};
type RequireType = keyof typeof defaultProps;

export default function Huarong(comProps: TriangleHuarongRoadProps) {
  const props = useMergeProps<TriangleHuarongRoadProps, RequireType>(comProps, defaultProps);
  const { gap, width, data, rowNum, colNum, onComplete, onResize, children, ...ret } = props;
  const huarongRef = useRef<HTMLDivElement>(null);
  const total = useRef(0)
  const [gridArr, setGridArr] = useState<number[][]>([]);
  const [state, setState] = useSetState({
    height: 100,
    /** 每一个格子的大小 */
    gridSize: 40,
    /** 索引对应的列表 */
    data: [] as number[][],
  });

  useEffect(() => {
    const randomC = Math.floor(Math.random() * rowNum * colNum)
    let i = 0;
    const mid = rowNum / 2
    let addCount = 0;
    const newData = Array.from({ length: rowNum }).map((_, rowI) => {
      const arr: number[] = []
      for(let j = 0; j < colNum + addCount; j++) {
        arr.push(i !== randomC ? 1 : 0)
        i++
      }
      if(rowI < mid - 1) {
        addCount += 2;
      } else if (rowI > mid - 1) {
        addCount -= 2;
      }
      return arr
    });
    total.current = rowNum * colNum
    // console.log('newData: ', newData);
    setGridArr(newData)
    setState({data: newData});
  }, [rowNum, colNum]);

  const onChangeGrid = ({p, target, direction, index}: onChangeGridParams) => {
    function exChangeVal(row: number, col: number, row2: number, col2: number) {
      [gridArr[row][col], gridArr[row2][col2]] = [gridArr[row2][col2], gridArr[row][col]];
    }
    exChangeVal(p.row, p.col, target.row, target.col)
    if(checkToWin(gridArr)) {
      onComplete?.()
    }
    setGridArr([...gridArr])
  }

  const startLeftArr = useMemo(() => {
    const arr: number[] = []
    for(let i = 0; i < rowNum / 2; i++) {
      arr.unshift(state.gridSize / 2 * i)
    }
    for(let i = 0; i < rowNum / 2; i++) {
      arr.push(state.gridSize / 2 * i)
    }
    return arr
  }, [rowNum])

  const renderChildren = () => {
    const hasNum = Object.values(children?.valueOf() ?? {}).length;
    if (total.current - hasNum <= 0) return children;
    const fillArr: any[] = [];
    state.data.forEach((arr, row) => {
      arr.forEach((i, col) => {
        fillArr.push(
          <HuarongItem key={row + '-' + col} index={row * colNum + col} row={row} col={col} value={i}>
            {i}
          </HuarongItem>,
        );
      })
    })
    return (
      <>
        {children}
        {fillArr}
      </>
    );
  };

  return (
    <HuarongRoadCtx.Provider
      value={{
        gap,
        gridSize: state.gridSize,
        rowNum,
        colNum,
        startLeftArr,
        data,
        gridArr,
        onChangeGrid,
      }}
    >
      <div
        style={{
          padding: gap + 'px',
          width,
        }}
      >
        <div ref={huarongRef} className="relative" style={{ height: state.height + 'px' }}>
          {renderChildren()}
        </div>
      </div>
    </HuarongRoadCtx.Provider>
  );
}
