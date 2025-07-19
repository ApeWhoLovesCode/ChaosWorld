'use client';

import { useTheme } from "next-themes";

export default function ThemeBtn() {
  const { setTheme } = useTheme()
  return (
    <div className="flex gap-3">
      <button onClick={() => setTheme('light')}>light</button>
      <button onClick={() => setTheme('dark')}>dark</button>
      <button onClick={() => setTheme('system')}>system</button>
    </div>
  );
}
