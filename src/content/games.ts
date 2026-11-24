/*
 * The games, from Roblox's public game, vote and badge APIs (snapshot taken 2026-11-23).
 * Numbers go stale: re-check them on the game pages before relying on them.
 * Pictures are in /public/images/games. Two games have no screenshots yet, so their icon stands in.
 */

export type Badge = { name: string; awarded: number };

export type Game = {
	slug: string;
	name: string;
	placeId: number;
	creator: { name: string; type: 'User' | 'Group' };
	/** PlagueByte's part in it, shown under the title */
	role: string;
	description: string;
	icon: string;
	/** In-game screenshot, if the game has one */
	screenshot?: { src: string; width: number; height: number; alt: string };
	visits: number;
	favorites: number;
	upVotes: number;
	downVotes: number;
	maxPlayers: number;
	created: string;
	updated: string;
	badges: Badge[];
};

export const games: Game[] = [
	{
		slug: 'operation-obsolete-finale',
		name: 'Operation Obsolete Finale',
		placeId: 112356781991175,
		creator: { name: 'PlagueByte', type: 'User' },
		role: 'Made by PlagueByte',
		description:
			'[UNOFFICIAL TELLUS KORBLOX GAME] [GAME INTENDED FOR 5-7 PLAYERS]\n\nUnder the guise of a whiteout, Korblox Confederacy operatives raid a Bloxian Commonwealth Garrison HQ. Unknowingly walking into hell.\n\n"My son, top of Bloxian Garrison HQ!"',
		icon: '/images/games/obsolete-icon.png',
		visits: 2,
		favorites: 1,
		upVotes: 0,
		downVotes: 0,
		maxPlayers: 20,
		created: '2026-11-23',
		updated: '2026-11-24',
		badges: [],
	},
	{
		slug: 'sector-8',
		name: 'SECTOR 8 - Frontal Sector',
		placeId: 15679565609,
		creator: { name: 'K. Corp', type: 'Group' },
		role: 'A K. Corp group game',
		description: 'The front of SECTOR 8, including Little Italy, and the Public Housing Sector.',
		icon: '/images/games/sector8-icon.png',
		screenshot: {
			src: '/images/games/sector8-thumb.png',
			width: 648,
			height: 432,
			alt: 'Four armed minion characters in an armoury in SECTOR 8',
		},
		visits: 1103,
		favorites: 10,
		upVotes: 17,
		downVotes: 3,
		maxPlayers: 50,
		created: '2023-12-19',
		updated: '2026-10-30',
		badges: [
			{ name: 'Dead Man Hanging', awarded: 51 },
			{ name: 'Memories of the False Flag', awarded: 10 },
		],
	},
	{
		slug: 'testing-baseplate',
		name: 'PlagueByte’s testing baseplate',
		placeId: 117608660089652,
		creator: { name: 'PlagueByte', type: 'User' },
		role: 'Made by PlagueByte',
		description: 'Testing enemy AI',
		icon: '/images/games/baseplate-icon.png',
		visits: 41,
		favorites: 2,
		upVotes: 2,
		downVotes: 0,
		maxPlayers: 50,
		created: '2026-07-26',
		updated: '2026-11-14',
		badges: [],
	},
];

export const gameUrl = (g: Game) => `https://www.roblox.com/games/${g.placeId}`;

export const rating = (g: Game) =>
	g.upVotes + g.downVotes ? Math.round((g.upVotes / (g.upVotes + g.downVotes)) * 100) : null;
