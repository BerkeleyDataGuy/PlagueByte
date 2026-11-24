// Generated from the Korblox Builds repo (main, 2026-11-24).
// `code` is an exact excerpt of the named file. Spearhead entries without `href` live only in the Spearhead Studio place.

export type Feature = {
	slug: string;
	name: string;
	group: 'Gameplay' | 'Movement' | 'Environment' | 'Tools' | 'TREK add-on' | 'Spearhead add-on' | 'AI';
	tagline: string;
	summary: string[];
	controls?: [string, string][];
	requires?: string;
	/** Folder in the repo */
	href?: string;
	/** True for systems built in the Spearhead Studio place and not in the repo */
	studio?: boolean;
	/** Your own Luau: no vendored code, tools, tests, READMEs, comments or blank lines */
	files?: number;
	lines?: number;
	codeFile?: string;
	code?: string;
	/** Thumbnail in /public; a plain name tile is drawn without one */
	image?: string;
};

export const repoUrl = 'https://anonymous.4open.science/r/Korblox-Builds-8501/';

export const features: Feature[] = [
	{
		"slug": "r6-ragdoll",
		"name": "R6 Ragdoll",
		"group": "Gameplay",
		"tagline": "Death ragdoll for R6 rigs, in one ServerScriptService script.",
		"summary": [
			"On death, each R6 joint is swapped for a limited BallSocketConstraint so the body falls instead of freezing.",
			"Other death systems can opt out by setting a SuppressRagdoll attribute on the character first."
		],
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/WIP/RagdollDeath",
		"files": 1,
		"lines": 82,
		"codeFile": "ragdoll.luau",
		"code": "\tfor _, name in RAGDOLL_JOINTS do\n\t\tlocal joint = findJoint(torso, name)\n\t\tif joint and joint.Part0 and joint.Part1 then\n\t\t\tlocal a0 = Instance.new(\"Attachment\")\n\t\t\ta0.CFrame = joint.C0\n\t\t\ta0.Parent = joint.Part0\n\n\t\t\tlocal a1 = Instance.new(\"Attachment\")\n\t\t\ta1.CFrame = joint.C1\n\t\t\ta1.Parent = joint.Part1\n\n\t\t\tlocal socket = Instance.new(\"BallSocketConstraint\")\n\t\t\tsocket.Attachment0 = a0\n\t\t\tsocket.Attachment1 = a1\n\t\t\tsocket.LimitsEnabled = true\n\t\t\tsocket.TwistLimitsEnabled = true\n\t\t\tsocket.UpperAngle = 75\n\t\t\tsocket.TwistLowerAngle = -45\n\t\t\tsocket.TwistUpperAngle = 45\n\t\t\tsocket.Parent = joint.Part0\n\n\t\t\tjoint:Destroy()\n\t\tend\n\tend\nend",
		"image": "/images/features/skeleton.png"
	},
	{
		"slug": "skull-death-screen",
		"name": "Skull Death Screen",
		"group": "Gameplay",
		"tagline": "Die, and the Evil Skull Man stares you down before you respawn.",
		"summary": [
			"The screen fades to black and the Evil Skull Man fades in, skull first, then the camera pulls back to his top half while a clip plays. When it ends you respawn behind the black and it fades away. The rig renders in a ViewportFrame, so it never exists in Workspace.",
			"The server holds each respawn until that player’s screen finishes, with a timeout as a safety net, and an admin respawn still cuts it short. Works alongside R6 Ragdoll and Random Artillery’s dismemberment, which carry on behind the black."
		],
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/Gameplay/Skull%20Death%20Screen",
		"files": 3,
		"lines": 235,
		"codeFile": "DeathScreenRuntime.server.luau",
		"code": "-- The death each player is waiting on. A fresh table per death, so a timeout\n-- armed by an earlier death cannot respawn someone during a later one.\nlocal pending: { [Player]: {} } = {}\n\nlocal function respawn(player: Player, token: {}?)\n\tlocal current = pending[player]\n\tif current == nil then\n\t\treturn\n\tend\n\tif token and token ~= current then\n\t\treturn\n\tend\n\tpending[player] = nil\n\tif player.Parent then\n\t\tplayer:LoadCharacter()\n\tend\nend\n\nlocal function onCharacterAdded(player: Player, character: Model)\n\tlocal humanoid = character:WaitForChild(\"Humanoid\") :: Humanoid\n\thumanoid.Died:Once(function()\n\t\tlocal token = {}\n\t\tpending[player] = token\n\t\ttask.delay(Config.MaxRespawnWait, respawn, player, token)\n\tend)\nend",
		"image": "/images/features/skeleton.png"
	},
	{
		"slug": "skis",
		"name": "Skis",
		"group": "Movement",
		"tagline": "Carving, snowplow braking, jumps, and a proper wipeout.",
		"summary": [
			"Skis and poles that weld to your character and sling across your back on a carry strap when you are not using them. Strap in and point downhill.",
			"Carving, snowplow braking, jumps that throw you along the slope, landings you can blow, and a proper ragdoll when you do. Steering reads Humanoid.MoveDirection, so keyboards, gamepads and mobile thumbsticks all work."
		],
		"controls": [
			[
				"G",
				"Strap in / take them off"
			],
			[
				"WASD",
				"Steer"
			],
			[
				"S",
				"Snowplow brake"
			],
			[
				"Shift",
				"Tuck for top speed"
			],
			[
				"Space",
				"Jump"
			]
		],
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/Gameplay/Ski",
		"files": 14,
		"lines": 2650,
		"codeFile": "SkiConfig.luau",
		"code": "-- Skis running over snow. Follows your speed. The workhorse, pick something\n-- that loops without an audible seam.\nSkiConfig.GlideSoundId = \"rbxassetid://9125408271\"\n\n-- The edges biting. Follows sideways speed, so it arrives when you turn rather\n-- than droning all the way down. Wants to be a harsher scrape than the glide.\nSkiConfig.CarveSoundId = \"rbxassetid://9113597285\"",
		"image": "/images/features/ski.jpg"
	},
	{
		"slug": "variable-snowstorm",
		"name": "Variable Snowstorm",
		"group": "Environment",
		"tagline": "Snow and thunderstorms on a cycle that slow you down.",
		"summary": [
			"Storms run on a cycle, snow stops when you walk under a roof, and getting caught out in one slows you down. Lightning comes with the thunderstorm.",
			"The server ticks the storm four times a second and the client smooths between those values, so the weather stays in sync without flooding replication."
		],
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/Gameplay/Variable%20Snowstorm",
		"files": 10,
		"lines": 1564,
		"codeFile": "WeatherConfig.luau",
		"code": "-- How long each phase lasts, in seconds. A random value inside the range is\n-- rolled every time the phase is entered, so the cycle never feels metronomic.\nWeatherConfig.PhaseDurations = {\n\tClear = NumberRange.new(90, 150),\n\tBuilding = NumberRange.new(35, 55),\n\tPeak = NumberRange.new(150, 240),\n\tFading = NumberRange.new(40, 60),\n}\n\n-- How often the server recomputes storm state. This is not a render loop,\n-- the client smooths between these values locally, so 4 ticks/second is plenty.\nWeatherConfig.ServerTickRate = 0.25\n\n-- Intensity only replicates when it moves more than this. Stops us from\n-- spamming attribute replication with meaningless 0.0001 changes.\nWeatherConfig.IntensityEpsilon = 0.005\n\n-- At Peak the storm breathes instead of sitting at a flat 1.0.\nWeatherConfig.PeakWobbleAmount = 0.18\nWeatherConfig.PeakWobbleSpeed = 0.15",
		"image": "/images/features/snowstorm.jpg"
	},
	{
		"slug": "chat-voices",
		"name": "Chat Voices",
		"tagline": "Roleplay chat: talk blips, and messages written like a book.",
		"summary": [
			"Every message plays talk blips from the speaker’s head, a few letters per blip, in a voice pitch that changes each life.",
			"Text is formatted like a novel: speech gets quotes, *stars* become grey italic actions that make no sound, and plain speech gets a tag from its punctuation, so “where are we?” reads “Where are we?” PlagueByte asks. Commands starting with / or : are left alone."
		],
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/Tools/Chat%20Voices",
		"files": 2,
		"lines": 137,
		"codeFile": "ChatActions.client.luau",
		"code": "-- same message -> same verb on every client (a per-client random would disagree)\nlocal function pick(list: { string }, seed: string): string\n\tlocal h = 0\n\tfor i = 1, #seed do\n\t\th = (h * 31 + seed:byte(i)) % 2147483647\n\tend\n\treturn list[h % #list + 1]\nend\n\nlocal function autoTag(speech: string, name: string, seed: string): string\n\tlocal kind\n\tif speech:find(\"%?[!?]*$\") then\n\t\tkind = \"question\"\n\telseif speech:find(\"!$\") then\n\t\tkind = \"exclaim\"\n\telseif speech:find(\"%.%.%.$\") or speech:find(\"…$\") then\n\t\tkind = \"trail\"\n\telse\n\t\tkind = \"say\"\n\t\tspeech = speech:gsub(\"%.$\", \"\") .. \",\" -- \"Okay,\" Name says.\n\tend\n\treturn '\"' .. speech .. '\" ' .. ACTION_FORMAT:format(name .. \" \" .. pick(TAGS[kind], seed) .. \".\")\nend",
		"group": "Tools",
		"image": "/images/features/hammer.png"
	},
	{
		"slug": "dark-magic",
		"name": "Dark Magic",
		"tagline": "A spell tool: pick a spell, click your targets, cast.",
		"summary": [
			"Six spells in violet fire. Uniform burns new clothes onto someone, Melt burns them down to a ragdoll skeleton, Raise pulls skeletons out of the ground to guard you or hunt your targets, Soul Rip tears out a soul that its owner steers for 10 seconds, Shadow Step sinks you into a shadow pool behind the target, and Hex makes every hit land twice.",
			"Every effect runs on the server so everyone sees it, and the effect lands on the caster animation’s release frame. Drop the one Script in ServerScriptService and it moves the tool, the soul client and the animations into place."
		],
		"image": "/images/features/hammer.png",
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/Tools/Dark%20Magic",
		"files": 3,
		"lines": 2750,
		"codeFile": "DarkMagic.server.luau",
		"code": "-- The soul's owner sends where they want to go; the server moves the soul so everyone sees it.\nlocal soulRemote = Instance.new(\"UnreliableRemoteEvent\")\nsoulRemote.Name = \"Dark Magic Soul\"\nsoulRemote.Parent = ReplicatedStorage\nlocal soulInput: { [Player]: Vector3 } = {}\nsoulRemote.OnServerEvent:Connect(function(player, dir: any)\n\tif soulInput[player] and typeof(dir) == \"Vector3\" and dir == dir then -- dir == dir drops NaN\n\t\tlocal flat = Vector3.new(dir.X, 0, dir.Z)\n\t\tsoulInput[player] = flat.Magnitude > 1 and flat.Unit or flat\n\tend\nend)\nPlayers.PlayerRemoving:Connect(function(p)\n\tsoulInput[p] = nil\nend)",
		"group": "Tools"
	},
	{
		"slug": "trek-objective-system",
		"name": "TREK Objective System",
		"group": "TREK add-on",
		"tagline": "Raid capture points with TREK’s HUD, running on Spearhead.",
		"summary": [
			"Raiders and defenders fight over capture terminals. Standing on one pushes its progress toward your side; the side holding it scores every second, and the first to the objective score wins. Admins start and end the raid from chat.",
			"In the Spearhead place it runs with TREK’s own HUD and notifications rebuilt on top: scores, point markers and the victory card, in Spearhead’s font. Starting a raid plays an entry scene up the metro stairs and over the city; ending it orbits the camera over the plaza while the winner’s line comes up.",
			"Every mass respawn unequips Spearhead guns first, so nobody comes back stuck in first person."
		],
		"requires": "Spearhead (the HUD and scenes live in the Spearhead place)",
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/Gameplay/Objective%20System",
		"files": 2,
		"lines": 266,
		"codeFile": "MainHandler.server.luau",
		"code": "local function handlePoints()\n\tif not system.RaidOfficial.Value then return end\n\t\n\tfor i,point in pairs(points:GetChildren()) do\t\n\t\tif point.Capital.Value then continue end\n\t\t\n\t\tlocal r,d = getNumbersOnPoint(point.Point)\n\n\t\tif (r > d and point.Progress.Value > point.Progress.MinValue) then\n\t\t\tpoint.Progress.Value -= 1\n\t\t\tpoint.Contested.Value = false\n\t\telseif (d > r and point.Progress.Value < point.Progress.MaxValue) then\n\t\t\tpoint.Progress.Value += 1\n\t\t\tpoint.Contested.Value = false\n\t\telseif ((r ~= 0 and d ~= 0) and (r == d)) then\n\t\t\tpoint.Contested.Value = true\n\t\telse\n\t\t\tpoint.Contested.Value = false\n\t\tend\n\t\t\n\t\tif point.Progress.Value == point.Progress.MinValue then\n\t\t\tpoint.Owner.Value = 'Raiders'\t\n\t\telseif point.Progress.Value == point.Progress.MaxValue then\n\t\t\tpoint.Owner.Value = 'Defenders'\n\t\telse\n\t\t\tpoint.Owner.Value = 'None'\n\t\tend\n\tend\nend",
		"image": "/images/features/trek.png"
	},
	{
		"slug": "trek-bayonet",
		"name": "TREK Bayonet",
		"group": "TREK add-on",
		"tagline": "A melee fire mode for TREK rifles.",
		"summary": [
			"Press V to switch from the rifle to the blade and click to thrust, at any ammo count, mid-reload, while sprinting.",
			"No TREK script is edited: it plugs into Custom Bullets’ own BulletTypes extension point. Hits are found by sweeping the blade across the thrust instead of trusting Touched, so a fast blade cannot tunnel through a torso."
		],
		"requires": "TREK with Custom Bullets",
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/TREK/Bayonet",
		"files": 8,
		"lines": 1020,
		"codeFile": "BayonetConfig.luau",
		"code": "--[[\n\tHow long after the swing the blade keeps being tested, in seconds.\n\n\tNot a delay: a sweep. The blade is sampled repeatedly across this window as\n\tthe thrust animation drives it forward, and the first valid overlap wins. It\n\tis what makes the hit land when the blade actually arrives rather than at the\n\tinstant the mouse went down.\n\n\tShould comfortably cover the extend portion of your thrust animation.\n]]\nConfig.HitWindow = 0.35\n\n-- Seconds between samples inside that window. Small enough that a fast blade\n-- cannot pass through a torso between two tests, which is the tunnelling that\n-- makes Touched unreliable for melee.\nConfig.HitSampleInterval = 0.03",
		"image": "/images/features/trek.png"
	},
	{
		"slug": "trek-gas-grenade",
		"name": "TREK Gas Grenade",
		"group": "TREK add-on",
		"tagline": "Cook it, throw it, and gas whoever stays in the cloud.",
		"summary": [
			"Hold to cook, release to throw. It bounces to a stop and vents a cloud of gas that damages anyone standing in it for as long as it lasts.",
			"The first TREK tool that is not a gun: it installs a new \"Throwable\" tool handler and does not modify a single core file."
		],
		"requires": "TREK 4",
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/TREK/Gas%20Grenade",
		"files": 12,
		"lines": 1893,
		"codeFile": "GasConfig.luau",
		"code": "-- Seconds from press to detonation. Also the fuse when thrown instantly.\nGasConfig.FuseTime = 3.5\n\n--[[\n\tWhether holding past FuseTime detonates in your hand.\n\n\tTrue is the honest reading of a cooked fuse and the reason cooking is a\n\tdecision rather than a free upgrade. Set false and an over-cooked grenade is\n\tthrown at the last moment instead.\n]]\nGasConfig.CookKillsYou = true\n\n--[[\n\tThrow velocity, in studs/second.\n\n\tRange and height both scale off this, so it is the knob to reach for when the\n\tthrow feels short rather than flat. With ThrowAngle at 38, 105 gives roughly\n\t55 studs of range and a 10-stud apex: a lob you can put over a wall.\n]]\nGasConfig.ThrowPower = 105",
		"image": "/images/features/trek.png"
	},
	{
		"slug": "trek-parkour",
		"name": "TREK Parkour",
		"group": "TREK add-on",
		"tagline": "Vaulting and ledge mantling for TREK 4.",
		"summary": [
			"Sprint into low cover and go over it. Jump at a wall, press jump again, and haul yourself up, with your weapon slung and your sprint gone until you are standing.",
			"It hooks into whatever TREK install you already have without modifying it. Delete the folder and your install is exactly as it was."
		],
		"requires": "TREK 4",
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/TREK/Parkour",
		"files": 10,
		"lines": 1273,
		"codeFile": "ParkourConfig.luau",
		"code": "-- Vault fires on its own when you sprint at low cover. Mantle always needs the\n-- jump key. If vaulting feels grabby in playtest, turn it off here rather than\n-- retuning the heights: the heights are also what the mantle uses.\nParkourConfig.EnableVault = true\nParkourConfig.EnableMantle = true\n\n-- Prints every refusal with its reason, and every completed move with its\n-- measured distance. Leave it on while you are tuning the heights below; the\n-- refusal reasons are the whole diagnostic.\nParkourConfig.DebugLog = true",
		"image": "/images/features/trek.png"
	},
	{
		"slug": "trek-voicelines",
		"name": "TREK Voicelines",
		"group": "TREK add-on",
		"tagline": "Characters call out reloads, hits, kills and captures.",
		"summary": [
			"Plays a voice clip out of a character’s head when something happens to them: they reload, get low, get hit, get a kill, die, an explosion goes off nearby, they land or whiff a bayonet thrust, or their side takes an objective.",
			"Nothing in TREK is edited. It waits for TREK on its own, so load order does not matter, and it accepts sound ids in every format Roblox has used."
		],
		"requires": "TREK",
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/TREK/Voicelines",
		"files": 5,
		"lines": 766,
		"codeFile": "VoicelineConfig.luau",
		"code": "function Config.toAssetUrl(id: AssetId): string\n\tif type(id) == \"number\" then\n\t\treturn \"rbxassetid://\" .. id\n\tend\n\n\tlocal text = tostring(id):match(\"^%s*(.-)%s*$\") or \"\"\n\n\t-- Bare digits.\n\tif text:match(\"^%d+$\") then\n\t\treturn \"rbxassetid://\" .. text\n\tend\n\n\t-- Peel any number of rbxassetid:// prefixes. The loop rather than a single\n\t-- strip is what recovers the doubled form.\n\tlocal stripped = text\n\twhile true do\n\t\tlocal rest = stripped:match(\"^rbxassetid://(.*)$\")\n\t\tif not rest then\n\t\t\tbreak\n\t\tend\n\t\tstripped = rest\n\tend\n\tif stripped:match(\"^%d+$\") then\n\t\treturn \"rbxassetid://\" .. stripped\n\tend",
		"image": "/images/features/trek.png"
	},
	{
		"slug": "random-artillery",
		"name": "Random Artillery",
		"group": "TREK add-on",
		"tagline": "Barrages that fall wherever the players are.",
		"summary": [
			"You hear the guns fire, you get a few seconds, then a dozen-odd shells arc in and anything caught in the open comes apart.",
			"The warning lead is the mechanic: the guns sound about twelve seconds before the first crater, enough to cross open ground and get behind something. Barrages skip servers too small to be worth shelling."
		],
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/AI/Random%20Arty",
		"files": 14,
		"lines": 2158,
		"codeFile": "ArtilleryConfig.luau",
		"code": "ArtilleryConfig.Enabled = true\n\n-- false: the guns never fire on their own timer, only on fire missions (the\n-- Bloxian Spawner's Kinetic Events tab). true brings back the random barrages below.\nArtilleryConfig.NaturalBarrages = false\n\n-- Seconds between barrages. A random value inside the range is rolled every\n-- time one ends, so shelling never becomes something you can set a watch by.\nArtilleryConfig.BarrageInterval = NumberRange.new(120, 300)\n\n-- Shells per barrage. Centaura runs \"over a dozen\" and that is the number that\n-- makes a barrage read as a barrage rather than a few stray hits.\nArtilleryConfig.ShellsPerBarrage = NumberRange.new(15, 25)\n\n-- Seconds between one shell launching and the next. Small values land the\n-- barrage almost at once; large values walk it across the ground.\nArtilleryConfig.ShellSpacing = NumberRange.new(0.2, 1)\n\n--[[\n\tSeconds of audible warning before the first shell lands. This is the\n\tMechanic, not decoration: it is the only reason a barrage is survivable.\n\n\tYour real reaction time is this plus ShellFlightTime, because the shells are\n\tvisible arcing in for the whole flight. At 12 + 6.5 that is eighteen-odd\n\tseconds between the guns going off and the first crater, which is enough to\n\tcross open ground and get behind something.\n\n\tUnder about 4 nobody reaches cover at all and the whole thing reads as\n\tarbitrary rather than dangerous.\n]]\nArtilleryConfig.BarrageWarningLead = 12",
		"image": "/images/features/trek.png"
	},
	{
		"slug": "spearhead-medical",
		"name": "Medical System",
		"tagline": "Get downed instead of dying, then bleed out, get patched up or get finished.",
		"summary": [
			"A lethal hit puts you down instead of killing you. You have 60 seconds before you bleed out: a teammate can revive you, a second lethal hit finishes you, and holding Space gives up. An arm wound adds weapon sway and a leg wound a limp until they are treated.",
			"Everyone carries bandages, which heal half your missing health. Only medics get the medkit, the one thing that fixes limb injuries and brings a downed teammate back. Every treatment has its own upper-body animation, so you can still walk, crouch and go prone while you work."
		],
		"group": "Spearhead add-on",
		"image": "/images/features/spearhead.png",
		"studio": true
	},
	{
		"slug": "spearhead-carry-drag",
		"name": "Carry & Drag",
		"tagline": "Pick up a downed soldier and get them out of the fire.",
		"summary": [
			"Walk up to a downed body and hold F. A chest wound means you drag them by the collar; anything else and you throw them over your shoulder. You move slower and cannot use tools while you carry, and enemies can drag a body too.",
			"A dragged body trails along the floor on its ragdoll joints instead of flopping, and leaves a brushed blood smear behind it that thins out over 60 studs."
		],
		"group": "Spearhead add-on",
		"image": "/images/features/spearhead.png",
		"studio": true
	},
	{
		"slug": "spearhead-gore",
		"name": "Gore",
		"tagline": "Wounds and blood where the round actually hit.",
		"summary": [
			"Kills leave wounds, blood and pieces where the shot landed. Only a shotgun takes the head off; other guns leave a head wound. Blood cleans itself up after 15 seconds.",
			"A downed soldier bleeds from the wound that put them down, and the gore waits until they actually die, so a bleed-out still shows what caused it."
		],
		"group": "Spearhead add-on",
		"image": "/images/features/spearhead.png",
		"studio": true
	},
	{
		"slug": "spearhead-death-ragdolls",
		"name": "Death Ragdolls",
		"tagline": "Bodies crumple where they stand instead of flying off.",
		"summary": [
			"Bodies crumple and stay solid on the ground. Some clutch the wound, and some of the ones that land face down crawl a little before they stop. Headshots just drop.",
			"R6 NPCs ragdoll the same way, and only fall if there is ground under them."
		],
		"group": "Spearhead add-on",
		"image": "/images/features/spearhead.png",
		"studio": true
	},
	{
		"slug": "spearhead-kill-feed",
		"name": "Kill Feed",
		"tagline": "Who killed who, with what, in icons.",
		"summary": [
			"A Battlefield-style feed in the top right: names in team colour, a silhouette of the actual gun rendered from its model, and a crosshair for a headshot. Revives show up too, as a green star of life.",
			"A bleed-out or a give-up still credits whoever put you down."
		],
		"group": "Spearhead add-on",
		"image": "/images/features/spearhead.png",
		"studio": true
	},
	{
		"slug": "spearhead-team-morphs",
		"name": "Team Morphs",
		"tagline": "Spawn in your side’s uniform.",
		"summary": [
			"Each team gets its own shirt, pants and head and torso gear. Players keep their hair and face, and Bloxian skin tones are randomized so a squad does not look cloned.",
			"It waits for the avatar to finish loading before dressing you, so your own look cannot overwrite the uniform on respawn."
		],
		"group": "Spearhead add-on",
		"image": "/images/features/spearhead.png",
		"studio": true
	},
	{
		"slug": "admin-terminal",
		"name": "Korblox Admin Terminal",
		"tagline": "Type /admin in chat and a terminal opens.",
		"summary": [
			"A draggable in-game console with Tab autofill, command hints and Up/Down history. It opens with a password typed after /admin in chat, which never shows in chat, and five wrong guesses lock you out for the session.",
			"Every line runs on the server: wipe a wave, queue a boss or map for the next floor, or check the run state. The client asks the server for the command list, so autofill always matches what the server defines."
		],
		"files": 2,
		"lines": 433,
		"codeFile": "AdminConsole.client.luau",
		"code": "prompt.FocusLost:Connect(function(enter)\n\tif not enter or not gui.Enabled then return end\n\tlocal line = prompt.Text\n\tprompt.Text = \"\"\n\tif line:match(\"^%s*$\") then prompt:CaptureFocus() return end\n\tif line ~= history[#history] then table.insert(history, line) end\n\tat = #history + 1\n\tout(\"> \" .. line, DIM)\n\tif line:lower():match(\"^%s*close%s*$\") or line:lower():match(\"^%s*exit%s*$\") then hide() return end\n\tlocal ok, res = pcall(remote.InvokeServer, remote, line)\n\tif not ok then\n\t\tout(\"error: \" .. tostring(res), RED)\n\telse\n\t\tres = tostring(res)\n\t\tlocal bad = res:match(\"^unknown\") or res:match(\"^locked\") or res:match(\"^no boss\")\n\t\tout(res, if bad then RED else TEXT)\n\tend\n\tprompt:CaptureFocus()\nend)",
		"group": "Tools",
		"image": "/images/features/hammer.png"
	},
	{
		"slug": "spearhead-vehicle-hits",
		"name": "Spearhead Vehicle Hits",
		"group": "Spearhead add-on",
		"tagline": "Spearhead guns can shoot up the Korblox vehicles.",
		"summary": [
			"Built into the Abrams, AA Truck, Apache and Warthog. Each round a Spearhead gun fires counts once against the vehicle, rockets hit three times as hard, and a blast nearby still does half.",
			"It respects sides: no team damage unless the game allows it, and a reported hit has to land within 3 studs of the part it claims, so a client cannot fake one from across the map. In a game without Spearhead it does nothing."
		],
		"requires": "Spearhead",
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/AI/Shared",
		"files": 1,
		"lines": 113,
		"codeFile": "Spearhead.server.luau",
		"code": "local function canHurt(player)\n\tif human.Health <= 0 or car:GetAttribute(\"Wrecked\") then return false end\n\tlocal side = sideOf(player.Character)\n\tlocal settings = car:FindFirstChild(\"Settings\")\n\tlocal team = settings and settings:FindFirstChild(\"Team\")\n\tif side and team and team.Value == side and not config.teamKill then return false end\n\tfor _,member in ipairs(crew()) do\n\t\tif member == player.Character then return false end\n\t\tif side and sideOf(member) == side and not config.teamKill then return false end\n\t\tlocal memberSettings = member:FindFirstChild(\"Settings\")\n\t\tlocal attackPlayers = memberSettings and memberSettings:FindFirstChild(\"AttackPlayers\")\n\t\tif attackPlayers and not attackPlayers.Value and sideOf(member) ~= \"Hostile\" then return false end\n\tend\n\treturn true\nend\n\nlocal function damage(player,amount)\n\tlocal creator = Instance.new(\"ObjectValue\")\n\tcreator.Name = \"creator\"\n\tcreator.Value = player\n\tcreator.Parent = human\n\tdebris:AddItem(creator,2)\n\thuman:TakeDamage(amount)\nend",
		"image": "/images/features/spearhead.png",
		"studio": false
	},
	{
		"slug": "bloxian",
		"name": "Bloxian Soldiers",
		"tagline": "Soldier NPCs that hunt, take cover, talk and break under fire.",
		"summary": [
			"Bloxians hunt players and other teams: they shoot, reload, throw grenades at clusters, knife anything that gets close, ragdoll when they die and respawn. They fight as fire teams and squads and call contacts out to each other.",
			"Morale drops when a friend dies nearby or they get hit. A shaken soldier aims worse and hides longer; a broken one runs, only firing at anyone who gets close, until he rallies. The Bloxian Spawner tool drops soldiers, sniper teams, AT teams, vehicles and kinetic events wherever you click."
		],
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/AI/Bloxian",
		"files": 38,
		"lines": 11459,
		"codeFile": "MoraleModule.luau",
		"code": "local function witnessLoss(position)\n\tlocal dist = (position - myRoot.Position).Magnitude\n\tif dist <= CLOSE_LOSS_RANGE then\n\t\tchange(-CLOSE_LOSS)\n\telseif dist <= LOSS_RANGE then\n\t\tchange(-LOSS)\n\telse\n\t\treturn\n\tend\n\tthreatAt = threatAt or position\nend\n\n_G.BloxianRadio = _G.BloxianRadio or {}\nlocal radio = _G.BloxianRadio\nif radio[marine] then\n\tradio[marine].moraleLoss = witnessLoss\nend\n\nmyHuman.Died:Connect(function()\n\tlocal at = myRoot.Position\n\tfor other,entry in pairs(radio) do\n\t\tif other ~= marine and entry.moraleLoss and entry.human.Health > 0 and entry.team.Value == teamValue.Value then\n\t\t\ttask.spawn(entry.moraleLoss,at)\n\t\tend\n\tend\nend)\n\nlocal lastHealth = myHuman.Health\nmyHuman.HealthChanged:Connect(function(health)\n\tif health < lastHealth and health > 0 then\n\t\tchange(-HIT_LOSS)\n\tend\n\tlastHealth = health\nend)",
		"image": "/images/features/ai-star-badge.png",
		"group": "AI"
	},
	{
		"slug": "korblox-ai",
		"name": "KorbloxAI",
		"tagline": "The whole AI battle system in one file, with a one-line installer.",
		"summary": [
			"Bloxian soldiers, the spawner tool, the Vehicle Spawner, Warthog, Abrams, Apache, F-4 Phantom, AC-130, AA Truck and Random Arty in a single .rbxm.",
			"Insert it, paste one line into the Command Bar, save. Run it again with a newer file to update: folders merge, everything else is replaced."
		],
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/AI/KorbloxAI",
		"files": 1,
		"lines": 33,
		"codeFile": "Install.luau",
		"code": "local function destination(name)\n\tif name == \"StarterPlayerScripts\" then\n\t\treturn game:GetService(\"StarterPlayer\"):FindFirstChildOfClass(\"StarterPlayerScripts\")\n\tend\n\treturn game:GetService(name)\nend\n\nlocal function move(item,parent)\n\tlocal old = parent:FindFirstChild(item.Name)\n\tif old and old:IsA(\"Folder\") and item:IsA(\"Folder\") then\n\t\tfor _,child in ipairs(item:GetChildren()) do\n\t\t\tmove(child,old)\n\t\tend\n\t\titem:Destroy()\n\t\treturn\n\tend\n\tif old then\n\t\told:Destroy()\n\tend\n\titem.Parent = parent\nend\n\nreturn function()\n\tlocal package = script.Parent\n\tscript.Parent = nil\n\tfor _,signpost in ipairs(package:GetChildren()) do\n\t\tlocal parent = destination(signpost.Name)\n\t\tfor _,item in ipairs(signpost:GetChildren()) do\n\t\t\tmove(item,parent)\n\t\tend\n\t\tprint(\"[KorbloxAI] installed into \"..parent:GetFullName())\n\tend\n\tpackage:Destroy()\n\tprint(\"[KorbloxAI] done. Save the place.\")\nend",
		"image": "/images/features/ai-star-badge.png",
		"group": "AI"
	},
	{
		"slug": "vehicle-spawner",
		"name": "Vehicle Spawner",
		"tagline": "Drop vehicles anywhere, empty, gunner only or fully crewed.",
		"summary": [
			"Adds a Vehicles mode to the Bloxian Spawner. Click the ground and the vehicle lands there facing the way you look, with a marker its size showing where.",
			"Gunner only turns a vehicle into an emplacement. Aircraft come in the air with a full crew, and any model built the same way that you drop in the folder shows up in the list."
		],
		"requires": "Bloxian",
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/AI/Vehicle%20Spawner",
		"files": 1,
		"lines": 247,
		"codeFile": "init.server.luau",
		"code": "local function spawnVehicle(player,position,look,options)\n\tlocal template = templateFor(options.vehicle)\n\tif not template then\n\t\treturn \"No \"..options.vehicle..\" in ServerStorage.\"..FOLDER_NAME\n\tend\n\tif aliveCount() >= MAX_ALIVE then\n\t\treturn \"Server limit reached (\"..MAX_ALIVE..\" vehicles)\"\n\tend\n\tlocal ground = kit.groundAt(position,SOLDIER_TAG,GROUND_HEADROOM)\n\tif not ground then\n\t\treturn \"No ground there\"\n\tend\n\t--One that fights for a side (NeedsTeam, the AC-130) has to be given one.\n\tif template:GetAttribute(\"NeedsTeam\") and options.team == ANY_TEAM then\n\t\treturn \"Pick a team for the \"..template.Name\n\tend\n\t--An aircraft always comes with its whole crew: nobody can get in once it is up.\n\t--One that flies itself (Uncrewed, like the F-4 Phantom) gets none.\n\tif template:GetAttribute(\"Uncrewed\") then\n\t\toptions.crew = \"None\"\n\telseif template:GetAttribute(\"Aircraft\") then\n\t\toptions.crew = \"Full\"\n\tend\n\n\tlocal forward = flat(look)\n\tforward = forward.Magnitude > 0.01 and forward.Unit or Vector3.new(0,0,-1)\n\tlocal turn = CFrame.lookAt(Vector3.zero,forward) * CFrame.lookAt(Vector3.zero,seatLook(template)):Inverse()\n\tlocal pivot = template:GetPivot()\n\tlocal boxCFrame,boxSize = template:GetBoundingBox()\n\tlocal footOffset = pivot.Position.Y - (boxCFrame.Position.Y - boxSize.Y/2)\n\n\tlocal car = template:Clone()\n\tcar:SetAttribute(\"NoRespawn\",true)\n\tif options.crew == \"Gunner\" then\n\t\tcar:SetAttribute(\"GunnerOnly\",true)\n\tend\n\tcar:SetAttribute(\"SpawnedBy\",player.UserId)\n\tcar:AddTag(TAG)\n\tlocal settings = car:FindFirstChild(\"Settings\")\n\tlocal height = 0\n\tif settings then\n\t\tkit.setValue(settings,\"Team\",\"StringValue\",options.team == ANY_TEAM and \"\" or options.team)\n\t\tlocal heightValue = template:GetAttribute(\"Aircraft\") and settings:FindFirstChild(\"Height\")\n\t\theight = heightValue and heightValue.Value or 0\n\tend\n\tcar:PivotTo(CFrame.new(ground + Vector3.new(0,footOffset + 0.5 + height,0)) * turn)\n\tcar.Parent = workspace\n\n\treturn \"Spawned \"..template.Name..crewUp(player,car,ground,forward,footprint(template).X,options)\nend",
		"image": "/images/features/ai-star-badge.png",
		"group": "AI"
	},
	{
		"slug": "abrams",
		"name": "Abrams",
		"tagline": "An M1A2 that Bloxians crew: it hunts, crushes and shells you.",
		"summary": [
			"A driver who hunts and runs people over, and a gunner on the coax machine gun and the 120 mm main gun. Players can drive it too.",
			"The hull is not on physics wheels. The script works out where it should be every frame: it follows the ground, tilts with slopes, climbs bumps up to 2 studs, stops at anything taller and drops off edges."
		],
		"requires": "Bloxian (for NPC crews)",
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/AI/Abrams",
		"files": 2,
		"lines": 921,
		"codeFile": "Tank.server.luau",
		"code": "local function groundUnder(point,bottom)\n\tlocal result = cast(function()\n\t\treturn workspace:Raycast(Vector3.new(point.X,bottom + STEP_HEIGHT + 1,point.Z),Vector3.new(0,-(STEP_HEIGHT + 31),0),castParams)\n\tend)\n\treturn result and result.Position\nend\n\nlocal function blocked(cf,move)\n\tlocal boxSize = Vector3.new(hull.Size.X - 1,hull.Size.Y - STEP_HEIGHT,hull.Size.Z - 1)\n\tlocal boxCFrame = cf * CFrame.new(0,STEP_HEIGHT/2,0)\n\tlocal direction = move + move.Unit*0.5\n\treturn cast(function()\n\t\treturn workspace:Blockcast(boxCFrame,boxSize,direction,castParams)\n\tend) ~= nil\nend",
		"image": "/images/features/ai-star-badge.png",
		"group": "AI"
	},
	{
		"slug": "apache",
		"name": "Apache",
		"tagline": "An AH-64 that Bloxians fly and gun.",
		"summary": [
			"A pilot and a gunner on the M230 chin gun and the Hellfires. When it is shot up the crew bail out on parachutes. Players can fly it too.",
			"It holds its hover height over the highest ground under it and just ahead, climbs straight up off anything it would fly into, and leans and banks with speed and turns."
		],
		"requires": "Bloxian (for NPC crews)",
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/AI/Apache",
		"files": 2,
		"lines": 621,
		"codeFile": "Heli.server.luau",
		"code": "local function fly(dt)\n\tlocal throttle,steer = 0,0\n\tif pilotSeat.Occupant then\n\t\tthrottle = heli:GetAttribute(\"AIThrottle\") or pilotSeat.ThrottleFloat\n\t\tsteer = heli:GetAttribute(\"AISteer\") or pilotSeat.SteerFloat\n\tend\n\tlocal target = throttle >= 0 and throttle*MAX_SPEED or throttle*MAX_REVERSE\n\tspeed += math.clamp(target - speed,-ACCELERATION*dt,ACCELERATION*dt)\n\n\theading = CFrame.fromAxisAngle(Vector3.yAxis,-steer*math.rad(TURN_RATE)*dt) * heading\n\tlocal move = heading*speed*dt\n\tlocal wall = false\n\tif move.Magnitude > 0.01 and blocked(CFrame.lookAt(position,position + heading),move) then\n\t\tspeed = 0\n\t\tmove = Vector3.zero\n\t\twall = true\n\tend\n\n\t--Hold the hover height over the highest ground under it and just ahead.\n\tlocal highest = groundY(position)\n\tlocal reach = math.abs(speed)/MAX_SPEED\n\tfor _,distance in ipairs(LOOK_AHEAD) do\n\t\tlocal ahead = groundY(position + heading*math.sign(speed)*distance*reach)\n\t\tif ahead and (not highest or ahead > highest) then\n\t\t\thighest = ahead\n\t\tend\n\tend\n\tlocal wantY = highest and highest + hoverHeight or position.Y\n\tif wall then\n\t\twantY = position.Y + CLIMB_RATE\n\tend\n\tlocal climb = math.clamp(wantY - position.Y,-CLIMB_RATE*dt,CLIMB_RATE*dt)\n\tposition += move + Vector3.new(0,climb,0)\n\n\tlocal wantPitch = -speed/MAX_SPEED*MAX_PITCH\n\tlocal wantBank = steer*MAX_BANK\n\ttiltPitch += (wantPitch - tiltPitch)*math.min(1,TILT_RATE*dt)\n\ttiltBank += (wantBank - tiltBank)*math.min(1,TILT_RATE*dt)\n\tlocal flight = CFrame.lookAt(Vector3.zero,heading) * CFrame.Angles(math.rad(tiltPitch),0,-math.rad(tiltBank))\n\talignPosition.Position = position\n\talignOrientation.CFrame = flight * noseFrame:Inverse()\n\n\tlocal moving = math.abs(speed)\n\tif math.abs(moving - (heli:GetAttribute(\"Speed\") or 0)) > 0.5 then\n\t\theli:SetAttribute(\"Speed\",moving)\n\tend\nend",
		"image": "/images/features/ai-star-badge.png",
		"group": "AI"
	},
	{
		"slug": "f4-phantom",
		"name": "F-4 Phantom",
		"tagline": "A jet that flies itself: air superiority first, then close air support.",
		"summary": [
			"It hunts every enemy aircraft on the map, AC-130s, other Phantoms and enemy Apaches, then strafes the enemy closest to its own troops. Its pilot ejects when it is shot down.",
			"Each Phantom patrols its own spot off the players, so dogfights break out across the map instead of all on top of them."
		],
		"requires": "Vehicle Spawner",
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/AI/F4",
		"files": 1,
		"lines": 843,
		"codeFile": "Jet.server.luau",
		"code": "local function findAirTarget()\n\tlocal best,bestDist = nil,math.huge\n\tfor _,tag in ipairs(AIR_TAGS) do\n\t\tfor _,craft in ipairs(collectionService:GetTagged(tag)) do\n\t\t\tif craft:IsDescendantOf(workspace) and enemyAircraft(craft) then\n\t\t\t\tlocal dist = (craft.PrimaryPart.Position - position).Magnitude\n\t\t\t\tif dist < bestDist then\n\t\t\t\t\tbest,bestDist = craft,dist\n\t\t\t\tend\n\t\t\tend\n\t\tend\n\tend\n\treturn best\nend\n\n--An enemy Phantom close behind with its nose on this one, if any. One out in\n--front, even pointing straight at it, is a head-on pass, not a threat.\nlocal function onMyTail()\n\tfor _,other in ipairs(collectionService:GetTagged(JET_TAG)) do\n\t\tif other ~= jet and enemyAircraft(other) then\n\t\t\tlocal offset = position - other.PrimaryPart.Position\n\t\t\tlocal behind = math.deg(math.acos(math.clamp(heading:Dot(flat(-offset).Unit),-1,1))) > TAIL_BEHIND\n\t\t\tif offset.Magnitude < TAIL_RANGE and flat(offset).Magnitude > 1 and behind then\n\t\t\t\tlocal aim = math.deg(math.acos(math.clamp(other.PrimaryPart.CFrame.LookVector:Dot(offset.Unit),-1,1)))\n\t\t\t\tif aim < TAIL_ANGLE then\n\t\t\t\t\treturn other\n\t\t\t\tend\n\t\t\tend\n\t\tend\n\tend\n\treturn nil\nend",
		"image": "/images/features/ai-star-badge.png",
		"group": "AI"
	},
	{
		"slug": "ac130",
		"name": "AC-130",
		"tagline": "A gunship that circles overhead and picks its own targets.",
		"summary": [
			"It holds station 700 studs above where it was spawned. Every 30 to 50 seconds it finds the biggest group of enemies nearby, never one with a friend within 30 studs, slides its orbit over them and fires a barrage with no warning.",
			"An enemy F-4 Phantom can shoot it down."
		],
		"requires": "Bloxian, Random Arty",
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/AI/AC130",
		"files": 1,
		"lines": 257,
		"codeFile": "Gunship.server.luau",
		"code": "local function pickTarget()\n\tlocal enemies,friends = {},{}\n\tfor _,person in ipairs(people()) do\n\t\tlocal flat = Vector3.new(person.root.Position.X - station.X,0,person.root.Position.Z - station.Z)\n\t\tif person.view == \"friend\" then\n\t\t\tfriends[#friends+1] = person.root\n\t\telseif person.view == \"enemy\" and flat.Magnitude <= BARRAGE_RANGE then\n\t\t\tenemies[#enemies+1] = person.root\n\t\tend\n\tend\n\n\tlocal best,bestCount = nil,0\n\tfor _,enemy in ipairs(enemies) do\n\t\tlocal safe = true\n\t\tfor _,friend in ipairs(friends) do\n\t\t\tif (friend.Position - enemy.Position).Magnitude < DANGER_CLOSE then\n\t\t\t\tsafe = false\n\t\t\t\tbreak\n\t\t\tend\n\t\tend\n\t\tif safe then\n\t\t\tlocal count = 0\n\t\t\tfor _,other in ipairs(enemies) do\n\t\t\t\tif (other.Position - enemy.Position).Magnitude <= CLUSTER_RADIUS then\n\t\t\t\t\tcount += 1\n\t\t\t\tend\n\t\t\tend\n\t\t\tif count > bestCount then\n\t\t\t\tbest,bestCount = enemy,count\n\t\t\tend\n\t\tend\n\tend\n\treturn best\nend",
		"image": "/images/features/ai-star-badge.png",
		"group": "AI"
	},
	{
		"slug": "aa-truck",
		"name": "AA Truck",
		"tagline": "A BM-21 whose 40 tubes fire homing anti-air rockets.",
		"summary": [
			"Bloxian crews shoot down enemy Phantoms, AC-130s and Apaches. It fires in salvos, then reloads. Players can drive it and run the launcher too.",
			"It drives like the Abrams, held on the ground by script rather than physics wheels, and steers like a truck, turning only while it rolls."
		],
		"requires": "Bloxian, Vehicle Spawner",
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/AI/AA%20Truck",
		"files": 2,
		"lines": 690,
		"codeFile": "Truck.server.luau",
		"code": "--The nearest enemy aircraft the launcher can engage, or nil.\nlocal function findAircraft(side)\n\tlocal best,bestDist = nil,math.huge\n\tfor _,tag in ipairs(AIR_TAGS) do\n\t\tfor _,craft in ipairs(collectionService:GetTagged(tag)) do\n\t\t\tif enemyAircraft(craft,side) and canEngage(craft) then\n\t\t\t\tlocal dist = (craft.PrimaryPart.Position - hull.Position).Magnitude\n\t\t\t\tif dist < bestDist then\n\t\t\t\t\tbest,bestDist = craft,dist\n\t\t\t\tend\n\t\t\tend\n\t\tend\n\tend\n\treturn best\nend\n\nlocal function salvo(craft)\n\tfor shot = 1,math.min(SALVO,rocketsLeft) do\n\t\tif dead or not craft.Parent then break end\n\t\trocketsLeft -= 1\n\t\ttruck:SetAttribute(\"Rockets\",rocketsLeft)\n\t\tlaunchRocket(craft)\n\t\tif shot < SALVO then\n\t\t\ttask.wait(SALVO_GAP)\n\t\tend\n\tend\n\tif rocketsLeft <= 0 and not reloading then\n\t\treloading = true\n\t\ttruck:SetAttribute(\"Reloading\",true)\n\t\ttask.delay(RELOAD_TIME,function()\n\t\t\treloading = false\n\t\t\trocketsLeft = ROCKETS\n\t\t\tif truck.Parent and not dead then\n\t\t\t\ttruck:SetAttribute(\"Rockets\",rocketsLeft)\n\t\t\t\ttruck:SetAttribute(\"Reloading\",nil)\n\t\t\tend\n\t\tend)\n\tend\nend",
		"image": "/images/features/ai-star-badge.png",
		"group": "AI"
	},
	{
		"slug": "warthog",
		"name": "Warthog",
		"tagline": "A turret buggy that Bloxians drive straight at you.",
		"summary": [
			"The driver circles the enemy at about 45 studs so the gunner always has an angle, and goes for anyone on foot to run them over. If the driver dies, the gunner climbs over and takes the wheel.",
			"Players can drive it too. Wrecked, flipped or abandoned, it respawns where you placed it."
		],
		"requires": "Bloxian (for NPC crews)",
		"href": "https://anonymous.4open.science/r/Korblox-Builds-8501/AI/Warthog",
		"files": 2,
		"lines": 390,
		"codeFile": "Listener.server.luau",
		"code": "local function ram(driver,victim)\n\tlocal victimModel = victim.Parent\n\tif victim.Health <= 0 or victimModel:IsDescendantOf(car) then return end\n\tif victim.SeatPart and victim.SeatPart:IsDescendantOf(car) then return end\n\tlocal victimRoot = victim.RootPart\n\tif not victimRoot then return end\n\tlocal now = os.clock()\n\tif now - (lastRammed[victim] or 0) < RAM_COOLDOWN then return end\n\n\t--Never his own side, and an NPC driver spares the players it would not shoot.\n\tlocal driverModel = driver.Parent\n\tlocal driverSide = sideOf(driverModel)\n\tif driverSide and driverSide == sideOf(victimModel) then return end\n\tlocal driverPlayer = players:GetPlayerFromCharacter(driverModel)\n\tlocal victimPlayer = players:GetPlayerFromCharacter(victimModel)\n\tif not driverPlayer and victimPlayer and sparesPlayer(driverModel,driverSide,victimPlayer) then return end\n\n\tlocal offset = victimRoot.Position - body.Position\n\toffset = Vector3.new(offset.X,0,offset.Z)\n\tif offset.Magnitude < 0.1 then return end\n\t--The car's own speed toward him, so running away from it does not save him.\n\tlocal closing = body.AssemblyLinearVelocity:Dot(offset.Unit)\n\tif closing < RAM_MIN_SPEED then return end\n\tlastRammed[victim] = now\n\n\t--Kill credit for a player driver, the way Roblox weapons tag it.\n\tif driverPlayer then\n\t\tlocal creator = Instance.new(\"ObjectValue\")\n\t\tcreator.Name = \"creator\"\n\t\tcreator.Value = driverPlayer\n\t\tcreator.Parent = victim\n\t\tdebris:AddItem(creator,2)\n\tend\n\tvictim:TakeDamage(RAM_BASE_DAMAGE + (closing - RAM_MIN_SPEED)*RAM_DAMAGE)\n\t--An NPC driver watches this to know he got one.\n\tif victim.Health <= 0 then\n\t\tcar:SetAttribute(\"Roadkills\",(car:GetAttribute(\"Roadkills\") or 0) + 1)\n\tend\nend",
		"image": "/images/features/ai-star-badge.png",
		"group": "AI"
	}
];

/** Systems you can download from the repo */
export const packages = features.filter((f) => !f.studio);
export const luauLines = packages.reduce((n, f) => n + (f.lines ?? 0), 0);
