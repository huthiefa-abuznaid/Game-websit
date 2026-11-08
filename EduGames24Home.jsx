import { useEffect, useMemo, useState } from "react";

/* ------------------------------------------------------------------
   EduGames24 – Home page (RTL, Arabic). Single file, no dependencies
   besides React. Edit the DATA section below to change content; edit
   the CSS string at the bottom to change the look.
   Add this to your <head> once (Arabic font):
   <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">
------------------------------------------------------------------- */

/* ============================ DATA ============================== */
const BRAND = "EduGames24";

export const SUBJECTS = [
  ["الأشكال", "Shapes"],
  ["العد", "Counting"],
  ["الإضافة", "Addition"],
  ["الطرح", "Subtraction"],
  ["الضرب", "Multiplication"],
  ["القسمة", "Division"],
  ["الأرقام", "Numbers"],
  ["المال", "Money"],
  ["الوقت", "Time"],
  ["الكسور العشرية", "Decimals"],
  ["الكسور", "Fractions"],
  ["النسبة والنسبة", "Ratios"],
  ["الجبر", "Algebra"],
  ["اللغة", "Language"],
  ["الفنون", "Arts"],
  ["الإملاء", "Spelling"],
  ["الكتابة", "Writing"],
  ["الجغرافيا", "Geography"],
];
const GRADES = Array.from({ length: 12 }, (_, i) => i + 1);
const AGES = Array.from({ length: 9 }, (_, i) => i + 6);

