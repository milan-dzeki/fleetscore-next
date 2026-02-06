import ROUTE_PATHS from '@/configs/routePaths';
import type { LngParamsType } from '@/types/props/common';
import Link from 'next/link';

function HomePage ({ params: { lng } }: LngParamsType) {
  return (
    <main>
      <Link href={`/${lng}${ROUTE_PATHS.ORGANISATIONS.root}`}>ORGS</Link>
      
      <Link href={`/${lng}${ROUTE_PATHS.ORGANISATIONS.create}`}>ORGS create</Link>
    </main>
  );
}

export default HomePage;