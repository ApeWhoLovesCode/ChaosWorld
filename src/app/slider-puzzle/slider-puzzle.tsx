import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useDebounceFn, useSetState } from "ahooks";
import useMergeProps from "@/hooks/useMergeProps";
import { randomLetter } from "@/utils/random";
import { createTwoArray } from "@/utils/compute";
import { isMobile } from "@/utils/handleDom";
import { cn } from "@/lib/utils";
import { GridPosition, SliderPuzzleInstance, SliderPuzzleProps } from "./type";
import { SliderPuzzleCtx } from "./context";
import { classPrefix } from "./config";
import { isPuzzleSolved, randomNumberArray } from "./utils";
import SliderPuzzleItem from "./slider-puzzle-item";
import SliderPuzzleCanvas from "./slider-puzzle-canvas";

const defaultProps = {
  size: 3,
  listLength: 0,
  gap: 2,
  fillPuzzleItemBackground: "#3e3e3e",
};

const SliderPuzzle = forwardRef<SliderPuzzleInstance, SliderPuzzleProps>(
  (comProps, ref) => {
    const props = useMergeProps<SliderPuzzleProps, keyof typeof defaultProps>(
      comProps,
      defaultProps
    );
    const {
      listLength,
      isGameMode,
      background,
      size,
      gap,
      fillPuzzleItemBackground,
      children,
      onComplete,
      onResize,
      ...ret
    } = props;
    const areaRef = useRef<HTMLDivElement>(null);
    const letter = useRef(randomLetter());
    const [ctxState, setCtxState] = useSetState({
      initSpaceIndex: 0,
      grid: {
        w: 100,
        h: 100,
      },
    });
    /** 当前的格子的二维数组信息 */
    const [gridArr, setGridArr] = useState<number[][]>();
    /** 拼图块的位置随机数组 */
    const [puzzleGridArr, setPuzzleGridArr] = useState<number[]>();
    const [isReset, setIsReset] = useState(false);

    const { run: getCardInfo } = useDebounceFn(
      () => {
        const cardWrap = areaRef.current;
        const w = ((cardWrap?.clientWidth ?? 0) - (size - 1) * gap) / size;
        const h = ((cardWrap?.clientHeight ?? 0) - (size - 1) * gap) / size;
        setCtxState({
          grid: { w, h },
        });
        if (w !== ctxState.grid.w || h !== ctxState.grid.h) {
          onResize?.({ w, h });
        }
      },
      { wait: 100 }
    );

    const init = () => {
      getCardInfo();
      initPuzzle();
    };

    useEffect(() => {
      init();
      if (!isMobile()) window.addEventListener("resize", getCardInfo);
      return () => {
        if (!isMobile()) window.removeEventListener("resize", getCardInfo);
      };
    }, [listLength, size, gap]);

    /** 初始化拼图 */
    const initPuzzle = () => {
      const total = size * size;
      const randomArr = randomNumberArray(size);
      const initSpaceIndex = randomArr.findIndex((v) => v === total);
      const nullRow = Math.floor(initSpaceIndex / size),
        nullCol = initSpaceIndex % size;
      setPuzzleGridArr(randomArr);
      setGridArr(
        createTwoArray(size, size, (rowNum, colNum) =>
          rowNum === nullRow && nullCol === colNum
            ? 0
            : randomArr[Math.floor(rowNum * size + colNum)]
        )
      );
      setCtxState({ initSpaceIndex });
    };

    const onChangeGrid = (p: GridPosition, pPre: GridPosition) => {
      [gridArr![p.row][p.col], gridArr![pPre.row][pPre.col]] = [
        gridArr![pPre.row][pPre.col],
        gridArr![p.row][p.col],
      ];
      if (isPuzzleSolved(gridArr!)) {
        onComplete?.();
      }
      setGridArr([...gridArr!]);
    };

    const reset = () => {
      initPuzzle();
      letter.current = randomLetter();
      setIsReset((v) => !v);
    };

    const wrapStyle = useMemo(
      () => ({
        padding: gap + "px",
        background,
      }),
      [gap, background]
    );

    useImperativeHandle(ref, () => ({
      reset,
    }));

    const renderChildren = () => {
      const hasNum =
        listLength ?? Object.values(children?.valueOf() ?? {}).length;
      if (size * size - 1 - hasNum <= 0) return children;
      const fillArr = [];
      for (let i = hasNum; i < size * size - 1; i++) {
        fillArr.push(
          <SliderPuzzleItem
            key={i}
            index={i}
            style={{
              width: ctxState.grid.w + "px",
              height: ctxState.grid.h + "px",
              background: fillPuzzleItemBackground,
            }}
          >
            <SliderPuzzleCanvas index={i} />
          </SliderPuzzleItem>
        );
      }
      return (
        <>
          {children}
          {fillArr}
        </>
      );
    };

    return (
      <SliderPuzzleCtx.Provider
        value={{
          ...ctxState,
          size,
          gridArr,
          puzzleGridArr,
          letter: letter.current,
          isReset,
          gap,
          isGameMode,
          ...ret,
          onChangeGrid,
        }}
      >
        <div className={cn(`${classPrefix}`, ret.className)} style={{...wrapStyle, ...ret.style}}>
          <div ref={areaRef} className={`${classPrefix}-area`}>{renderChildren()}</div>
        </div>
      </SliderPuzzleCtx.Provider>
    );
  }
);

export default SliderPuzzle;
