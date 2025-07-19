"use client";

import useTouchEvent from "@/hooks/useTouchEvent";
import { useRef, useState } from "react";

export default function MoveBtn() {
  const touchRef = useRef({
    startX: 0,
    startY: 0,
  });
  const [info, setInfo] = useState({
    x: 0,
    y: 0,
  });
  const { info: tInfo, onTouchFn } = useTouchEvent({
    onTouchStart: () => {
      touchRef.current.startX = info.x;
      touchRef.current.startY = info.y;
    },
    onTouchMove: () => {
      const x = tInfo.deltaX + touchRef.current.startX;
      const y = tInfo.deltaY + touchRef.current.startY;
      setInfo({ x, y });
    },
    onTouchEnd: () => {
      let x = tInfo.deltaX + touchRef.current.startX;
      let y = tInfo.deltaY + touchRef.current.startY;
      setInfo({ x, y });
    },
  });
  return (
    <div>
      <div
        className="bg-gray-400 p-4 w-fit select-none dark:bg-blue-200"
        style={{
          transform: `translate(${info.x}px, ${info.y}px)`,
        }}
        {...onTouchFn}
      >
        move
      </div>
    </div>
  );
}
