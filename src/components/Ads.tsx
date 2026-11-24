import Image from 'next/image';
import Link from 'next/link';
import { packages } from '@/content/features';
import { site } from '@/content/site';
import styles from './Shell.module.css';

/** 160x600 "user ads" on either side of the page, like the 2016 skyscrapers. Wide screens only. */
export function Ads({ side }: { side: 'left' | 'right' }) {
	return (
		<figure className={`${styles.adWrap} ${styles[side]}`}>
			{side === 'left' ? (
				<Link className={`${styles.ad} ${styles.adObsolete}`} href="/games/operation-obsolete-finale">
					<span className={styles.adSmall}>KORBLOX CONFEDERACY</span>
					<Image src="/images/games/obsolete-icon.png" width={512} height={512} alt="" sizes="140px" className={styles.adFlag} />
					<span className={styles.adBig}>OPERATION</span>
					<span className={styles.adBig}>OBSOLETE</span>
					<span className={styles.adFinale}>FINALE</span>
					<span className={styles.adSmall}>Raid the Garrison HQ under the whiteout. 5 to 7 players.</span>
					<span className={styles.adCta}>PLAY NOW</span>
				</Link>
			) : (
				<a className={`${styles.ad} ${styles.adBuilds}`} href={site.github} target="_blank" rel="noopener noreferrer">
					<span className={styles.adBig}>KORBLOX</span>
					<span className={styles.adBig}>BUILDS</span>
					<span className={styles.adSmall}>Tanks. Gunships. Artillery. Skis. Gas grenades.</span>
					<span className={styles.adTen}>{packages.length}</span>
					<span className={styles.adSmall}>drop-in Luau systems</span>
					<span className={styles.adFree}>FREE!!</span>
					<span className={styles.adCta}>GET THEM</span>
				</a>
			)}
			<figcaption>
				<span>ADVERTISEMENT</span>
				<span>Report</span>
			</figcaption>
		</figure>
	);
}
