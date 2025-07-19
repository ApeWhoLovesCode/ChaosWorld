/** 判断是移动端还是pc端 */
export const isMobile = () => {
  // 为了兼容服务端对客户端组件的预渲染
  if(typeof window === 'undefined' || typeof navigator === 'undefined') return false
  return !!navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
  )
}
