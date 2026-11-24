import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import type { Feature } from '@/content/features';
import { rating, type Game } from '@/content/games';
import styles from './Cards.module.css';

export const compact = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : String(n));

/** Section heading with the blue "See All" button, as on the 2016 home page */
export function SectionHead({ title, href, count }: { title: string; href?: string; count?: number }) {
	return (
		<div className={styles.head}>
			<h2>
				{title}
				{count !== undefined && <span className={styles.count}> ({count})</span>}
			</h2>
			{href && (
				<Link className="btn" href={href}>
					See All
				</Link>
			)}
		</div>
	);
}

export function Grid({ children }: { children: ReactNode }) {
	return <ul className={`${styles.grid} rise`}>{children}</ul>;
}

function ThumbsUp() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" className={styles.thumbIcon}>
			<path d="M2 10h4v11H2zM8 21h9.5a2 2 0 0 0 2-1.6l1.4-7A2 2 0 0 0 19 10h-5l.8-4.2A2 2 0 0 0 12.9 3L8 10z" />
		</svg>
	);
}

export function GameCard({ game, i = 0 }: { game: Game; i?: number }) {
	const r = rating(game);
	return (
		<li className={styles.card} style={{ '--i': i } as CSSProperties}>
			<Link href={`/games/${game.slug}`}>
				<Image className={styles.thumb} src={game.icon} width={512} height={512} alt="" sizes="(max-width: 640px) 45vw, 170px" />
				<span className={styles.title}>{game.name}</span>
				<span className={styles.meta}>{compact(game.visits)} Visits</span>
				<span className={styles.meta}>
					<ThumbsUp />
					{r === null ? '--' : `${r}%`}
				</span>
			</Link>
		</li>
	);
}

const tags: Partial<Record<Feature['group'], string>> = { 'TREK add-on': 'TREK', 'Spearhead add-on': 'SPEARHEAD', AI: 'AI' };

/** Thumbnail for a package: its image on the group colour, or the name when there is no image yet */
export function FeatureThumb({ feature, big = false }: { feature: Feature; big?: boolean }) {
	return (
		<span className={`${styles.featureThumb} ${big ? styles.big : ''}`} data-group={feature.group}>
			{feature.image ? (
				<Image className={styles.thumbImg} src={feature.image} fill alt="" sizes={big ? '420px' : '(max-width: 640px) 45vw, 170px'} />
			) : (
				<span className={styles.thumbName}>{feature.name}</span>
			)}
			<span className={styles.thumbTag}>{tags[feature.group] ?? 'LUAU'}</span>
		</span>
	);
}

export function FeatureCard({ feature, i = 0 }: { feature: Feature; i?: number }) {
	return (
		<li className={styles.card} style={{ '--i': i } as CSSProperties}>
			<Link href={`/features/${feature.slug}`}>
				<FeatureThumb feature={feature} />
				<span className={styles.title}>{feature.name}</span>
				<span className={styles.meta}>{feature.group}</span>
				<span className={styles.meta}>
					{feature.lines === undefined ? (
						'In development'
					) : (
						<>
							<span className={styles.free}>Free</span> · {feature.lines.toLocaleString('en-US')} lines
						</>
					)}
				</span>
			</Link>
		</li>
	);
}