const GAME_DATA = [
  ["مضاعفة الجائزة الكبرى", "الضرب"],
  ["سباق الفضاء", "الضرب"],
  ["القفز البطريق", "الجمع"],
  ["ضرب الجرار", "الضرب"],
  ["طيور البطريق الزورق", "الضرب"],
  ["الضرب النيزكي", "الضرب"],
  ["قسم سباق السحب", "القسمة"],
  ["شعبة المهر", "القسمة"],
  ["تقسيم ديربي", "القسمة"],
  ["شعبة الهدم", "القسمة"],
  ["إضافة جت سكي", "الجمع"],
  ["مباراة هريرة", "الجمع"],
  ["الجراء الزورق", "الجمع"],
  ["إضافة القاطرة", "الجمع"],
  ["إضافة أجنبي", "الجمع"],
  ["الطرح مطاردة الجزيرة", "الطرح"],
  ["سباق الحبيب", "الطرح"],
  ["طرح المراكب الشراعية", "الطرح"],
  ["ناقص المهمة", "الطرح"],
  ["السلاحف الترادفية", "الطرح"],
  ["رحلة الفضاء", "الكسور"],
  ["نسبة الناسف", "النسبة"],
  ["ملعب النسبة", "النسبة"],
  ["نسبة المريخ", "النسبة"],
  ["نسب الدراجة الترابية", "النسبة"],
  ["سباق الثلج", "الكسور"],
  ["سبيدواي", "الكسور"],
  ["الدراجة الترابية مقارنة الكسر", "الكسور"],
  ["بيتزا الباندا", "الكسور"],
  ["جرو تشيس", "الكسور"],
  ["الجراء الجياع", "الكسور"],
  ["جرو سحب", "الكسور"],
  ["قضاعة راش", "الكسور"],
  ["ثعالب للسباحة", "الكسور"],
  ["هوفيربواردز المريخية", "الكسور"],
  ["أربع عجلات فراكاس", "الكسور"],
  ["القفز على الأجانب", "الكسور"],
  ["الجراء لوح التزلج", "الكسور"],
  ["مباراة العنكبوت", "الأعداد الصحيحة"],
  ["أوربت عدد صحيح", "الأعداد الصحيحة"],
  ["عدد صحيح انفتل", "الأعداد الصحيحة"],
  ["قفز الكتاكيت", "الأعداد الصحيحة"],
  ["كوالا كارتس", "الأعداد الصحيحة"],
  ["كنغر هوب", "الأعداد الصحيحة"],
  ["الزرافة داش", "الأعداد الصحيحة"],
  ["سحب الزرافة", "الأعداد الصحيحة"],
  ["تهجئة النحل", "اللغة"],
  ["كوالا Paddleboards", "اللغة"],
  ["هريرة هوب", "اللغة"],
  ["سلحفاة داش", "اللغة"],
  ["جرو هوب", "اللغة"],
  ["ضفادع غاضبة", "اللغة"],
  ["تغذية الفيل", "اللغة"],
  ["علف الأخطبوط", "اللغة"],
  ["قارب الوفير باش", "اللغة"],
  ["البلد العلجوم", "اللغة"],
  ["ضفدع هوب", "اللغة"],
  ["طائرات البومة", "اللغة"],
  ["كتابة الطائرات", "اللغة"],
  ["مطاردة السماء", "اللغة"],
];
export const GAME_NAMES_EN = [
  "Multiplication Grand Prix",
  "Space Race",
  "Penguin Jump",
  "Tractor Pull",
  "Canoe Penguins",
  "Meteor Multiplication",
  "Division Drag Race",
  "Pony Division",
  "Division Derby",
  "Division Demolition",
  "Addition Jet Ski",
  "Kitten Match",
  "Puppy Canoe",
  "Addition Locomotive",
  "Alien Addition",
  "Subtraction Island Chase",
  "Sweetheart Race",
  "Subtraction Sailboats",
  "Mission Subtract",
  "Tandem Turtles",
  "Space Trek",
  "Ratio Blaster",
  "Ratio Stadium",
  "Mars Ratio",
  "Dirt Bike Ratios",
  "Snow Race",
  "Speedway",
  "Dirt Bike Fraction Comparison",
  "Panda Pizza",
  "Puppy Chase",
  "Hungry Puppies",
  "Puppy Pull",
  "Otter Rush",
  "Foxes Swimming",
  "Mars Hoverboards",
  "Four Wheel Fracas",
  "Alien Jump",
  "Puppies Skateboard",
  "Spider Match",
  "Integer Orbit",
  "Integer Twist",
  "Chick Jump",
  "Koala Karts",
  "Kangaroo Hop",
  "Giraffe Dash",
  "Giraffe Pull",
  "Bee Spelling",
  "Koala Paddleboards",
  "Kitten Hop",
  "Turtle Dash",
  "Puppy Hop",
  "Angry Frogs",
  "Feed the Elephant",
  "Octopus Feed",
  "Bumper Boat Bash",
  "Toad Country",
  "Frog Hop",
  "Owl Planes",
  "Typing Planes",
  "Sky Chase",
];
const COPY = {
  ar: {
    language: "العربية",
    switchLanguage: "English",
    menu: "فتح القائمة",
    nav: ["الصفوف", "المواد", "الأعمار"],
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    kicker: "🌟 مغامرات تعليمية ممتعة كل يوم!",
    heroTitle: ["تعلّم، العب، ", "واكتشف العالم!", " 🚀"],
    heroDescription: "انطلق في رحلة مليئة بالألعاب والتحديات الممتعة! تعلّم الرياضيات واللغة والمزيد من المهارات من الصف الأول حتى الثاني عشر.",
    searchLabel: "ابحث عن لعبة",
    searchPlaceholder: "ابحث عن لعبة أو مادة",
    searchButton: "بحث",
    startPlaying: "ابدأ اللعب",
    browseGrades: "استعرض حسب الصف",
    gamesTitle: "اختر مغامرتك التعليمية",
    gamesDescription: "ألعاب ممتعة لكل مهارة ولكل صف!",
    subjects: "المواد",
    grades: "الصف",
    ages: "العمر",
    allSubjects: "كل المواد",
    allGrades: "كل الصفوف",
    grade: "الصف",
    allAges: "كل الأعمار",
    years: "سنوات",
    noGames: "لا توجد ألعاب مطابقة. جرّب مادة أو صفاً آخر.",
    playNow: "العب الآن",
    viewGame: "عرض التفاصيل",
    viewAllGames: "عرض كل الألعاب",
    rolesTitle: "ابدأ حسب دورك",
    rolesDescription: "مساحة تعليمية تناسب الجميع",
    roleLogin: "دخول",
    followTitle: "تابع ألعاب تفاعلية",
    followDescription: "للاطّلاع على لمحات عن الألعاب الجديدة والعروض الخاصة والمدونات الإرشادية.",
    appTitle: "العب في أي وقت ومن أي مكان",
    appDescription: "تعمل الألعاب على المتصفح، وتتوفر تطبيقات للأجهزة اللوحية.",
    home: "الرئيسية",
    about: "من نحن",
    contact: "اتصل بنا",
    footer: "ألعاب تفاعلية وتعليمية",
  },
  en: {
    language: "English",
    switchLanguage: "العربية",
    menu: "Open menu",
    nav: ["Grades", "Subjects", "Ages"],
    login: "Log in",
    signup: "Sign up",
    kicker: "🌟 Fun learning adventures every day!",
    heroTitle: ["Learn, play, ", "and explore the world!", " 🚀"],
    heroDescription: "Embark on a journey full of fun games and challenges! Learn math, language, and more—from first through twelfth grade.",
    searchLabel: "Search games",
    searchPlaceholder: "Search for a game or subject",
    searchButton: "Search",
    startPlaying: "Start playing",
    browseGrades: "Browse by grade",
    gamesTitle: "Choose your learning adventure",
    gamesDescription: "Fun games for every skill and every grade!",
    subjects: "Subjects",
    grades: "Grade",
    ages: "Age",
    allSubjects: "All subjects",
    allGrades: "All grades",
    grade: "Grade",
    allAges: "All ages",
    years: "years",
    noGames: "No matching games. Try another subject or grade.",
    playNow: "Play now",
    viewGame: "View details",
    viewAllGames: "View all games",
    rolesTitle: "Get started by role",
    rolesDescription: "A learning space for everyone",
    roleLogin: "Log in",
    followTitle: "Follow Interactive Games",
    followDescription: "Get sneak peeks of new games, special offers, and how-to blogs!",
    appTitle: "Play anytime, anywhere",
    appDescription: "Our games use the latest HTML5 technology and work seamlessly in your browser on any device. Apps are also available for iPad and Android tablets.",
    home: "Home",
    about: "About us",
    contact: "Contact us",
    footer: "Interactive educational games",
  },
};
const GAME_COLORS = ["#DCEBFF", "#DDF3E8", "#FFE9D6", "#ECE6FF"];
const GAME_FILTER_TAGS = `
5:345:34567
5:345:34567
5:345:34567
5:345:34567
5:456:34567
5:345:34567
6:345:34567
6:345:34567
6:345:34567
6:345:34567
3:123:1234
3:123:1234
3:2345:34567
3:123:1234
3:123:1234
4:123:1234
4:123:1234
4:123:1234
4:123:1234
7:345:34567
7:345:34567
12:345:5678
12:345:5678
12:345:5678
13:345:5678
11:56:5678
11:56:5678
11:345:5678
11:345:5678
10:456:5678
10:56:5678
10:456:5678
13:56:6789
13:3456:6789
5:56:6789
3:6:6789
5:6:6789
3:2345:6789
7:6:4567
7:6:4567
7:6:5678
2:1:1234
5:1:1234
1:23:23456
9:234:3456
9:234:3456
16:3456:34567
16:456:34567
16:1234:2345
16:345:2345
16:1:123
14:45:34567
14:45:34567
14:45:34567
14:234:34567
18:456:3456
18:456:3456
17:3456:34567
17:2345:34567
17:3456:34567
`
  .trim()
  .split(/\s+/)
  .map((entry) => {
    const [subject, grades, ages] = entry.split(":");
    return {
      subject: Number(subject),
      grades: [...grades].map(Number),
      ages: [...ages].map((value) => Number(value) + 5),
    };
  });
