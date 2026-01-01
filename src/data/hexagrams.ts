/**
 * Hexagram data with TypeScript types
 * Minimal data for I-Ching lens display
 */

export interface Hexagram {
    number: number;
    name: string;
    hanzi: string;
    lines: (0 | 1)[]; // 6 lines bottom->top, 1=yang solid, 0=yin broken
    summary: string;
    tags: string[];
}

/**
 * All 64 hexagrams with summaries
 */
export const hexagrams: Hexagram[] = [
    {
        number: 1,
        name: "Qian",
        hanzi: "乾",
        lines: [1, 1, 1, 1, 1, 1],
        summary: "creativity and perseverance, heaven; the qualities of a founder and leader.",
        tags: [
            "initiative",
            "strength",
            "persistence"
        ]
    },
    {
        number: 2,
        name: "Kun",
        hanzi: "坤",
        lines: [0, 0, 0, 0, 0, 0],
        summary: "earth; it is beneficial to behave like a quiet mare. The upper class should take initiative to guide and the lower class should follow.",
        tags: [
            "receptivity",
            "support",
            "patience"
        ]
    },
    {
        number: 3,
        name: "Zhun",
        hanzi: "屯",
        lines: [1, 0, 0, 0, 1, 0],
        summary: "the sprouting of a seed, or difficulty at the beginning. It will be greatly smooth and prosperous after overcoming difficulties by means of perseverance.",
        tags: [
            "birth",
            "potential",
            "organization"
        ]
    },
    {
        number: 4,
        name: "Meng",
        hanzi: "蒙",
        lines: [0, 1, 0, 0, 0, 1],
        summary: "ignorance or the ignorant one; it is not I who seek the ignorant one, it is he who seeks me, and I won’t advise after the third time; it is advantageous to persist.",
        tags: [
            "learning",
            "guidance",
            "development"
        ]
    },
    {
        number: 5,
        name: "Xu",
        hanzi: "需",
        lines: [1, 1, 1, 0, 1, 0],
        summary: "waiting, needing; being captured in something, like being caught in the rain, but finally all will be well and prosperous if one is sincere and persevering.",
        tags: [
            "patience",
            "timing",
            "preparation"
        ]
    },
    {
        number: 6,
        name: "Song",
        hanzi: "訟",
        lines: [0, 1, 0, 1, 1, 1],
        summary: "contention, or arguing with sincerity but being hampered or trapped, so it bodes ill to go through to the end.",
        tags: [
            "tension",
            "mediation",
            "caution"
        ]
    },
    {
        number: 7,
        name: "Shi",
        hanzi: "師",
        lines: [0, 1, 0, 0, 0, 0],
        summary: "the army (or, the multitude); it is right and propitious for a durable and experienced person to lead it.",
        tags: [
            "discipline",
            "leadership",
            "collective"
        ]
    },
    {
        number: 8,
        name: "Bi",
        hanzi: "比",
        lines: [0, 0, 0, 0, 1, 0],
        summary: "helping each other; good fortune originated from people helping each other like water covering the land.",
        tags: [
            "union",
            "alliance",
            "coordination"
        ]
    },
    {
        number: 9,
        name: "Xiao Chu",
        hanzi: "小畜",
        lines: [1, 1, 1, 0, 1, 1],
        summary: "little storage, feeding or restraint; the small serves (and plays games with) the large; the small and the large learn how to get along with each other.",
        tags: [
            "restraint",
            "influence",
            "patience"
        ]
    },
    {
        number: 10,
        name: "Lu",
        hanzi: "履",
        lines: [1, 1, 0, 1, 1, 1],
        summary: "treading on the tail of the tiger but it does not bite.; it will be smooth and prosperous.",
        tags: [
            "conduct",
            "awareness",
            "propriety"
        ]
    },
    {
        number: 11,
        name: "Tai",
        hanzi: "泰",
        lines: [1, 1, 1, 0, 0, 0],
        summary: "peace and prosperity in the form of a good harvest; the small departs and the large approaches, so good fortune and prosperity are expected.",
        tags: [
            "harmony",
            "prosperity",
            "flow"
        ]
    },
    {
        number: 12,
        name: "Pi",
        hanzi: "否",
        lines: [0, 0, 0, 1, 1, 1],
        summary: "blockage or stagnation; the large departs and the small approaches; it is disadvantageous for a gentleman to persist, but good fortune is expected by way of endurance.",
        tags: [
            "stagnation",
            "withdrawal",
            "cultivation"
        ]
    },
    {
        number: 13,
        name: "Tong Ren",
        hanzi: "同人",
        lines: [1, 0, 1, 1, 1, 1],
        summary: "gathering of people in the wild (or outside the city gate or under the heaven); it will be smooth and prosperous and it is advantageous to persist as a gentleman.",
        tags: [
            "community",
            "openness",
            "purpose"
        ]
    },
    {
        number: 14,
        name: "Da You",
        hanzi: "大有",
        lines: [1, 1, 1, 1, 0, 1],
        summary: "great possessing (great harvest or full storage); it will be greatly smooth and prosperous.",
        tags: [
            "abundance",
            "responsibility",
            "generosity"
        ]
    },
    {
        number: 15,
        name: "Qian",
        hanzi: "謙",
        lines: [0, 0, 1, 0, 0, 0],
        summary: "modesty, or being humble; it is smooth and prosperous, and it is advantageous for a gentleman to go through to the end.",
        tags: [
            "humility",
            "balance",
            "completion"
        ]
    },
    {
        number: 16,
        name: "Yu",
        hanzi: "豫",
        lines: [0, 0, 0, 1, 0, 0],
        summary: "satisfaction or happiness; it is advantageous to establish marquisates and dispatch armies.",
        tags: [
            "inspiration",
            "momentum",
            "timing"
        ]
    },
    {
        number: 17,
        name: "Sui",
        hanzi: "隨",
        lines: [1, 0, 0, 1, 1, 0],
        summary: "following (i.e., being followed or to follow); it will be greatly smooth and prosperous, and it is advantageous to persist.",
        tags: [
            "adaptation",
            "flexibility",
            "response"
        ]
    },
    {
        number: 18,
        name: "Gu",
        hanzi: "蠱",
        lines: [0, 1, 1, 0, 0, 1],
        summary: "troubles caused by the father or the mother; it is advantageous to cross a great river and go forward three days before and three days after the start.",
        tags: [
            "repair",
            "renewal",
            "correction"
        ]
    },
    {
        number: 19,
        name: "Lin",
        hanzi: "臨",
        lines: [1, 1, 0, 0, 0, 0],
        summary: "approaching from above with condescending tenderness, or being overseen from a high place. It will be greatly smooth and prosperous, and it is advantageous to persist.",
        tags: [
            "advance",
            "authority",
            "growth"
        ]
    },
    {
        number: 20,
        name: "Guan",
        hanzi: "觀",
        lines: [0, 0, 0, 0, 1, 1],
        summary: "watching or showing; after ablution but before the sacrifice, people look up to him with sincerity and respect.",
        tags: [
            "observation",
            "insight",
            "perspective"
        ]
    },
    {
        number: 21,
        name: "Shi He",
        hanzi: "噬嗑",
        lines: [1, 0, 0, 1, 0, 1],
        summary: "biting and joining, or eliminating by biting; it is advantageous to go to law.",
        tags: [
            "decision",
            "clarity",
            "resolution"
        ]
    },
    {
        number: 22,
        name: "Bi",
        hanzi: "賁",
        lines: [1, 0, 1, 0, 0, 1],
        summary: "grace or adornment, like a fire illuminating the foot of a mountain; it is of little advantage to go somewhere.",
        tags: [
            "beauty",
            "form",
            "refinement"
        ]
    },
    {
        number: 23,
        name: "Bo",
        hanzi: "剝",
        lines: [0, 0, 0, 0, 0, 1],
        summary: "peeling off layer by layer; it is disadvantageous to move forward.",
        tags: [
            "erosion",
            "acceptance",
            "foundation"
        ]
    },
    {
        number: 24,
        name: "Fu",
        hanzi: "復",
        lines: [1, 0, 0, 0, 0, 0],
        summary: "returning, or one masculine line returning; it will be smooth and prosperous without illness.",
        tags: [
            "renewal",
            "turning",
            "beginning"
        ]
    },
    {
        number: 25,
        name: "Wu Wang",
        hanzi: "無妄",
        lines: [1, 0, 0, 1, 1, 1],
        summary: "without falsehood or being loyal; it will be greatly smooth and prosperous, and it is advantageous to persist.",
        tags: [
            "spontaneity",
            "authenticity",
            "naturalness"
        ]
    },
    {
        number: 26,
        name: "Da Chu",
        hanzi: "大畜",
        lines: [1, 1, 1, 0, 0, 1],
        summary: "great storage, great accumulation; it is advantageous to persist, and it is auspicious to eat at home and cross a great river.",
        tags: [
            "accumulation",
            "restraint",
            "concentration"
        ]
    },
    {
        number: 27,
        name: "Yi",
        hanzi: "頤",
        lines: [1, 0, 0, 0, 0, 1],
        summary: "nourishing (the chin or the body); it is auspicious to persist and watch the nourishing and self-nourishing.",
        tags: [
            "sustenance",
            "care",
            "cultivation"
        ]
    },
    {
        number: 28,
        name: "Da Guo",
        hanzi: "大過",
        lines: [0, 1, 1, 1, 1, 0],
        summary: "great excess or overwhelmingly great; the ridgepole is overweighed and bent, so it is advantageous to go somewhere and it will be smooth and prosperous.",
        tags: [
            "excess",
            "crisis",
            "extraordinary"
        ]
    },
    {
        number: 29,
        name: "Kan",
        hanzi: "坎",
        lines: [0, 1, 0, 0, 1, 0],
        summary: "a pit (or, a trap) falling into a pit; it is smooth and prosperous in the heart as the action is valued.",
        tags: [
            "danger",
            "persistence",
            "depth"
        ]
    },
    {
        number: 30,
        name: "Li",
        hanzi: "離",
        lines: [1, 0, 1, 1, 0, 1],
        summary: "brightness, or attaching to; it is advantageous to persist and keep a cow.",
        tags: [
            "clarity",
            "illumination",
            "dependence"
        ]
    },
    {
        number: 31,
        name: "Xian",
        hanzi: "咸",
        lines: [0, 0, 1, 1, 1, 0],
        summary: "mutual influence, or all; it is smooth and prosperous, it is advantageous to persist, and it is auspicious to take a wife.",
        tags: [
            "attraction",
            "resonance",
            "sensitivity"
        ]
    },
    {
        number: 32,
        name: "Heng",
        hanzi: "恆",
        lines: [0, 1, 1, 1, 0, 0],
        summary: "longevity or lasting; it is smooth and prosperous without fault, and it is advantageous to persist and go somewhere.",
        tags: [
            "perseverance",
            "constancy",
            "stability"
        ]
    },
    {
        number: 33,
        name: "Dun",
        hanzi: "遯",
        lines: [0, 0, 1, 1, 1, 1],
        summary: "retreat or withdrawal; it will be smooth and prosperous, and it is of little advantage to persist.",
        tags: [
            "withdrawal",
            "strategy",
            "preservation"
        ]
    },
    {
        number: 34,
        name: "Da Zhuang",
        hanzi: "大壯",
        lines: [1, 1, 1, 1, 0, 0],
        summary: "largeness and strength, or the masculine is strong; the great strength must be guided onto a right track.",
        tags: [
            "strength",
            "vigor",
            "responsibility"
        ]
    },
    {
        number: 35,
        name: "Jin",
        hanzi: "晉",
        lines: [0, 0, 0, 1, 0, 1],
        summary: "advance or promotion; the marquis is granted many horses during the day with three audiences.",
        tags: [
            "advance",
            "promotion",
            "visibility"
        ]
    },
    {
        number: 36,
        name: "Ming Yi",
        hanzi: "明夷",
        lines: [1, 0, 1, 0, 0, 0],
        summary: "brightness being wounded; it is advantageous to persist in difficulty.",
        tags: [
            "concealment",
            "protection",
            "adversity"
        ]
    },
    {
        number: 37,
        name: "Jia Ren",
        hanzi: "家人",
        lines: [1, 0, 1, 0, 1, 1],
        summary: "family members; it is advantageous for a woman to persist.",
        tags: [
            "household",
            "roles",
            "relationships"
        ]
    },
    {
        number: 38,
        name: "Kui",
        hanzi: "睽",
        lines: [1, 1, 0, 1, 0, 1],
        summary: "disjunction or mutual alienation; there is little that will be smooth and prosperous.",
        tags: [
            "divergence",
            "contrast",
            "difference"
        ]
    },
    {
        number: 39,
        name: "Jian",
        hanzi: "蹇",
        lines: [0, 0, 1, 0, 1, 0],
        summary: "difficulty or obstruction; it is advantageous to be in the southwest and disadvantageous to be in the northeast, and it is advantageous to meet a great person and persist.",
        tags: [
            "difficulty",
            "reflection",
            "assistance"
        ]
    },
    {
        number: 40,
        name: "Xie",
        hanzi: "解",
        lines: [0, 1, 0, 1, 0, 0],
        summary: "release, or relief from danger; it is advantageous to be in the southwest, and if going back soon it will be auspicious, but if there is somewhere to go, it is better to act quickly.",
        tags: [
            "release",
            "liberation",
            "forgiveness"
        ]
    },
    {
        number: 41,
        name: "Sun",
        hanzi: "損",
        lines: [1, 1, 0, 0, 0, 1],
        summary: "decrease; sincerity brings great good fortune without fault, it is advantageous to persist and go somewhere, but how to do it? Two plates of food can be used.",
        tags: [
            "reduction",
            "simplification",
            "focus"
        ]
    },
    {
        number: 42,
        name: "Yi",
        hanzi: "益",
        lines: [1, 0, 0, 0, 1, 1],
        summary: "increase; it is advantageous to go somewhere and cross a great river.",
        tags: [
            "growth",
            "benefit",
            "expansion"
        ]
    },
    {
        number: 43,
        name: "Guai",
        hanzi: "夬",
        lines: [1, 1, 1, 1, 1, 0],
        summary: "breakthrough or resolute; it is ominous to face the king's court with weapons showing, but sincerity will bring good fortune, and though there is danger, it is best to act from one's own city, and it is disadvantageous to use force.",
        tags: [
            "resolution",
            "determination",
            "clarity"
        ]
    },
    {
        number: 44,
        name: "Gou",
        hanzi: "姤",
        lines: [0, 1, 1, 1, 1, 1],
        summary: "meeting or encounter; the feminine is strong, do not take this woman.",
        tags: [
            "encounter",
            "influence",
            "awareness"
        ]
    },
    {
        number: 45,
        name: "Cui",
        hanzi: "萃",
        lines: [0, 0, 0, 1, 1, 0],
        summary: "gathering or assembly; it is smooth and prosperous to meet the king at the temple, it is advantageous to meet a great person and persist, and a great sacrifice brings good fortune, it is advantageous to go somewhere.",
        tags: [
            "assembly",
            "concentration",
            "preparation"
        ]
    },
    {
        number: 46,
        name: "Sheng",
        hanzi: "升",
        lines: [0, 1, 1, 0, 0, 0],
        summary: "ascending or promotion; it will be greatly smooth and prosperous, it is advantageous to meet a great person, have no anxiety, and march south will be auspicious.",
        tags: [
            "ascent",
            "effort",
            "development"
        ]
    },
    {
        number: 47,
        name: "Kun",
        hanzi: "困",
        lines: [0, 1, 0, 1, 1, 0],
        summary: "confinement or exhaustion; it will be smooth and prosperous for a great person to persist, but speaking is not believed.",
        tags: [
            "exhaustion",
            "limitation",
            "endurance"
        ]
    },
    {
        number: 48,
        name: "Jing",
        hanzi: "井",
        lines: [0, 1, 1, 0, 1, 0],
        summary: "the well; the city may be changed but not the well, it neither decreases nor increases, people come and go drawing water, if the rope is too short or the pitcher breaks it is ominous.",
        tags: [
            "source",
            "nourishment",
            "foundation"
        ]
    },
    {
        number: 49,
        name: "Ge",
        hanzi: "革",
        lines: [1, 0, 1, 1, 1, 0],
        summary: "revolution or molting; when the day comes, it is believed, greatly smooth and prosperous, it is advantageous to persist, and regret disappears.",
        tags: [
            "change",
            "transformation",
            "renewal"
        ]
    },
    {
        number: 50,
        name: "Ding",
        hanzi: "鼎",
        lines: [0, 1, 1, 1, 0, 1],
        summary: "the cauldron or the ding; it is greatly auspicious and smooth and prosperous.",
        tags: [
            "nourishment",
            "culture",
            "transformation"
        ]
    },
    {
        number: 51,
        name: "Zhen",
        hanzi: "震",
        lines: [1, 0, 0, 1, 0, 0],
        summary: "thunder or shock; it will be smooth and prosperous, but when thunder comes, one is frightened and then laughs, frightening one hundred miles but not dropping the sacrificial spoon and ladle.",
        tags: [
            "shock",
            "awakening",
            "resilience"
        ]
    },
    {
        number: 52,
        name: "Gen",
        hanzi: "艮",
        lines: [0, 0, 1, 0, 0, 1],
        summary: "Keeping Still. Mountains standing close. A time for introspection; one does not permit their thoughts to go beyond the situation.",
        tags: [
            "stillness",
            "meditation",
            "boundary"
        ]
    },
    {
        number: 53,
        name: "Jian",
        hanzi: "漸",
        lines: [0, 0, 1, 0, 1, 1],
        summary: "gradual progress or development; the maiden gets married, good fortune, it is advantageous to persist.",
        tags: [
            "gradual",
            "patience",
            "sequence"
        ]
    },
    {
        number: 54,
        name: "Gui Mei",
        hanzi: "歸妹",
        lines: [1, 1, 0, 1, 0, 0],
        summary: "marrying maiden; to march will be ominous, it is of no advantage.",
        tags: [
            "transition",
            "position",
            "adaptation"
        ]
    },
    {
        number: 55,
        name: "Feng",
        hanzi: "豐",
        lines: [1, 0, 1, 1, 0, 0],
        summary: "abundance or prosperity; it will be smooth and prosperous, the king arrives at it, do not worry, it is like the sun at noon.",
        tags: [
            "fullness",
            "zenith",
            "peak"
        ]
    },
    {
        number: 56,
        name: "Lu",
        hanzi: "旅",
        lines: [0, 0, 1, 1, 0, 1],
        summary: "traveler or stranger; it is of little smoothness and prosperity, but it is auspicious for a traveler to persist.",
        tags: [
            "travel",
            "transience",
            "adaptation"
        ]
    },
    {
        number: 57,
        name: "Xun",
        hanzi: "巽",
        lines: [0, 1, 1, 0, 1, 1],
        summary: "wind or gentle penetration; it is of little smoothness and prosperity, it is advantageous to go somewhere and meet a great person.",
        tags: [
            "penetration",
            "persistence",
            "subtlety"
        ]
    },
    {
        number: 58,
        name: "Dui",
        hanzi: "兌",
        lines: [1, 1, 0, 1, 1, 0],
        summary: "joy or lake; it will be smooth and prosperous, it is advantageous to persist.",
        tags: [
            "joy",
            "openness",
            "exchange"
        ]
    },
    {
        number: 59,
        name: "Huan",
        hanzi: "渙",
        lines: [0, 1, 0, 0, 1, 1],
        summary: "dispersion or dissolution; it will be smooth and prosperous, the king arrives at the temple, it is advantageous to cross a great river and persist.",
        tags: [
            "dissolution",
            "scattering",
            "renewal"
        ]
    },
    {
        number: 60,
        name: "Jie",
        hanzi: "節",
        lines: [1, 1, 0, 0, 1, 0],
        summary: "limitation or节制; it will be smooth and prosperous, but limitation cannot persist if it is bitter.",
        tags: [
            "restraint",
            "boundaries",
            "structure"
        ]
    },
    {
        number: 61,
        name: "Zhong Fu",
        hanzi: "中孚",
        lines: [1, 1, 0, 0, 1, 1],
        summary: "inner truth or sincerity; even pigs and fish are moved, good fortune, it is advantageous to cross a great river and persist.",
        tags: [
            "sincerity",
            "insight",
            "trust"
        ]
    },
    {
        number: 62,
        name: "Xiao Guo",
        hanzi: "小過",
        lines: [0, 0, 1, 1, 0, 0],
        summary: "small excess or passing over a little; it will be smooth and prosperous, it is advantageous to persist, one can do small things but not great things, the flying bird leaves its sound, it is not advisable to go up but down, greatly auspicious.",
        tags: [
            "caution",
            "detail",
            "modesty"
        ]
    },
    {
        number: 63,
        name: "Ji Ji",
        hanzi: "既濟",
        lines: [1, 0, 1, 0, 1, 0],
        summary: "after completion or already crossed; it is of little smoothness and prosperity, it is advantageous to persist, at the beginning it is auspicious but at the end it is disordered.",
        tags: [
            "fulfillment",
            "vigilance",
            "order"
        ]
    },
    {
        number: 64,
        name: "Wei Ji",
        hanzi: "未濟",
        lines: [0, 1, 0, 1, 0, 1],
        summary: "before completion or not yet crossed; it will be smooth and prosperous, but the little fox almost crosses and wets its tail, it is of no advantage.",
        tags: [
            "unfinished",
            "potential",
            "possibility"
        ]
    }
];

/**
 * Get hexagram by number
 */
export function getHexagram(number: number): Hexagram {
    return hexagrams.find((h) => h.number === number) || hexagrams[0];
}

/**
 * Get the Daily Hexagram based on the current date (UTC).
 * Stable for 24 hours.
 */
export function getDailyHexagram(): Hexagram {
    const now = new Date();
    // Use UTC date components to ensure global consistency/stability if needed, 
    // or local if we prefer local midnight update. UTC is usually safer for static sites/consistency.
    const day = now.getUTCFullYear() * 366 + now.getUTCDate(); // Simple hash of the day (approx)
    // Actually, simpler: milliseconds since epoch / ms_in_day
    const dayIndex = Math.floor(now.getTime() / (24 * 60 * 60 * 1000));

    // Use the dayIndex to select a hexagram
    const index = dayIndex % hexagrams.length;
    return hexagrams[index];
}
