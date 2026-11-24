import Image from 'next/image';
import Link from 'next/link';
import { FeatureCard, GameCard, Grid, SectionHead } from '@/components/Cards';
import { Code } from '@/components/Code';
import { features, luauLines as luau, packages, repoUrl } from '@/content/features';
import { gameUrl, games } from '@/content/games';
import { site } from '@/content/site';
import styles from './pages.module.css';

const visits = games.reduce((n, g) => n + g.visits, 0);
const featured = games[0];
const spotlight = features.find((f) => f.slug === 'random-artillery')!;

export default function Home() {
	return (
		<>
			<section className={`${styles.profile} ${styles.panel}`} aria-label="Profile">
				<div className={styles.avatarBox}>
					<Image src={site.avatar} width={420} height={420} alt="PlagueByte’s Roblox avatar" priority sizes="220px" />
				</div>
				<div className={styles.profileText}>
					<h1>{site.name}</h1>
					<p className={styles.handle}>@{site.name} · Roblox developer since {site.joined}</p>
					<blockquote className={styles.motto}>“{site.motto}”</blockquote>
					<dl className={styles.stats}>
						<div>
							<dt>Systems</dt>
							<dd>{features.length}</dd>
						</div>
						<div>
							<dt>Games</dt>
							<dd>{games.length}</dd>
						</div>
						<div>
							<dt>Place Visits</dt>
							<dd>{visits.toLocaleString('en-US')}</dd>
						</div>
						<div>
							<dt>Lines of Luau</dt>
							<dd>{luau.toLocaleString('en-US')}</dd>
						</div>
					</dl>
					<div className={styles.btnRow}>
						<a className="btn" href={site.profile} target="_blank" rel="noopener noreferrer">
							Roblox Profile
						</a>
						<a className={styles.ghostBtn} href={site.github} target="_blank" rel="noopener noreferrer">
							Korblox Builds on GitHub
						</a>
					</div>
				</div>
			</section>

			<section className={styles.banner} aria-label="Featured game">
				<Image src={featured.icon} width={512} height={512} alt="" className={styles.bannerArt} sizes="200px" />
				<div className={styles.bannerText}>
					<p className={styles.kicker}>NEW · UNOFFICIAL TELLUS KORBLOX GAME</p>
					<h2>{featured.name}</h2>
					<p>Under the guise of a whiteout, Korblox Confederacy operatives raid a Bloxian Commonwealth Garrison HQ.</p>
				</div>
				<div className={styles.bannerCta}>
					<a className={`btn-green ${styles.play}`} href={gameUrl(featured)} target="_blank" rel="noopener noreferrer">
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M7 4.5v15l12-7.5z" />
						</svg>
						Play
					</a>
					<Link href={`/games/${featured.slug}`}>Game details</Link>
				</div>
			</section>

			<section>
				<SectionHead title="Games" href="/games" count={games.length} />
				<Grid>
					{games.map((g, i) => (
						<GameCard key={g.slug} game={g} i={i} />
					))}
				</Grid>
			</section>

			<section>
				<SectionHead title="Features" href="/features" count={features.length} />
				<Grid>
					{features.slice(0, 6).map((f, i) => (
						<FeatureCard key={f.slug} feature={f} i={i} />
					))}
				</Grid>
			</section>

			<section className={`${styles.spotlight} ${styles.panel}`} aria-label="From the source">
				<div className={styles.spotText}>
					<p className={styles.kicker}>FROM THE SOURCE</p>
					<h2>{spotlight.name}</h2>
					<p>{spotlight.summary[1]}</p>
					<p className={styles.muted}>
						Most Korblox Builds packages keep their tuning in one commented config file, so you retune the feel
						without touching the logic.
					</p>
					<div className={styles.btnRow}>
						<Link className="btn" href={`/features/${spotlight.slug}`}>
							See the package
						</Link>
						<a className={styles.ghostBtn} href={repoUrl} target="_blank" rel="noopener noreferrer">
							All {packages.length} on GitHub
						</a>
					</div>
				</div>
				<Code code={spotlight.code!} file={spotlight.codeFile!} />
			</section>
		</>
	);
}
