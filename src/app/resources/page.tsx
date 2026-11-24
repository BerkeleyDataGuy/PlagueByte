import type { Metadata } from 'next';
import Image from 'next/image';
import { SectionHead } from '@/components/Cards';
import { luauLines as luau, packages, repoUrl } from '@/content/features';
import { gameUrl, games } from '@/content/games';
import { site } from '@/content/site';
import styles from '../pages.module.css';

export const metadata: Metadata = { title: 'Resources' };


export default function ResourcesPage() {
	return (
		<>
			<section>
				<SectionHead title="Resources" />
				<ul className={styles.rows}>
					<li className={styles.panel}>
						<span className={styles.rowIcon} aria-hidden="true">
							<svg viewBox="0 0 24 24">
								<path d="M12 2 21 7v10l-9 5-9-5V7zM3 7l9 5 9-5M12 12v10" />
							</svg>
						</span>
						<div>
							<h3>Korblox Builds</h3>
							<p className={styles.rowMeta}>GitHub · MIT license · {packages.length} packages · {luau.toLocaleString('en-US')} lines of Luau</p>
							<p>
								The source for every package on the Features tab (Spearhead systems aside). Most packages ship as an .rbxm plus Rojo project files,
								with a README inside that walks through the install step by step.
							</p>
						</div>
						<a className="btn" href={repoUrl} target="_blank" rel="noopener noreferrer">
							Open
						</a>
					</li>
					<li className={styles.panel}>
						<Image src={site.headshot} width={150} height={150} alt="" className={styles.rowHead} />
						<div>
							<h3>{site.name} on Roblox</h3>
							<p className={styles.rowMeta}>Profile · joined {site.joined}</p>
							<p>Games, groups and badges, straight from the source.</p>
						</div>
						<a className="btn" href={site.profile} target="_blank" rel="noopener noreferrer">
							Open
						</a>
					</li>
				</ul>
			</section>

			<section>
				<SectionHead title="Game links" />
				<ul className={styles.rows}>
					{games.map((g) => (
						<li key={g.slug} className={styles.panel}>
							<Image src={g.icon} width={512} height={512} alt="" className={styles.rowHead} sizes="56px" />
							<div>
								<h3>{g.name}</h3>
								<p className={styles.rowMeta}>
									{g.role} · {g.visits.toLocaleString('en-US')} visits
								</p>
							</div>
							<a className="btn-green" href={gameUrl(g)} target="_blank" rel="noopener noreferrer">
								Play
							</a>
						</li>
					))}
				</ul>
			</section>

			<section>
				<SectionHead title="Installing a package" />
				<ol className={`${styles.panel} ${styles.steps}`}>
					<li>
						<strong>Drop the .rbxm into ServerStorage.</strong> Scripts don’t run there, so nothing starts before its
						modules exist.
					</li>
					<li>
						<strong>Move each folder into the service it’s named after.</strong> A folder called ReplicatedStorage is a
						signpost: move what’s inside it, not the folder itself.
					</li>
					<li>
						<strong>Tune it in the config.</strong> In most packages, every number that changes the feel lives in one commented Config
						module in ReplicatedStorage.
					</li>
					<li>
						<strong>Give credit.</strong> The packages are free under the MIT license; the READMEs ask you to credit
						PlagueByte.
					</li>
				</ol>
			</section>
		</>
	);
}