const GAME_ICON_FILES = import.meta.glob("./EduGames24_Game_Icons_JPG/*.jpg", {
  eager: true,
  import: "default",
  query: "?url",
});
const normalizeGameName = (name) => name.normalize("NFC").replace(/[\s_-]+/g, "").toLowerCase();
const GAME_ICON_ALIASES = {
  "ثعالب للسباحة": "ثعالب السباحة",
  "هوفيربواردز المريخية": "هوفيربوردز المريخية",
};
const GAME_ICONS_BY_NAME = new Map(
  Object.entries(GAME_ICON_FILES).map(([path, url]) => [
    normalizeGameName(path.split("/").pop().replace(/^\d+_/, "").replace(/\.jpg$/i, "")),
    url,
  ])
);
export const GAMES = GAME_DATA.map(([name], index) => ({
  ...GAME_FILTER_TAGS[index],
  id: index + 1,
  name,
  subjectId: GAME_FILTER_TAGS[index].subject,
  color: GAME_COLORS[index % GAME_COLORS.length],
  image: GAME_ICONS_BY_NAME.get(normalizeGameName(GAME_ICON_ALIASES[name] || name)) || "",
}));

const ROLES = [
  { key: "student", title: "طالب", text: "العب واحفظ تقدمك ونقاطك", href: "/login.html?role=student" },
  { key: "teacher", title: "معلم", text: "أنشئ صفاً وتابع نتائج طلابك", href: "/login.html?role=teacher" },
  { key: "school", title: "مدرسة", text: "أدر حسابات المعلمين والصفوف", href: "/login.html?role=school" },
];

