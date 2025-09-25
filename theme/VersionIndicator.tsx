import { useLocation } from '@rspress/core/runtime';
import { SUBSITES_CONFIG } from '@site/shared-route-config';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

import { withBase } from '@rspress/core/runtime';

export function VersionIndicator() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const homepagePaths = SUBSITES_CONFIG.flatMap((site) => [
    site.home,
    site.home.endsWith('/') ? site.home.slice(0, -1) : `${site.home}/`,
  ]);
  const isHomepage = homepagePaths.includes(pathname);

  // 版本列表数据
  const versions = ['next', '3.4', '3.5', '3.6', 'versions'];

  // 清理定时器
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  // 处理鼠标进入事件
  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setIsOpen(true);
  };

  // 处理鼠标离开事件
  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setIsOpen(false), 200);
    setHoverTimeout(timeout);
  };

  const changeVersion = (version: string) => {
    window.location.href = withBase(`/${version}`);
  };

  const displayVersion = withBase('').replace('/', '').replace('/', '');
  return (
    !isHomepage && (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <DropdownMenuTrigger asChild>
            <div className="version-indicator">
              {displayVersion}{' '}
              <ChevronDown className="sh-h-4 sh-w-4" strokeWidth={1.5} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="sh-w-28 sh-p-0" align="start">
            <div className="sh-p-2">
              {versions.map((version) => (
                <DropdownMenuItem
                  key={version}
                  className={`sh-w-full sh-justify-start ${version === displayVersion ? 'sh-bg-primary/10 sh-text-primary' : ''}`}
                  onClick={() => changeVersion(version)}
                >
                  {version}
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    )
  );
}
