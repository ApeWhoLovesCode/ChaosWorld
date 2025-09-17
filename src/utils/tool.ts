/** 方向 1:上 2:右 3:下 4:左 */
export type Direction = 1 | 2 | 3 | 4

/** 打乱数组 Fisher Yates shuffle 算法 */
export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}