const LINKS = {
  allGames: "/games/category",
  login: "/login.html?role=student",
  signup: "/register.html",
  play: (id) => `/games/play/${id}`,
  game: (id) => `/game.html?id=${id}`,
  home: "/home",
  about: "/sitepages/topic/39",
  contact: "/contact",
};

/* ========================== COMPONENT =========================== */
export default function EduGames24Home({ games = GAMES, onNavigate }) {
  const [language, setLanguage] = useState(() => {
    try {
      return window.localStorage.getItem("edugames24-language") === "en" ? "en" : "ar";
    } catch {
      return "ar";
    }
  });
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [age, setAge] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = COPY[language];
  const isEnglish = language === "en";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isEnglish ? "ltr" : "rtl";
  }, [language, isEnglish]);

  const filtered = useMemo(
    () =>
      games.filter(
        (g) =>
          (!query || `${isEnglish ? GAME_NAMES_EN[g.id - 1] : g.name} ${SUBJECTS[g.subjectId - 1][language === "en" ? 1 : 0]}`.toLowerCase().includes(query.trim().toLowerCase())) &&
          (!subject || g.subjectId === Number(subject)) &&
          (!grade || g.grades.includes(Number(grade))) &&
          (!age || g.ages.includes(Number(age)))
      ),
    [games, query, subject, grade, age, isEnglish, language]
  );

  const changeLanguage = () => {
    const nextLanguage = isEnglish ? "ar" : "en";
    setLanguage(nextLanguage);
    try {
      window.localStorage.setItem("edugames24-language", nextLanguage);
    } catch {
      // The language switch still works when browser storage is unavailable.
    }
  };

  const go = (e, href) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <div dir={isEnglish ? "ltr" : "rtl"} lang={language} className={"eg" + (isEnglish ? " eg-en" : "")}>
      <style>{CSS}</style>

      {/* Header */}
      <header className="eg-header">
        <a className="eg-logo" href="/">{BRAND}</a>
        <button className="eg-menu-toggle" type="button" aria-label={copy.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <nav className={"eg-nav" + (menuOpen ? " eg-nav-open" : "")} aria-label={copy.nav.join(", ")}>
          <a href="#grades">{copy.nav[0]}</a>
          <a href="#subjects">{copy.nav[1]}</a>
          <a href="#ages">{copy.nav[2]}</a>
        </nav>
        <span className="eg-grow" />
        <button className="eg-chip eg-language" type="button" lang={isEnglish ? "ar" : "en"} onClick={changeLanguage}>{copy.switchLanguage}</button>
        <a className="eg-btn eg-ghost" href={LINKS.login} onClick={(e) => go(e, LINKS.login)}>{copy.login}</a>
        <a className="eg-btn" href={LINKS.signup} onClick={(e) => go(e, LINKS.signup)}>{copy.signup}</a>
      </header>

      {/* Hero */}
      <section className="eg-hero">
        <div className="eg-hero-text">
          <span className="eg-kicker">{copy.kicker}</span>
          <h1>{copy.heroTitle[0]}<span>{copy.heroTitle[1]}</span>{copy.heroTitle[2]}</h1>
          <p>{copy.heroDescription}</p>
          <form className="eg-search" role="search" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="eg-q" className="eg-sr">{copy.searchLabel}</label>
            <input id="eg-q" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={copy.searchPlaceholder} />
            <button className="eg-btn" type="submit">{copy.searchButton}</button>
          </form>
          <div className="eg-row">
            <a className="eg-btn eg-big" href={LINKS.allGames} onClick={(e) => go(e, LINKS.allGames)}>{copy.startPlaying}</a>
            <a className="eg-btn eg-ghost eg-big" href="#games">{copy.browseGrades}</a>
          </div>
        </div>
        <div className="eg-art" aria-hidden="true">
          <span className="eg-spark eg-spark-one">⭐</span><span className="eg-spark eg-spark-two">✨</span>
          <span className="eg-cloud">☁️</span>
          <span className="eg-character eg-character-bear">🐻</span>
          <span className="eg-character eg-character-fox">🦊</span>
          <span className="eg-character eg-character-panda">🐼</span>
          <span className="eg-book">📚</span>
          <span className="eg-rocket">🚀</span>
          <span className="eg-art-caption">اللعب طريقنا للتعلّم! 🎈</span>
        </div>
      </section>

      {/* Filters */}
      <section className="eg-sec" id="games">
        <div className="eg-section-heading"><span>🎮</span><div><h2>{copy.gamesTitle}</h2><p>{copy.gamesDescription}</p></div></div>
        <div className="eg-filters">
          <div className="eg-filter-group" id="subjects">
            <strong className="eg-filter-label">{copy.subjects}</strong>
            <div className="eg-chips" aria-label={copy.subjects}>
              <button type="button" className={"eg-chip" + (!subject ? " on" : "")} aria-pressed={!subject} onClick={() => setSubject("")}>{copy.allSubjects}</button>
              {SUBJECTS.map((s, index) => (
                <button key={s[1]} type="button" className={"eg-chip" + (subject === String(index + 1) ? " on" : "")} aria-pressed={subject === String(index + 1)} onClick={() => setSubject(subject === String(index + 1) ? "" : String(index + 1))}>{s[isEnglish ? 1 : 0]}</button>
              ))}
            </div>
          </div>
          <div className="eg-filter-group" id="grades">
            <strong className="eg-filter-label">{copy.grades}</strong>
            <div className="eg-chips" aria-label={copy.grades}>
              <button type="button" className={"eg-chip" + (!grade ? " on" : "")} aria-pressed={!grade} onClick={() => setGrade("")}>{copy.allGrades}</button>
              {GRADES.map((g) => (
                <button key={g} type="button" className={"eg-chip" + (grade === String(g) ? " on" : "")} aria-pressed={grade === String(g)} onClick={() => setGrade(grade === String(g) ? "" : String(g))}>{copy.grade} {g}</button>
              ))}
            </div>
          </div>
          <div className="eg-filter-group" id="ages">
            <strong className="eg-filter-label">{copy.ages}</strong>
            <div className="eg-chips" aria-label={copy.ages}>
              <button type="button" className={"eg-chip" + (!age ? " on" : "")} aria-pressed={!age} onClick={() => setAge("")}>{copy.allAges}</button>
              {AGES.map((a) => (
                <button key={a} type="button" className={"eg-chip" + (age === String(a) ? " on" : "")} aria-pressed={age === String(a)} onClick={() => setAge(age === String(a) ? "" : String(a))}>{a} {isEnglish ? copy.years : ""}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="eg-grid" aria-live="polite">
        {filtered.length === 0 && <p className="eg-empty">{copy.noGames}</p>}
        {filtered.map((g) => (
          <article className="eg-card" key={g.id}>
            <div className="eg-thumb" style={{ background: g.color }}>
              {g.image ? <img src={g.image} alt="" loading="lazy" /> : <span className="eg-dot" aria-hidden="true">🎮</span>}
            </div>
            <div className="eg-cb">
              <span className="eg-tag">{SUBJECTS[g.subjectId - 1][isEnglish ? 1 : 0]}</span>
              <strong>{isEnglish ? GAME_NAMES_EN[g.id - 1] : g.name}</strong>
              <a href={LINKS.game(g.id)}>{copy.viewGame} <span aria-hidden="true">{isEnglish ? "→" : "←"}</span></a>
            </div>
          </article>
        ))}
      </section>

      <div className="eg-center">
        <a className="eg-btn eg-ghost" href={LINKS.allGames} onClick={(e) => go(e, LINKS.allGames)}>{copy.viewAllGames}</a>
      </div>

      <section className="eg-roles">
        <div className="eg-section-heading"><span aria-hidden="true">✨</span><div><h2>{copy.rolesTitle}</h2><p>{copy.rolesDescription}</p></div></div>
        <div className="eg-roles-grid">
          {ROLES.map((r) => (
            <article className="eg-role" key={r.key}>
              <span className="eg-role-icon" aria-hidden="true">{r.key === "student" ? "🎒" : r.key === "teacher" ? "👩‍🏫" : "🏫"}</span>
              <strong>{isEnglish ? { student: "Student", teacher: "Teacher", school: "School" }[r.key] : r.title}</strong>
              <span>{isEnglish ? {
                student: "Play and save your progress and points",
                teacher: "Create a class and track your students' results",
                school: "Manage teacher accounts and classes",
              }[r.key] : r.text}</span>
              <a className="eg-btn" href={r.href} onClick={(e) => go(e, r.href)}>{copy.roleLogin} {isEnglish ? { student: "as a student", teacher: "as a teacher", school: "as a school" }[r.key] : r.title}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="eg-follow">
        <h2>{copy.followTitle}</h2>
        <p>{copy.followDescription}</p>
      </section>

      <section className="eg-app">
        <div>
          <h2>{copy.appTitle}</h2>
          <p>{copy.appDescription}</p>
        </div>
        <a className="eg-btn eg-ghost" href="#">{isEnglish ? "App Store" : "ابل ستور"}</a>
        <a className="eg-btn eg-ghost" href="#">{isEnglish ? "Google Play" : "جوجل بلاي"}</a>
      </section>

      <footer className="eg-footer">
        <strong>{copy.footer}</strong>
        <span className="eg-grow" />
        <a href={LINKS.home}>{copy.home}</a>
        <a href={LINKS.about}>{copy.about}</a>
        <a href={LINKS.contact}>{copy.contact}</a>
      </footer>
    </div>
  );
}

const CSS = `
.eg{--ink:#1f2a44;--muted:#58617d;--accent:#5661db;--line:#dfe3ef;--soft:#f1f3fc;--bg:#fcfcfa;
  max-width:1360px;margin:0 auto;background:var(--bg);color:var(--ink);font-family:"Tajawal",system-ui,sans-serif;overflow:hidden}
.eg.eg-en{font-family:Arial,system-ui,sans-serif}
.eg *{box-sizing:border-box}
.eg a{color:inherit;text-decoration:none}
.eg-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.eg-grow{flex:1}
.eg-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:0 22px;border:1.5px solid var(--accent);
  border-radius:999px;background:var(--accent);color:#fff!important;font:700 16px "Tajawal",sans-serif;cursor:pointer;transition:transform .2s,box-shadow .2s}
.eg-btn.eg-ghost{background:#fff;color:var(--ink)!important;border-color:var(--line)}
.eg-btn.eg-big{min-height:52px;font-size:18px}
.eg-btn:hover{transform:translateY(-2px);box-shadow:0 8px 18px #28357920}
.eg-chip{display:inline-flex;align-items:center;min-height:42px;padding:0 16px;border:1.5px solid var(--line);border-radius:999px;
  background:#fff;color:var(--ink);font:500 15px "Tajawal",sans-serif;cursor:pointer;white-space:nowrap}
.eg-chip.on{background:var(--ink);border-color:var(--ink);color:#fff}
.eg :is(a,button,input,select):focus-visible{outline:3px solid #f2a900;outline-offset:3px}
.eg-header{position:relative;z-index:2;display:flex;align-items:center;gap:12px;padding:16px 48px;background:#fff;border-bottom:1px solid #e8eaf2}
.eg-logo{font-size:26px;font-weight:800;color:var(--accent)!important}
.eg-nav{display:flex;gap:20px;margin-inline-start:24px;font-weight:700}
.eg-nav a:hover,.eg-footer a:hover{color:var(--accent)}
.eg-menu-toggle{display:none;border:0;background:transparent;color:var(--ink);font-size:24px;cursor:pointer}
.eg-hero{position:relative;display:flex;align-items:center;gap:40px;padding:58px 48px;background:var(--soft)}
.eg-hero-text{position:relative;z-index:1;flex:1;display:flex;flex-direction:column;align-items:flex-start;gap:18px}
.eg-kicker{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border:1px solid #e0ddff;border-radius:999px;background:#fff;color:#525ac5;font-weight:700}
.eg-hero h1{margin:0;font-size:clamp(38px,5vw,62px);line-height:1.2;font-weight:800}
.eg-hero h1 span{color:var(--accent)}
.eg-hero p{max-width:560px;margin:0;color:var(--muted);font-size:20px;line-height:1.8}
.eg-search{display:flex;width:min(100%,560px);gap:8px;padding:7px;border:1.5px solid var(--line);border-radius:999px;background:#fff}
.eg-search input{flex:1;min-width:0;padding:0 16px;border:0;background:none;color:var(--ink);font:500 17px "Tajawal",sans-serif}
.eg-search input:focus-visible{outline:0}
.eg-row{display:flex;gap:12px;flex-wrap:wrap}
.eg-art{position:relative;width:min(38%,420px);height:320px;flex-shrink:0;border-radius:36px;background:linear-gradient(145deg,#dceaff,#e9e5ff);overflow:hidden}
.eg-art:before,.eg-art:after{position:absolute;content:"";border-radius:50%;background:#fff9}
.eg-art:before{width:180px;height:180px;right:-30px;top:-50px}
.eg-art:after{width:130px;height:130px;left:-32px;bottom:-48px}
.eg-character,.eg-book,.eg-rocket,.eg-cloud,.eg-spark{position:absolute;display:block;filter:drop-shadow(0 8px 8px #29335218)}
.eg-character{font-size:70px;animation:eg-bob 3s ease-in-out infinite}
.eg-character-bear{left:50%;top:92px;transform:translateX(-50%);font-size:92px;animation-delay:-.5s}
.eg-character-fox{left:44px;bottom:60px;font-size:62px;animation-delay:-1.3s}
.eg-character-panda{right:38px;bottom:49px;font-size:66px;animation-delay:-.9s}
.eg-book{left:45%;bottom:22px;font-size:43px;animation:eg-bob 3.5s ease-in-out infinite}
.eg-rocket{right:36px;top:24px;font-size:48px;animation:eg-float 4s ease-in-out infinite}
.eg-cloud{left:28px;top:26px;font-size:48px;animation:eg-float 5s ease-in-out infinite}
.eg-spark{font-size:25px;animation:eg-twinkle 2s ease-in-out infinite}
.eg-spark-one{right:31%;top:42px}
.eg-spark-two{left:30%;bottom:65px;animation-delay:.7s}
.eg-art-caption{position:absolute;z-index:1;right:50%;bottom:15px;transform:translateX(50%);width:max-content;padding:6px 14px;border-radius:999px;background:#fff;color:var(--ink);font-weight:700}
@keyframes eg-bob{0%,100%{translate:0 0}50%{translate:0 -10px}}
@keyframes eg-float{0%,100%{translate:0 0;rotate:-5deg}50%{translate:0 -12px;rotate:5deg}}
@keyframes eg-twinkle{0%,100%{scale:.85;opacity:.65}50%{scale:1.2;opacity:1}}
.eg-sec{display:flex;flex-direction:column;gap:18px;padding:38px 48px 8px}
.eg-section-heading{display:flex;align-items:center;gap:14px}
.eg-section-heading>span{display:grid;width:52px;height:52px;place-items:center;border-radius:17px;background:#ecebff;font-size:26px}
.eg-section-heading h2,.eg h2{margin:0;font-size:28px}
.eg-section-heading p{margin:3px 0 0;color:var(--muted)}
.eg-filters{display:flex;flex-direction:column;gap:14px}
.eg-filter-group{display:grid;grid-template-columns:76px minmax(0,1fr);align-items:start;gap:10px}
.eg-filter-label{padding-top:10px}
.eg-chips{display:flex;gap:8px;flex-wrap:wrap}
.eg-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;padding:22px 48px}
.eg-empty{grid-column:1/-1;padding:20px;text-align:center;color:var(--muted);font-size:18px}
.eg-card{overflow:hidden;display:flex;flex-direction:column;border:1px solid #e8eaf2;border-radius:20px;background:#fff;transition:transform .2s,box-shadow .2s}
.eg-card:hover{transform:translateY(-4px);box-shadow:0 12px 26px #28357914}
.eg-thumb{position:relative;height:150px;display:grid;place-items:center;overflow:hidden}
.eg-thumb img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top}
.eg-dot{display:grid;width:76px;height:76px;place-items:center;border-radius:50%;background:#ffffffd9;font-size:36px}
.eg-cb{display:flex;flex-direction:column;align-items:flex-start;gap:7px;padding:14px 16px}
.eg-cb strong{font-size:18px}
.eg-cb a{color:var(--accent);font-weight:700}
.eg-tag{padding:2px 10px;border-radius:999px;background:#eef0fa;color:#3b4470;font-size:13px}
.eg-center{padding:4px 0 28px;text-align:center}
.eg-roles{display:flex;flex-direction:column;gap:20px;padding:40px 48px;background:var(--soft)}
.eg-roles-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.eg-role{display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:24px;border:1px solid #e8eaf2;border-radius:20px;background:#fff}
.eg-role-icon{font-size:34px}
.eg-role strong{font-size:22px}
.eg-role>span:not(.eg-role-icon){color:var(--muted)}
.eg-follow{padding:36px 48px;text-align:center;background:#fff}
.eg-follow p{margin:8px 0 0;color:var(--muted);font-size:18px}
.eg-app{display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding:38px 48px}
.eg-app>div{flex:1;min-width:240px}
.eg-app p{margin:8px 0 0;color:var(--muted);font-size:18px}
.eg-footer{display:flex;align-items:center;gap:24px;flex-wrap:wrap;padding:24px 48px;background:var(--ink);color:#fff}
.eg-footer a:hover{color:#c9ceff}
@media(max-width:1000px){.eg-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.eg-art{width:36%;height:290px}}
@media(max-width:700px){
  .eg-header{padding:12px 16px}.eg-menu-toggle{display:block}.eg-nav{display:none;position:absolute;top:100%;right:12px;left:12px;flex-direction:column;gap:0;margin:0;padding:8px;border:1px solid var(--line);border-radius:16px;background:#fff;box-shadow:0 12px 28px #17204418}
  .eg-nav.eg-nav-open{display:flex}.eg-nav a{padding:12px}.eg-header>.eg-btn{padding:0 13px;font-size:14px}.eg-header>.eg-chip{min-height:38px;padding:0 12px}
  .eg-hero{padding:32px 18px}.eg-hero h1{font-size:38px}.eg-hero p{font-size:17px}.eg-art{display:none}
  .eg-sec{padding:26px 16px 6px}.eg-section-heading h2,.eg h2{font-size:24px}.eg-filter-group{grid-template-columns:1fr;gap:5px}.eg-filter-label{padding-top:0}
  .eg-chips{width:100%;flex-wrap:nowrap;overflow-x:auto;padding:2px 2px 8px}.eg-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:14px 16px 20px}
  .eg-thumb{height:120px}.eg-cb{padding:12px}.eg-roles{padding:28px 16px}.eg-roles-grid{grid-template-columns:1fr}
  .eg-follow{padding:28px 16px}.eg-app,.eg-footer{padding:24px 16px}.eg-app>div{flex-basis:100%}.eg-footer{gap:16px}
}
@media(prefers-reduced-motion:reduce){.eg *, .eg *::before,.eg *::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
`;