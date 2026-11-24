import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { GameCard, Grid, SectionHead } from '@/components/Cards';
import { gameUrl, games, rating } from '@/content/games';
import styles from '../../pages.module.css';

const getGame = (slug: string) => games.find((g) => g.slug === slug);

export function generateStaticParams() {
	return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<'/games/[slug]'>): Promise<Metadata> {
	const game = getGame((await params).slug);
	return game ? { title: game.name, description: game.description.slice(0, 150) } : {};
}

const date = (iso: string) =>
	new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });

/** A 2016 game page: media left, title + green Play right, About below, badges, then more games */
export default async function GamePage({ params }: PageProps<'/games/[slug]'>) {
	const game = getGame((await params).slug);
	if (!game) notFound();

	const r = rating(game);
	const votes = game.upVotes + game.downVotes;
	const others = games.filter((g) => g.slug !== game.slug);

	return (
		<>
			<article className={`${styles.panel} ${styles.detail}`}>
				<div className={styles.media}>
					{game.screenshot ? (
						<Image
							src={game.screenshot.src}
							width={game.screenshot.width}
							height={game.screenshot.height}
							alt={game.screenshot.alt}
							priority
							sizes="(max-width: 900px) 100vw, 576px"
						/>
					) : (
						<div className={styles.mediaIcon}>
							<Image src={game.icon} width={512} height={512} alt="" className={styles.mediaBlur} sizes="576px" />
							<Image src={game.icon} width={512} height={512} alt={`${game.name} icon`} priority sizes="260px" />
						</div>
					)}
				</div>

				<div className={styles.side}>
					<h1>{game.name}</h1>
					<p className={styles.by}>
						By <span>{game.creator.name}</span>
						{game.creator.type === 'Group' && ' (group)'}
					</p>
					<hr />
					<a className={`btn-green ${styles.bigPlay}`} href={gameUrl(game)} target="_blank" rel="noopener noreferrer">
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M7 4.5v15l12-7.5z" />
						</svg>
						<span className="sr-only">Play {game.name} on Roblox</span>
					</a>
					<div className={styles.voteRow}>
						<span className={styles.fav} title="Favorites">
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
							</svg>
							{game.favorites}
						</span>
						<div className={styles.votes}>
							<div className={styles.voteBar} role="img" aria-label={r === null ? 'No votes yet' : `${r}% liked`}>
								<span style={{ width: votes ? `${(game.upVotes / votes) * 100}%` : '0%' }} />
							</div>
							<div className={styles.voteNums}>
								<span>
									<svg viewBox="0 0 24 24" aria-hidden="true">
										<path d="M2 10h4v11H2zM8 21h9.5a2 2 0 0 0 2-1.6l1.4-7A2 2 0 0 0 19 10h-5l.8-4.2A2 2 0 0 0 12.9 3L8 10z" />
									</svg>
									{game.upVotes}
								</span>
								<span>
									{game.downVotes}
									<svg viewBox="0 0 24 24" aria-hidden="true" className={styles.down}>
										<path d="M2 10h4v11H2zM8 21h9.5a2 2 0 0 0 2-1.6l1.4-7A2 2 0 0 0 19 10h-5l.8-4.2A2 2 0 0 0 12.9 3L8 10z" />
									</svg>
								</span>
							</div>
						</div>
					</div>
					<p className={styles.role}>{game.role}</p>
				</div>
			</article>

			<section className={styles.panel}>
				<div className={styles.tabs} role="presentation">
					<span aria-current="true">About</span>
				</div>
				<div className={styles.about}>
					<h2>Description</h2>
					<p className={styles.description}>{game.description}</p>
					<dl className={styles.gameStats}>
						<div>
							<dt>Visits</dt>
							<dd>{game.visits.toLocaleString('en-US')}</dd>
						</div>
						<div>
							<dt>Favorites</dt>
							<dd>{game.favorites}</dd>
						</div>
						<div>
							<dt>Created</dt>
							<dd>{date(game.created)}</dd>
						</div>
						<div>
							<dt>Updated</dt>
							<dd>{date(game.updated)}</dd>
						</div>
						<div>
							<dt>Max Players</dt>
							<dd>{game.maxPlayers}</dd>
						</div>
						<div>
							<dt>Genre</dt>
							<dd>All Genres</dd>
						</div>
					</dl>

					{game.badges.length > 0 && (
						<>
							<h2>Game Badges</h2>
							<ul className={styles.badges}>
								{game.badges.map((b) => (
									<li key={b.name}>
										<span className={styles.badgeIcon} aria-hidden="true">
											<svg viewBox="0 0 32 32">
												<path d="M16 3 27 8v8c0 7-5 11-11 13C10 27 5 23 5 16V8z" />
												<path d="m11 16 3.5 3.5L21 13" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</span>
										<span className={styles.badgeName}>{b.name}</span>
										<span className={styles.badgeStat}>
											Won by <strong>{b.awarded}</strong> players
										</span>
									</li>
								))}
							</ul>
						</>
					)}
				</div>
			</section>

			<section>
				<SectionHead title="More Games" href="/games" />
				<Grid>
					{others.map((g, i) => (
						<GameCard key={g.slug} game={g} i={i} />
					))}
				</Grid>
			</section>
		</>
	);
}
