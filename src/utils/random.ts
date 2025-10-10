/** 生成随机字符串 */
export const randomStr = (v?: string | number) =>
  `${v !== void 0 ? v + "-" : ""}${Math.ceil(Math.random() * 10e5).toString(
    36
  )}-${Date.now().toString(36)}`;

/** 生成随机字母 isUppercase 是否大写 */
export function randomLetter(isUppercase = true) {
  return String.fromCharCode(
    Math.floor(Math.random() * 26) + (isUppercase ? 65 : 97)
  );
}

/** 随机生成十六进制颜色 */
export function getRandomHexColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
