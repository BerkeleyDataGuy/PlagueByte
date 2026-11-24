'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav } from '@/content/site';
import styles from './Shell.module.css';

const icons = [
	'M3 11 12 4l9 7M5 10v10h5v-6h4v6h5V10', // home
	'M6 9h12a3 3 0 0 1 3 3v3a2 2 0 0 1-3.5 1.3L15 14H9l-2.5 2.3A2 2 0 0 1 3 15v-3a3 3 0 0 1 3-3zM8 11v2M7 12h2M16 12h.01', // games
	'M12 3 20 7.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9', // features (package)
	'M5 4h10l4 4v12H5zM14 4v5h5M8 13h8M8 17h6', // resources
];

/** The 2016 left menu, with the current page highlighted */
export function LeftNav() {
	return <Items current={usePathname()} />;
}

/** Same list with nothing highlighted, shown while the URL resolves */
export function Items({ current }: { current?: string }) {
	const on = (href: string) => current !== undefined && (href === '/' ? current === '/' : current.startsWith(href));
	return (
		<nav aria-label="Pages">
			<ul className={styles.navList}>
				{nav.map((p, i) => (
					<li key={p.href}>
						<Link href={p.href} aria-current={on(p.href) ? 'page' : undefined}>
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<path d={icons[i]} />
							</svg>
							{p.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
