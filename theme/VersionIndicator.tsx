
import { useLocation } from '@rspress/core/runtime';
import { SUBSITES_CONFIG } from '@site/shared-route-config';

export function VersionIndicator() {
  const { pathname } = useLocation();
  const homepagePaths = SUBSITES_CONFIG.flatMap(site => [
    site.home,
    site.home.endsWith('/') ? site.home.slice(0, -1) : `${site.home}/`
  ]);
  const isHomepage = homepagePaths.includes(pathname);
  
  return (
    !isHomepage && (
      <a className="version-indicator" href="/versions">
        3.4
      </a>
    )
  );
}