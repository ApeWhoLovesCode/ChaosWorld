import './index.scss';

export default function TitleScrollLine({children}: {
  children: string
}) {
  return (
    <div className="title-scroll-line text-xl py-1" style={{'--text-length': children.length} as React.CSSProperties}>
      <div className='flex items-center gap-4'>
        <div>{children}</div>
        <div className="round-icon">
          <div className="lhh-icon text-[1.3em] text-blue-500">
            <div className="lhh-icon-vertical"></div>
            <div className="lhh-icon-horizontal"></div>
            <div className="lhh-icon-vertical lhh-icon-vertical-r"></div>
          </div>
        </div>
      </div>
      <div className='bottom-line bg-blue-500'></div>
    </div>
  )
}