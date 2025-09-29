export const formatTime = (v: number) => {
  const hour = Math.floor(v / 3600).toString().padStart(2, '0');
  const min = Math.floor(v / 60).toString().padStart(2, '0');
  const sec = (v % 60).toString().padStart(2, '0');
  let str = sec
  if (min !== '00') str = min + ':' + str;
  if (hour !== '00') str = hour + ':' + str;
  return str
}