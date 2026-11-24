import type { Metadata } from 'next';
import { GameCard, Grid, SectionHead } from '@/components/Cards';
import { games } from '@/content/games';
import styles from '../pages.module.css';

export const metadata: Metadata = { title: 'Games' };

export default function GamesPage() {
	return (
		<section>
			<SectionHead title="Games" count={games.length} />
			<p className={styles.intro}>
				Places I’ve made or worked on. Visit and vote counts are from Roblox, as of November 2026.
			</p>
			<Grid>
				{games.map((g, i) => (
					<GameCard key={g.slug} game={g} i={i} />
				))}
			</Grid>
		</section>
	);
}
