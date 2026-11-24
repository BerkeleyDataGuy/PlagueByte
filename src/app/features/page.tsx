import type { Metadata } from 'next';
import { FeatureCard, Grid, SectionHead } from '@/components/Cards';
import { features, repoUrl, type Feature } from '@/content/features';
import styles from '../pages.module.css';

export const metadata: Metadata = { title: 'Features' };

const groups: Feature['group'][] = ['Gameplay', 'Movement', 'Environment', 'Tools', 'TREK add-on', 'Spearhead add-on', 'AI'];
const titles: Partial<Record<Feature['group'], string>> = {
	'TREK add-on': 'TREK add-ons',
	'Spearhead add-on': 'Spearhead add-ons',
	AI: 'AI battle system',
};

export default function FeaturesPage() {
	return (
		<>
			<section>
				<SectionHead title="Features" count={features.length} />
				<p className={styles.intro}>
					Korblox Builds: drop-in Luau systems, free and MIT licensed. Most install by dragging folders into the
					services they’re named after and keep their tuning in one config file. Spearhead systems live in the
					Spearhead place and aren’t published yet.{' '}
					<a href={repoUrl} target="_blank" rel="noopener noreferrer">
						Browse the repo
					</a>
					.
				</p>
			</section>
			{groups.map((g) => {
				const list = features.filter((f) => f.group === g);
				return (
					<section key={g}>
						<SectionHead title={titles[g] ?? g} count={list.length} />
						<Grid>
							{list.map((f, i) => (
								<FeatureCard key={f.slug} feature={f} i={i} />
							))}
						</Grid>
					</section>
				);
			})}
		</>
	);
}
