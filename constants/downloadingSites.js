export const namesOfDownloadingSites = [
    "tiktok", "douying", "capcut", "threads", "instagram", "facebook", "expn", "pinterest",
    "imdb", "imgur", "ifunny", "izlesene", "reddit", "youtube", "twitter", "vimeo", "snapchat",
    "bilibilli", "dailymotion", "sharechat", "likee", "linkedin", "tumbir", "hipi", "telegra,",
    "getstrickerpack", "bitchute", "fedspot", "9gag", "oke", "rumble", "streamle", "ted", "shohutv", "spotify",
    "bandcamp"
]

export const dataOfSites = [
    {
        iconName: "instagram", title: "Instagram", iconColor: "purple", onPress: (setTitle, setView) => {
            setTitle("https://www.instagram.com");
            setView(true);
        }
    },
    {
        iconName: "facebook", title: "Facebook", iconColor: "blue", onPress: (setTitle, setView) => {
            setTitle("https://www.facebook.com");
            setView(true);
        }
    },
    {
        iconName: "youtube", title: "Youtube", iconColor: "red", onPress: (setTitle, setView) => {
            setTitle("https://www.youtube.com");
            setView(true);
        }
    },
    {
        iconName: "vimeo", title: "Vimeo", iconColor: "lightblue", onPress: (setTitle, setView) => {
            setTitle("https://www.vimeo.com");
            setView(true);
        }
    },
    {
        iconName: "twitter", title: "Twitter", iconColor: "blue", onPress: (setTitle, setView) => {
            setTitle("https://www.twitter.com");
            setView(true);
        }
    },
    {
        iconImage: require("../assets/icons/douyin.png"), title: "Douyin", iconColor: "blue", onPress: (setTitle, setView) => {
            setTitle("https://www.douyin.com");
            setView(true);
        }
    },
    // Yangi saytlar qo'shildi
    {
        iconName: "tiktok", title: "TikTok", iconColor: "#FE2C55", onPress: (setTitle, setView) => {
            setTitle("https://www.tiktok.com");
            setView(true);
        }
    },
    {
        iconImage: require("../assets/icons/capcut.png"), title: "CapCut", iconColor: "#000000", onPress: (setTitle, setView) => {
            setTitle("https://www.capcut.com");
            setView(true);
        }
    },
    {
        iconImage: require("../assets/icons/threads.png"), title: "Threads", iconColor: "#121212", onPress: (setTitle, setView) => {
            setTitle("https://www.threads.net");
            setView(true);
        }
    },
    {
        iconImage: require("../assets/icons/pinterest.png"), title: "Pinterest", iconColor: "#E60023", onPress: (setTitle, setView) => {
            setTitle("https://www.pinterest.com");
            setView(true);
        }
    },
    {
        iconImage: require("../assets/icons/reddit.png"), title: "Reddit", iconColor: "#FF4500", onPress: (setTitle, setView) => {
            setTitle("https://www.reddit.com");
            setView(true);
        }
    },
    {
        iconImage: require("../assets/icons/linkedin.png"), title: "LinkedIn", iconColor: "#0077B5", onPress: (setTitle, setView) => {
            setTitle("https://www.linkedin.com");
            setView(true);
        }
    }
];
