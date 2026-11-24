'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import styles from './Shell.module.css';

type Entry = { href: string; label: string; kind: string };

/** The top-bar search box: filters games and packages as you type */
export function Search({ items }: { items: Entry[] }) {
	const [q, setQ] = useState('');
	const listId = useId();
	const term = q.trim().toLowerCase();
	const hits = term ? items.filter((it) => it.label.toLowerCase().includes(term) || it.kind.toLowerCase().includes(term)) : [];

	return (
		<div className={styles.search} role="search">
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<path d="M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5 21 21" />
			</svg>
			<label htmlFor={`${listId}-q`} className="sr-only">
				Search games and features
			</label>
			<input
				id={`${listId}-q`}
				type="search"
				placeholder="Search"
				value={q}
				onChange={(e) => setQ(e.target.value)}
				onKeyDown={(e) => e.key === 'Escape' && setQ('')}
				autoComplete="off"
				aria-controls={listId}
			/>
			{term && (
				<ul id={listId} className={styles.results}>
					{hits.length ? (
						hits.slice(0, 8).map((h) => (
							<li key={h.href}>
								<Link href={h.href} onClick={() => setQ('')}>
									{h.label}
									<span>{h.kind}</span>
								</Link>
							</li>
						))
					) : (
						<li className={styles.noHits}>No games or features match “{q.trim()}”.</li>
					)}
				</ul>
			)}
		</div>
	);
}
