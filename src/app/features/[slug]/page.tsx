import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FeatureCard, FeatureThumb, Grid, SectionHead } from '@/components/Cards';
import { Code } from '@/components/Code';
import { features } from '@/content/features';
import { site } from '@/content/site';
import styles from '../../pages.module.css';

const getFeature = (slug: string) => features.find((f) => f.slug === slug);

export function generateStaticParams() {
	return features.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<'/features/[slug]'>): Promise<Metadata> {
	const f = getFeature((await params).slug);
	return f ? { title: f.name, description: f.tagline } : {};
}

/** A 2016 Library item page: thumbnail, price box with a green Get button, details, then the code */
export default async function FeaturePage({ params }: PageProps<'/features/[slug]'>) {
	const f = getFeature((await params).slug);
	if (!f) notFound();

	const more = features.filter((x) => x.slug !== f.slug && x.group === f.group).concat(features.filter((x) => x.group !== f.group));

	return (
		<>
			<article className={`${styles.panel} ${styles.detail}`}>
				<div className={styles.itemThumb}>
					<FeatureThumb feature={f} big />
				</div>

				<div className={styles.side}>
					<h1>{f.name}</h1>
					<p className={styles.by}>
						By <span>{site.name}</span>
					</p>
					<hr />
					<div className={styles.price}>
						<span>Price</span>
						<strong>{f.href ? 'Free' : 'In development'}</strong>
						{f.href && (
							<a className="btn-green" href={f.href} target="_blank" rel="noopener noreferrer">
								Get the code
							</a>
						)}
					</div>
					<dl className={styles.itemFacts}>
						<div>
							<dt>Type</dt>
							<dd>{f.studio ? 'Spearhead system (Studio place)' : 'Luau package'}</dd>
						</div>
						<div>
							<dt>Group</dt>
							<dd>{f.group}</dd>
						</div>
						{f.lines !== undefined && (
							<div>
								<dt>Source</dt>
								<dd>
									{f.files} {f.files === 1 ? 'file' : 'files'}, {f.lines.toLocaleString('en-US')} lines
								</dd>
							</div>
						)}
						{f.requires && (
							<div>
								<dt>Requires</dt>
								<dd>{f.requires}</dd>
							</div>
						)}
						{f.href && (
							<div>
								<dt>License</dt>
								<dd>MIT</dd>
							</div>
						)}
					</dl>
				</div>
			</article>

			<section className={styles.panel}>
				<div className={styles.tabs} role="presentation">
					<span aria-current="true">About</span>
				</div>
				<div className={styles.about}>
					<p className={styles.tagline}>{f.tagline}</p>
					{f.summary.map((p) => (
						<p key={p.slice(0, 24)} className={styles.para}>
							{p}
						</p>
					))}

					{f.controls && (
						<>
							<h2>Controls</h2>
							<table className={styles.controls}>
								<tbody>
									{f.controls.map(([key, what]) => (
										<tr key={key}>
											<th scope="row">
												<kbd>{key}</kbd>
											</th>
											<td>{what}</td>
										</tr>
									))}
								</tbody>
							</table>
						</>
					)}

					{f.code && (
						<>
							<h2>From the source</h2>
							<Code code={f.code} file={f.codeFile!} />
						</>
					)}
				</div>
			</section>

			<section>
				<SectionHead title="More from Korblox Builds" href="/features" />
				<Grid>
					{more.slice(0, 6).map((x, i) => (
						<FeatureCard key={x.slug} feature={x} i={i} />
					))}
				</Grid>
			</section>
		</>
	);
}
