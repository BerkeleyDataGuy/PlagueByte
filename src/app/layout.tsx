import type { Metadata } from 'next';
import { Luckiest_Guy, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { Shell } from '@/components/Shell';
import { site } from '@/content/site';

// The 2016 Roblox website's face
const sourceSans = Source_Sans_3({ variable: '--font-ui', subsets: ['latin'], weight: ['400', '600', '700', '900'] });
// Chunky lettering for the player-made skyscraper ads
const luckiest = Luckiest_Guy({ variable: '--font-ad', subsets: ['latin'], weight: '400', preload: false });

const siteUrl =
	process.env.NEXT_PUBLIC_SITE_URL ??
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: 'http://localhost:3000');

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: { default: site.title, template: `%s - ROBLOX` },
	description: site.description,
	openGraph: { type: 'website', siteName: site.name, title: site.title, description: site.description },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html lang="en" className={`${sourceSans.variable} ${luckiest.variable}`}>
			<body>
				{/* The frame (and its Boombox) lives in the layout, so the music keeps playing between pages */}
				<Shell>{children}</Shell>
			</body>
		</html>
	);
}
