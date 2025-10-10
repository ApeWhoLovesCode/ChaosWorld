import { cn } from '@/lib/utils';
import './index.scss';

export default function TitleFall({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={cn('title-fall', className)}>
      {title.split('').map((letter, i) => (
        <span
          className={`item`}
          key={letter + '-' + i}
          style={{ animationDelay: Math.random() * 200 * i + 'ms' }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}
