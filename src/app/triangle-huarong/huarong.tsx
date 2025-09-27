'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CanMoveItem, TriangleDataItem, TriangleHuarongRoadProps } from './type';
import { useDebounceFn, useSetState } from 'ahooks';
import HuarongItem from './huarongItem';
import useMergeProps from '@/hooks/useMergeProps';
import { HuarongRoadCtx, onChangeGridParams } from './context';
import { isPuzzleSolved } from './utils';
import { isMobile } from '@/utils/handleDom';
import { Direction, shuffleArray } from '@/utils/tool';

const defaultProps: TriangleHuarongRoadProps = {
  rowNum: 4,
  colNum: 5,
  gap: 20,
  width: '100%',
};
type RequireType = keyof typeof defaultProps;

export default function Huarong(comProps: TriangleHuarongRoadProps) {
  const props = useMergeProps<TriangleHuarongRoadProps, RequireType>(comProps, defaultProps);
  const { gap, width, rowNum, colNum, isNotBg, onComplete, onResize, children, ...ret } = props;
  const huarongAreaRef = useRef<HTMLDivElement>(null);
  const huarongRef = useRef<HTMLDivElement>(null);
  const total = useRef(0);
  const [gridArr, setGridArr] = useState<number[][]>([]);
  const [state, setState] = useSetState({
    height: 100,
    /** 每一个格子的大小 */
    gridSize: 40,
    gap: gap,
    /** 索引对应的列表 */
    data: [] as number[][],
    zeroInfo: {
      row: 0,
      col: 0,
      canMoveArr: [] as CanMoveItem[],
    },
  });

  const { run: getCardInfo } = useDebounceFn(
    () => {
      const cardWrap = huarongAreaRef.current;
      const width = cardWrap?.clientWidth ?? 0;
      const gridSize = (width - gap * (colNum - 1)) / colNum;
      const height = gridSize * rowNum + gap * (rowNum - 1);
      setState({ gap: gridSize / 2, height, gridSize });
      if (state.gridSize !== gridSize) {
        onResize?.(gridSize);
      }
    },
    { wait: 100 },
  );

  useEffect(() => {
    getCardInfo();
    if (!isMobile()) window.addEventListener('resize', getCardInfo);
    return () => {
      if (!isMobile()) window.removeEventListener('resize', getCardInfo);
    };
  }, [gap]);

  /** 设置空格及其附近格子的属性 */
  const reSetCanMoveArr = (rowI: number, colI: number, data = state.data) => {
    const canMoveArr: CanMoveItem[] = [];
    /** 是否为正三角形 △ */
    const isTriangle = rowI < rowNum / 2 ? !(colI % 2) : colI % 2;
    const setMoveItem = (r: number, c: number, d: Direction) => {
      if (!data[r]?.[c]) return;
      canMoveArr.push({ row: r, col: c, d });
    };
    setMoveItem(rowI, colI + 1, 4);
    setMoveItem(rowI, colI - 1, 2);
    const newRowI = isTriangle ? rowI + 1 : rowI - 1;
    if (data[newRowI]) {
      let colAddV = data[newRowI].length - data[rowI].length;
      if (colAddV !== 0) {
        colAddV += colAddV > 0 ? -1 : 1;
      }
      setMoveItem(newRowI, colI + colAddV, isTriangle ? 1 : 3);
    }
    return canMoveArr;
  };

  const getRandomC = () => Math.floor(Math.random() * rowNum * colNum);;

  const initData = () => {
    let addCount = 0;
    let i = 0;
    const mid = rowNum / 2;
    const valArr: number[] = []
    Array.from({ length: rowNum }).map((_, rowI) => {
      for (let colI = 0; colI < colNum + addCount; colI++) {
        valArr.push(i)
        i++;
      }
      if (rowI < mid - 1) addCount += 2;
      else if (rowI > mid - 1) addCount -= 2;
    });
    total.current = i;
    if(props.isReadyComplete) {
      valArr.splice(0, 1);
      valArr.splice(total.current - 2, 0, 0);
    } else {
      shuffleArray(valArr)
    }
    console.log('valArr: ', valArr);
    addCount = 0;
    i = 0;
    let zeroRow = 0,
      zeroCol = 0;
    const newData = Array.from({ length: rowNum }).map((_, rowI) => {
      const arr: number[] = [];
      for (let colI = 0; colI < colNum + addCount; colI++) {
        arr.push(valArr[i]);
        if (valArr[i] === 0) {
          zeroRow = rowI;
          zeroCol = colI;
        }
        i++;
      }
      if (rowI < mid - 1) {
        addCount += 2;
      } else if (rowI > mid - 1) {
        addCount -= 2;
      }
      return arr;
    });
    console.log('newData: ', newData);
    setGridArr(structuredClone(newData));
    setState({ data: structuredClone(newData) });
    setState({ zeroInfo: { row: zeroRow, col: zeroCol, canMoveArr: reSetCanMoveArr(zeroRow, zeroCol, newData) } });
  };

  useEffect(() => {
    initData();
  }, [rowNum, colNum]);

  const onChangeGrid = ({ p, target, direction, index }: onChangeGridParams) => {
    function exChangeVal(row: number, col: number, row2: number, col2: number) {
      [gridArr[row][col], gridArr[row2][col2]] = [gridArr[row2][col2], gridArr[row][col]];
    }
    exChangeVal(p.row, p.col, target.row, target.col);
    setGridArr([...gridArr]);
    setState({
      zeroInfo: {
        row: p.row,
        col: p.col,
        canMoveArr: reSetCanMoveArr(p.row, p.col, gridArr),
      },
    });
    if (isPuzzleSolved(gridArr)) {
      // 延迟一下等待动画结束
      setTimeout(() => {
        onComplete?.();
      }, 400);
    }
  };

  const startLeftArr = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < rowNum / 2; i++) {
      arr.unshift((state.gridSize / 2) * i + state.gap * i);
    }
    for (let i = 0; i < rowNum / 2; i++) {
      arr.push((state.gridSize / 2) * i + state.gap * i);
    }
    return arr;
  }, [rowNum, state.gap, state.gridSize]);

  const renderChildren = () => {
    const hasNum = Object.values(children?.valueOf() ?? {}).length;
    if (total.current - hasNum <= 0) return children;
    const fillArr: any[] = [];
    state.data.forEach((arr, row) => {
      arr.forEach((v, col) => {
        const index = row * colNum + col;
        fillArr.push(
          <HuarongItem key={row + '-' + col} index={index} row={row} col={col} value={v}>
            {v}
          </HuarongItem>,
        );
      });
    });
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
        gap: state.gap,
        gridSize: state.gridSize,
        zeroInfo: state.zeroInfo,
        data: state.data,
        rowNum,
        colNum,
        isNotBg,
        startLeftArr,
        gridArr,
        onChangeGrid,
      }}
    >
      <div
        ref={huarongAreaRef}
        style={{
          // padding: gap + 'px',
          width,
        }}
      >
        <div ref={huarongRef} className="relative w-full" style={{ height: state.height + 'px' }}>
          {renderChildren()}
        </div>
      </div>
    </HuarongRoadCtx.Provider>
  );
}
