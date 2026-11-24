import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './pages.module.css';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
	return (
		<section className={`${styles.panel} ${styles.notFound}`}>
			<h1>Page cannot be found or no longer exists</h1>
			<p>The link may be broken, or the page may have moved.</p>
			<Link className="btn" href="/">
				Go to Home
			</Link>
		</section>
	);
}
