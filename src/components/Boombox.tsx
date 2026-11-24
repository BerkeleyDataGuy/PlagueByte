'use client';

import { useEffect, useState } from 'react';
import { MediaPlayer } from './MediaPlayer';
import styles from './Shell.module.css';

/**
 * Bottom-right dock in the spot of 2016's "Chat & Party" bar. The player stays mounted while folded,
 * so the music keeps going between pages and when the panel is closed.
 */
export function Boombox() {
	const [open, setOpen] = useState(false);
	const [song, setSong] = useState<string | null>(null);

	useEffect(() => {
		const onTrack = (e: Event) => {
			const { title, artist } = (e as CustomEvent<{ title: string; artist: string }>).detail;
			setSong(`${title} - ${artist}`);
		};
		window.addEventListener('boombox:nowplaying', onTrack);
		return () => window.removeEventListener('boombox:nowplaying', onTrack);
	}, []);

	return (
		<div className={styles.dock} data-open={open || undefined}>
			<section id="boombox-panel" className={styles.dockPanel} aria-label="Boombox" inert={!open}>
				<MediaPlayer />
			</section>
			<button type="button" className={styles.dockBar} aria-expanded={open} aria-controls="boombox-panel" onClick={() => setOpen((o) => !o)}>
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d="M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
				</svg>
				<span className={styles.dockText}>{song ?? 'Boombox: classic Roblox songs'}</span>
				<span className={styles.dockBadge}>{open ? '−' : '+'}</span>
			</button>
		</div>
	);
}
