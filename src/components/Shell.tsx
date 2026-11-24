import Image from 'next/image';
import Link from 'next/link';
import { Suspense, type ReactNode } from 'react';
import { features, packages } from '@/content/features';
import { games } from '@/content/games';
import { nav, site } from '@/content/site';
import { Boombox } from './Boombox';
import { Items, LeftNav } from './LeftNav';
import { Search } from './Search';
import { Ads } from './Ads';
import styles from './Shell.module.css';

const totalVisits = games.reduce((n, g) => n + g.visits, 0);

const searchable = [
	...games.map((g) => ({ href: `/games/${g.slug}`, label: g.name, kind: 'Game' })),
	...features.map((f) => ({ href: `/features/${f.slug}`, label: f.name, kind: f.group })),
];

/** The 2016 frame: blue top bar, white left nav, grey page with skyscraper ads, footer, Boombox dock */
export function Shell({ children }: { children: ReactNode }) {
	return (
		<>
			<a className={styles.skipLink} href="#main">
				Skip to content
			</a>
			<header className={styles.topbar}>
				<Link href="/" className={styles.logo} aria-label={`${site.name} home`}>
					<Image src="/images/roblox-logo-2016.png" alt="ROBLOX" width={914} height={230} priority className={styles.logoImg} />
				</Link>
				<nav className={styles.topnav} aria-label="Main">
					{nav.slice(1).map((p) => (
						<Link key={p.href} href={p.href}>
							{p.label}
						</Link>
					))}
				</nav>
				<Search items={searchable} />
				<div className={styles.topRight}>
					<span className={styles.visits} title="Total visits across the games">
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
						</svg>
						{totalVisits.toLocaleString('en-US')}
						<span className="sr-only"> total visits</span>
					</span>
					<a className={styles.topLink} href={site.github} target="_blank" rel="noopener noreferrer">
						GitHub
					</a>
				</div>
			</header>

			<div className={styles.frame}>
				<aside className={styles.leftnav} aria-label="Profile and pages">
					<a className={styles.me} href={site.profile} target="_blank" rel="noopener noreferrer">
						<Image src={site.headshot} width={150} height={150} alt="" className={styles.meHead} />
						<span>{site.name}</span>
					</a>
					<Suspense fallback={<Items />}>
						<LeftNav />
					</Suspense>
					<a className="btn-green" href={site.github} target="_blank" rel="noopener noreferrer">
						Get Korblox Builds
					</a>
					<p className={styles.navNote}>{packages.length} free systems · MIT</p>
				</aside>

				<div className={styles.page}>
					<Ads side="left" />
					<main id="main" className={styles.main}>
						{children}
					</main>
					<Ads side="right" />
				</div>
			</div>

			<footer className={styles.footer}>
				<nav aria-label="Footer">
					{nav.map((p) => (
						<Link key={p.href} href={p.href}>
							{p.label}
						</Link>
					))}
					<a href={site.profile} target="_blank" rel="noopener noreferrer">
						Roblox Profile
					</a>
					<a href={site.github} target="_blank" rel="noopener noreferrer">
						GitHub
					</a>
				</nav>
				<p>
					©2026 {site.name}. A fan-made page in the style of the 2016 Roblox website, not affiliated with Roblox
					Corporation. Game numbers are a snapshot from Roblox’s public APIs. Music plays through Spotify’s embed.
				</p>
			</footer>

			<Boombox />
		</>
	);
}
