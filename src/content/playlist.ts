/*
 * ─── The Boombox in the right column ─────────────────────────────────────────
 *
 * Classic Roblox songs and the music that was everywhere in Roblox games around 2016. The player shuffles
 * these and plays them through Spotify's official embed, so visitors logged in to Spotify hear full songs
 * and everyone else hears 30-second previews.
 *
 * To add a song:    in Spotify, Share → Copy song link. The id is the part after /track/ and before any "?".
 *                   Add a line with that id, the title and the artist. durationMs and art are optional.
 * To remove a song: delete its line.
 */

export type Track = {
	/** Spotify track id, from the song link: open.spotify.com/track/<id> */
	id: string;
	title: string;
	artist: string;
	durationMs?: number;
	/** Cover image URL (Spotify's image CDN) */
	art?: string;
};

export const playlist = {
	name: 'Classic Roblox + 2016',
	/** A line under the player's header */
	about: 'Log in to Spotify in this browser to hear full songs; everyone else hears 30-second previews.',
};

// One song per line, so the list stays easy to edit
// prettier-ignore
export const tracks: Track[] = [
	{ id: "3DaGnKmAAmyZGIbC0KjmxT", title: "Carefree", artist: "Kevin MacLeod", durationMs: 205139, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e023581aa1ca8780d7ee6461551" },
	{ id: "5sRQNFKwE9kgNleZgnCpgw", title: "Local Forecast - Elevator", artist: "Kevin MacLeod", durationMs: 189204, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a3a82b47455239571ec2e5bc" },
	{ id: "1VsTvfmPwrJxIP5idldxX7", title: "Monkeys Spinning Monkeys", artist: "Kevin MacLeod", durationMs: 125074, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0212f766609c3ac4bdfbbde973" },
	{ id: "5nFNGhlyf0mmPar5w3I6JY", title: "Fluffing a Duck", artist: "Kevin MacLeod", durationMs: 67369, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02b0a5dcc595b50a52d6ab1e14" },
	{ id: "3bDxexGMeu3pj1cRu2QZjG", title: "Winner Winner!", artist: "Kevin MacLeod", durationMs: 198060, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02b0a5dcc595b50a52d6ab1e14" },
	{ id: "2t50tC9s0OBr7b1bRlKqz2", title: "Latin Industries", artist: "Kevin MacLeod", durationMs: 200724, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e026b0a3af82ec6760d36bf5366" },
	{ id: "6FtEYXxrWTGKjCHUmH6sv4", title: "Good Morning Pizzeria!", artist: "Kyle Allen Music", durationMs: 179536, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02c8a88cf4c97714bf610c8137" },
	{ id: "0uVADtS56QirXJTGbSUCAm", title: "Back to School", artist: "Kyle Allen Music", durationMs: 120000, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e025baff7b7fbecbe0985fbb61d" },
	{ id: "01apQz7E72krU1k1b4VWs7", title: "Raining Tacos", artist: "Parry Gripp", durationMs: 92693, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02d5803f83b3d5466232f02d0c" },
	{ id: "2ezaZvq9qEVMa8CEz2LUVa", title: "Jumper", artist: "Waterflame", durationMs: 103235, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02a2147086ba6896af03c0e258" },
	{ id: "0c2hWttZ6dDBX3UwN73LYq", title: "Ievan Polkka", artist: "Hatsune Miku", durationMs: 152462, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0263960cdc2596d05d1a862d09" },
	{ id: "4BhcUVEmIci8t1KwR073yn", title: "Nyan Cat Theme", artist: "Digidudes", durationMs: 111552, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e021e4bd603b5c0ed1e32b74788" },
	{ id: "1sUdq3kWa9dJXHu3eYOUll", title: "Spooky, Scary Skeletons - Undead Tombstone Remix", artist: "Andrew Gold", durationMs: 125624, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02a3cf7d524baed9e303302918" },
	{ id: "7ruYGYVdtbromjyUtSDwuo", title: "The Kitty Cat Dance", artist: "Steve Ibsen", durationMs: 83983, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e023e6be7458f06ea857fa14fb1" },
	{ id: "1xNKATZI1dFCXRFlvX0bYL", title: "Girl from Petaluma", artist: "Cocktail Shakers", durationMs: 213462, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02c552d4ccd117ad1a8df4c825" },
	{ id: "5A2LUdpOoL1VlKh2jB2yah", title: "Gravity Zero", artist: "Catiso", durationMs: 189144, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e027a1b7c82f4a2ddb9e8d3ea33" },
	{ id: "6BAnxKyld909yo6Pk1DO3r", title: "Hello", artist: "OMFG", durationMs: 226307, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02417bebe37c4c4c2430036143" },
	{ id: "3VvBPkc24zC7x05mgJTyGO", title: "Monody (feat. Laura Brehm)", artist: "TheFatRat, Laura Brehm", durationMs: 290467, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02f0f3a191d7dcaf2b6a8ac86c" },
	{ id: "5iRVNYbhfWNO2VzBykX7GS", title: "Xenogenesis", artist: "TheFatRat", durationMs: 233379, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02de1c21aef47a0d14ed0999c2" },
	{ id: "0hTrQoqDmFnA4S1PC265e1", title: "Fly Away", artist: "TheFatRat, Anjulie", durationMs: 194267, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0297ea027ac78c05d10422b588" },
	{ id: "1DpcBu9lrHO6tmboAkdY4B", title: "Spectre", artist: "Alan Walker", durationMs: 230634, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02514deb83426d833efc202e0e" },
	{ id: "7gHs73wELdeycvS48JfIos", title: "Faded", artist: "Alan Walker", durationMs: 212626, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02c4d00cac55ae1b4598c9bc90" },
	{ id: "3LlmKSHR3Rs0Y3KHQLAYDk", title: "Alone", artist: "Alan Walker", durationMs: 160426, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02a108e07c661f9fc54de9c43a" },
	{ id: "3MEYFivt6bilQ9q9mFWZ4g", title: "Alone", artist: "Marshmello", durationMs: 273802, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02956043cfb058f0be93022267" },
	{ id: "61k7xAKMsuvTf2j2YnieSi", title: "Sky High", artist: "Elektronomia", durationMs: 236254, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0288da69718b8e73389c6fbad7" },
	{ id: "2uZWffKoemZDI0gHcBEcDc", title: "On & On", artist: "Cartoon, Jéja, Daniel Levi", durationMs: 207068, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e024d02949f4eaa850b2c178e70" },
	{ id: "1X7eCHIaD83s2r5i95ZXUC", title: "My Heart", artist: "Different Heaven, EH!DE", durationMs: 266900, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02af94953c36d15db60fe660b9" },
	{ id: "5fOjFkFA0k5MTOo1LmnVTO", title: "Heroes Tonight", artist: "Janji, Johnning", durationMs: 208139, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02fefb9f8c3b9e802da9732453" },
	{ id: "6V7vDKrlnxOvZoIhZk9CjF", title: "Candyland", artist: "Tobu", durationMs: 200672, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e023979df4d17587f584dc9e1b5" },
	{ id: "7MTZVwYiEahXQIyCU2FLPV", title: "Invincible", artist: "Deaf Kev", durationMs: 279600, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02c8fcf36a4571ad94dd9b0317" },
	{ id: "2zVJlAEB0ublkqJMIn43AE", title: "Symbolism", artist: "Electro-Light", durationMs: 293300, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02b44de5b9f5eba409dfa753e6" },
	{ id: "0aGwoW8nbViCz5aUxh2fU5", title: "Nekozilla", artist: "Different Heaven", durationMs: 168759, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02c5d106258d9d3ea4d0d4b70a" },
	{ id: "4aW4j7ef4H9SPsfKrczvvr", title: "Hellcat", artist: "Desmeon", durationMs: 225862, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0216ebb359112ccab88aee0687" },
	{ id: "1YB2NnK2KrK9PdrJ0czdDB", title: "Firefly", artist: "Jim Yosef", durationMs: 256620, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a11e3d61ddf6877cc9374cfa" },
	{ id: "3pqfx1XOcuFZDeKOwfOky7", title: "Cloud 9", artist: "Tobu, Itro", durationMs: 277524, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02c4118d04c3ace37a8f813185" },
	{ id: "7ucAyhKPjKsLrP14q4mcyo", title: "Blank", artist: "Disfigure", durationMs: 208901, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a48bde6cf45881944dd611a5" },
	{ id: "0gb1J5UrTpzaU1s3nupgCd", title: "No Money", artist: "Galantis", durationMs: 189126, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02119cb56f073efd326643dcfe" },
	{ id: "46lFttIf5hnUZMGvjK0Wxo", title: "Runaway (U & I)", artist: "Galantis", durationMs: 227073, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02b574d4c9929a31926d5faf1b" },
	{ id: "1lItf5ZXJc1by9SbPeljFd", title: "Juju on That Beat (TZ Anthem)", artist: "Zay Hilfigerrr, Zayion McCall", durationMs: 144244, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02186678fe32d915298c28d576" },
	{ id: "6i0V12jOa3mr6uu4WYhUBr", title: "Heathens", artist: "Twenty One Pilots", durationMs: 195920, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e022ca3ba8f334ca5a5f0312efb" },
	{ id: "3CRDbSIZ4r5MsZ0YwxuEkn", title: "Stressed Out", artist: "Twenty One Pilots", durationMs: 202333, art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e022df0d98a423025032d0db1f7" },
	{ id: "7BKLCZ1jbUBVqRi2FVlTVw", title: "Closer", artist: "The Chainsmokers, Halsey", durationMs: 244960, art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02495ce6da9aeb159e94eaa453" },
];
