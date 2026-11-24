import styles from '@/app/pages.module.css';

const KEYWORDS =
	/^(local|function|end|if|then|else|elseif|for|in|do|while|repeat|until|return|not|and|or|nil|true|false|break|continue|export|type)$/;

/** Luau with 2016 Studio editor colours; block comments are tracked across lines */
export function Code({ code, file }: { code: string; file: string }) {
	const rows: { line: string; comment: boolean }[] = [];
	let inBlock = false;
	for (const line of code.split('\n')) {
		const comment: boolean = inBlock || line.trimStart().startsWith('--[[');
		inBlock = comment && !line.includes(']]');
		rows.push({ line, comment });
	}

	return (
		<figure className={styles.code}>
			<figcaption>
				<span>{file}</span>
				<span>excerpt</span>
			</figcaption>
			<pre>
				<code>
					{rows.map(({ line, comment }, i) => (
						<span key={i} className={styles.codeLine}>
							<span className={styles.lineNo} aria-hidden="true">
								{i + 1}
							</span>
							{comment ? <span className={styles.tkComment}>{line}</span> : highlight(line)}
							{'\n'}
						</span>
					))}
				</code>
			</pre>
		</figure>
	);
}

function highlight(line: string) {
	return line.split(/(--.*$|"[^"]*"|'[^']*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b)/).map((p, i) => {
		if (!p) return null;
		if (p.startsWith('--')) return <span key={i} className={styles.tkComment}>{p}</span>;
		if (/^["']/.test(p)) return <span key={i} className={styles.tkString}>{p}</span>;
		if (/^\d/.test(p)) return <span key={i} className={styles.tkNumber}>{p}</span>;
		if (KEYWORDS.test(p)) return <span key={i} className={styles.tkKeyword}>{p}</span>;
		return p;
	});
}
