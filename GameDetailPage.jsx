import { useEffect, useState } from "react";
import { GAME_NAMES_EN, GAMES, SUBJECTS } from "./EduGames24Home.jsx";

const TEXT = {
  en: {
    switchLanguage: "العربية",
    back: "All games",
    home: "Home",
    login: "Log in",
    signup: "Sign up",
    game: "Game",
    grades: "Grades",
    ages: "Ages",
    grade: "Grade",
    age: "years",
    learning: "What you'll practice",
    playUnavailable: "This game is not playable in this preview yet.",
    unavailableTitle: "Game coming soon",
    leaderboardTitle: "Today's Top Players",
    mostPoints: "Most Points",
    topScores: "Top Scores",
    scoresUnavailable: "Player scores are unavailable in this preview.",
    related: "More games to explore",
    viewDetails: "View details",
    notFound: "We couldn't find that game.",
    returnHome: "Return to all games",
    descriptions: {
      Shapes: "Explore shapes and build visual-spatial skills through playful challenges.",
      Counting: "Practice counting, number recognition, and early math skills.",
      Addition: "Practice addition and build confidence with number facts.",
      Subtraction: "Practice subtraction and strengthen number sense.",
      Multiplication: "Practice multiplication facts and sharpen mental math.",
      Division: "Practice division and discover how numbers can be shared equally.",
      Numbers: "Explore numbers and practice integer skills.",
      Money: "Practice money math and everyday number skills.",
      Time: "Practice telling time and working with time concepts.",
      Decimals: "Explore decimals and practice place value.",
      Fractions: "Explore fractions and practice comparing parts and wholes.",
      Ratios: "Practice ratios and understand how quantities relate.",
      Algebra: "Build algebra skills by exploring patterns and number relationships.",
      Language: "Practice language skills through playful challenges.",
      Arts: "Explore creative thinking and visual arts.",
      Spelling: "Practice spelling and build word recognition.",
      Writing: "Practice writing and strengthen language skills.",
      Geography: "Explore geography and learn about places and the world.",
    },
  },
  ar: {
    switchLanguage: "English",
    back: "كل الألعاب",
    home: "الرئيسية",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    game: "لعبة",
    grades: "الصفوف",
    ages: "الأعمار",
    grade: "الصف",
    age: "سنوات",
    learning: "المهارات التي ستتدرّب عليها",
    playUnavailable: "اللعبة غير متاحة للعب في هذه المعاينة حالياً.",
    unavailableTitle: "اللعبة ستتوفر قريباً",
    leaderboardTitle: "أفضل اللاعبين اليوم",
    mostPoints: "أعلى النقاط",
    topScores: "أفضل النتائج",
    scoresUnavailable: "نتائج اللاعبين غير متاحة في هذه المعاينة.",
    related: "ألعاب أخرى لاستكشافها",
    viewDetails: "عرض التفاصيل",
    notFound: "لم نتمكن من العثور على هذه اللعبة.",
    returnHome: "العودة إلى كل الألعاب",
    descriptions: {
      Shapes: "استكشف الأشكال وطوّر مهاراتك البصرية والمكانية من خلال تحديات ممتعة.",
      Counting: "تدرّب على العد والتعرّف على الأرقام ومهارات الرياضيات الأساسية.",
      Addition: "تدرّب على الجمع وعزّز ثقتك بالحقائق العددية.",
      Subtraction: "تدرّب على الطرح وطوّر فهمك للأعداد.",
      Multiplication: "تدرّب على حقائق الضرب وطوّر مهارات الحساب الذهني.",
      Division: "تدرّب على القسمة واكتشف طرق التوزيع المتساوي للأعداد.",
      Numbers: "استكشف الأعداد وتدرّب على مهارات الأعداد الصحيحة.",
      Money: "تدرّب على حساب المال والمهارات العددية اليومية.",
      Time: "تدرّب على قراءة الساعة ومفاهيم الوقت.",
      Decimals: "استكشف الكسور العشرية وتدرّب على القيمة المكانية.",
      Fractions: "استكشف الكسور وتدرّب على مقارنة الأجزاء بالكل.",
      Ratios: "تدرّب على النسب وافهم العلاقة بين الكميات.",
      Algebra: "طوّر مهارات الجبر باستكشاف الأنماط والعلاقات العددية.",
      Language: "تدرّب على مهارات اللغة من خلال تحديات ممتعة.",
      Arts: "استكشف التفكير الإبداعي والفنون البصرية.",
      Spelling: "تدرّب على الإملاء وطوّر التعرّف على الكلمات.",
      Writing: "تدرّب على الكتابة وعزّز مهارات اللغة.",
      Geography: "استكشف الجغرافيا وتعرّف على الأماكن والعالم.",
    },
  },
};

const ALL_GAMES_URL = "/preview.html#games";

export default function GameDetailPage() {
  const [language, setLanguage] = useState(() => {
    try {
      return window.localStorage.getItem("edugames24-language") === "en" ? "en" : "ar";
    } catch {
      return "ar";
    }
  });
  const isEnglish = language === "en";
  const copy = TEXT[language];
  const gameId = Number(new URLSearchParams(window.location.search).get("id"));
  const game = GAMES.find((item) => item.id === gameId);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isEnglish ? "ltr" : "rtl";
  }, [language, isEnglish]);

  const changeLanguage = () => {
    const nextLanguage = isEnglish ? "ar" : "en";
    setLanguage(nextLanguage);
    try {
      window.localStorage.setItem("edugames24-language", nextLanguage);
    } catch {
      // The language switch still works when browser storage is unavailable.
    }
  };

  const gameName = (item) => isEnglish ? GAME_NAMES_EN[item.id - 1] : item.name;
  const subject = (item) => SUBJECTS[item.subjectId - 1][isEnglish ? 1 : 0];
  const subjectEnglish = (item) => SUBJECTS[item.subjectId - 1][1];

  if (!game) {
    return (
      <main className={"game-page" + (isEnglish ? " game-en" : "")} dir={isEnglish ? "ltr" : "rtl"} lang={language}>
        <style>{GAME_CSS}</style>
        <header className="game-header">
          <a className="game-brand" href="/preview.html">EduGames24</a>
          <button className="game-language" type="button" onClick={changeLanguage}>{copy.switchLanguage}</button>
        </header>
        <section className="game-not-found">
          <span aria-hidden="true">🎮</span>
          <h1>{copy.notFound}</h1>
          <a className="game-primary-link" href={ALL_GAMES_URL}>{copy.returnHome}</a>
        </section>
      </main>
    );
  }

  const relatedGames = GAMES.filter((item) => item.id !== game.id && item.subjectId === game.subjectId)
    .concat(GAMES.filter((item) => item.id !== game.id && item.subjectId !== game.subjectId))
    .slice(0, 4);

  return (
    <main className={"game-page" + (isEnglish ? " game-en" : "")} dir={isEnglish ? "ltr" : "rtl"} lang={language}>
      <style>{GAME_CSS}</style>
      <header className="game-header">
        <a className="game-brand" href="/preview.html">EduGames24</a>
        <nav className="game-nav" aria-label={isEnglish ? "Account navigation" : "التنقل"}>
          <a href="/login.html">{copy.login}</a>
          <a className="game-signup" href="/register.html">{copy.signup}</a>
          <button className="game-language" type="button" lang={isEnglish ? "ar" : "en"} onClick={changeLanguage}>{copy.switchLanguage}</button>
        </nav>
      </header>

      <div className="game-content">
        <a className="game-back" href={ALL_GAMES_URL}>← {copy.back}</a>

        <section className="game-feature">
          <div className="game-cover">
            {game.image
              ? <img src={game.image} alt={gameName(game)} />
              : <span aria-hidden="true">🎮</span>}
            <span className="game-cover-badge">{copy.game} #{game.id}</span>
          </div>
          <div className="game-info">
            <span className="game-subject">{subject(game)}</span>
            <h1>{gameName(game)}</h1>
            <p className="game-description">{copy.descriptions[subjectEnglish(game)]}</p>

            <div className="game-meta">
              <section>
                <h2>{copy.grades}</h2>
                <p>{game.grades.map((grade) => `${copy.grade} ${grade}`).join(" · ")}</p>
              </section>
              <section>
                <h2>{copy.ages}</h2>
                <p>{game.ages.map((age) => `${age} ${copy.age}`).join(" · ")}</p>
              </section>
            </div>

            <div className="game-learning">
              <span aria-hidden="true">✨</span>
              <div>
                <h2>{copy.learning}</h2>
                <p>{copy.descriptions[subjectEnglish(game)]}</p>
              </div>
            </div>

            <div className="game-unavailable" role="status">
              <strong>{copy.unavailableTitle}</strong>
              <span>{copy.playUnavailable}</span>
            </div>
          </div>
        </section>

        <section className="game-leaderboard" aria-labelledby="leaderboard-title">
          <div className="game-leaderboard-stars" aria-hidden="true">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
          </div>
          <h2 id="leaderboard-title">{copy.leaderboardTitle}</h2>
          <div className="game-leaderboard-grid">
            {[copy.mostPoints, copy.topScores].map((title) => (
              <section className="game-score-panel" key={title}>
                <h3>{title}</h3>
                <p>{copy.scoresUnavailable}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="game-related">
          <div className="game-related-heading">
            <div>
              <h2>{copy.related}</h2>
              <p>{isEnglish ? "Keep exploring with these learning games." : "تابع الاستكشاف مع هذه الألعاب التعليمية."}</p>
            </div>
            <a href={ALL_GAMES_URL}>{copy.back} <span aria-hidden="true">{isEnglish ? "→" : "←"}</span></a>
          </div>
          <div className="game-related-grid">
            {relatedGames.map((item) => (
              <a className="game-related-card" href={`/game.html?id=${item.id}`} key={item.id}>
                <span className="game-related-image" style={{ background: item.color }}>
                  {item.image && <img src={item.image} alt="" loading="lazy" />}
                </span>
                <span className="game-related-subject">{subject(item)}</span>
                <strong>{gameName(item)}</strong>
                <span className="game-related-link">{copy.viewDetails} <span aria-hidden="true">{isEnglish ? "→" : "←"}</span></span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

const GAME_CSS = `
.game-page{--game-ink:#1f2a44;--game-muted:#65708a;--game-accent:#5661db;--game-line:#e2e6f0;min-height:100vh;background:#f8f9fd;color:var(--game-ink);font-family:"Tajawal",system-ui,sans-serif}
.game-page *{box-sizing:border-box}
.game-page.game-en{font-family:Arial,system-ui,sans-serif}
.game-header{height:76px;padding:0 max(24px,calc((100vw - 1200px)/2));display:flex;align-items:center;justify-content:space-between;background:#fff;border-bottom:1px solid var(--game-line)}
.game-brand{color:var(--game-accent);font-size:25px;font-weight:800;text-decoration:none}
.game-nav{display:flex;align-items:center;gap:14px}
.game-nav>a{color:var(--game-ink);font-weight:700;text-decoration:none}
.game-nav .game-signup{padding:10px 18px;border-radius:999px;background:var(--game-accent);color:#fff}
.game-language{padding:9px 15px;border:1px solid var(--game-line);border-radius:999px;background:#fff;color:var(--game-ink);font:inherit;font-weight:700;cursor:pointer}
.game-content{width:min(1120px,calc(100% - 40px));margin:28px auto 70px}
.game-back{display:inline-flex;margin:0 0 18px;color:var(--game-muted);font-weight:700;text-decoration:none}
.game-feature{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:38px;align-items:center;padding:30px;border:1px solid var(--game-line);border-radius:28px;background:#fff;box-shadow:0 16px 44px #26346a0c}
.game-cover{position:relative;min-height:380px;overflow:hidden;display:grid;place-items:center;border-radius:22px;background:#e8efff}
.game-cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.game-cover>span:not(.game-cover-badge){font-size:80px}
.game-cover-badge{position:absolute;top:16px;inset-inline-start:16px;padding:8px 13px;border:1px solid #fff9;border-radius:999px;background:#fff;color:var(--game-ink);font-size:13px;font-weight:800}
.game-info{padding:6px 0}
.game-subject{display:inline-block;padding:6px 13px;border-radius:999px;background:#eef0ff;color:var(--game-accent);font-size:14px;font-weight:800}
.game-info h1{margin:14px 0 8px;font-size:clamp(30px,4vw,44px);line-height:1.2}
.game-description{margin:0;color:var(--game-muted);font-size:17px;line-height:1.8}
.game-meta{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:22px 0}
.game-meta section{min-height:104px;padding:14px;border:1px solid var(--game-line);border-radius:16px;background:#fbfcff}
.game-meta h2,.game-learning h2{margin:0 0 8px;font-size:16px}
.game-meta p,.game-learning p{margin:0;color:var(--game-muted);font-size:14px;line-height:1.7}
.game-learning{display:flex;gap:12px;align-items:flex-start;padding:15px;border-radius:16px;background:#f0f8f5}
.game-learning>span{font-size:22px}
.game-unavailable{display:flex;flex-direction:column;gap:5px;margin-top:16px;padding:14px 16px;border:1px solid #f0d99f;border-radius:14px;background:#fff9e9;color:#755817}
.game-unavailable span{font-size:14px;line-height:1.6}
.game-leaderboard{position:relative;overflow:hidden;margin-top:26px;padding:20px 16px 24px;border:1px solid #a7dafa;border-radius:18px;background:linear-gradient(135deg,#62b7ed,#40a9e3);color:#fff}
.game-leaderboard-stars{display:flex;justify-content:space-around;align-items:center;margin-bottom:8px;font-size:18px}
.game-leaderboard>h2{margin:0 0 20px;text-align:center;font-size:24px}
.game-leaderboard-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}
.game-score-panel{min-height:180px;padding:12px 16px 18px;border-radius:18px;background:#003451;text-align:center}
.game-score-panel h3{margin:0;font-size:20px;font-weight:500}
.game-score-panel p{margin:26px auto 0;color:#d4e5ef;font-size:14px;line-height:1.7}
.game-related{margin-top:42px}
.game-related-heading{display:flex;align-items:end;justify-content:space-between;gap:16px;margin-bottom:18px}
.game-related-heading h2{margin:0;font-size:27px}
.game-related-heading p{margin:5px 0 0;color:var(--game-muted)}
.game-related-heading>a,.game-related-link{color:var(--game-accent);font-weight:800;text-decoration:none;white-space:nowrap}
.game-related-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.game-related-card{display:flex;flex-direction:column;gap:9px;overflow:hidden;padding:10px;border:1px solid var(--game-line);border-radius:18px;background:#fff;color:inherit;text-decoration:none;transition:transform .2s,box-shadow .2s}
.game-related-card:hover{transform:translateY(-3px);box-shadow:0 12px 25px #26346a12}
.game-related-image{position:relative;height:150px;overflow:hidden;display:block;border-radius:12px}
.game-related-image img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top}
.game-related-subject{align-self:flex-start;padding:3px 9px;border-radius:999px;background:#eef0ff;color:#4b55bd;font-size:12px}
.game-related-card strong{font-size:16px}
.game-related-link{margin-top:auto;font-size:14px}
.game-not-found{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:15px;text-align:center}
.game-not-found>span{font-size:60px}
.game-primary-link{padding:12px 20px;border-radius:999px;background:var(--game-accent);color:white;font-weight:800;text-decoration:none}
.game-page :is(a,button):focus-visible{outline:3px solid #f2a900;outline-offset:3px}
@media(max-width:800px){.game-content{width:min(100% - 28px,620px);margin-top:18px}.game-feature{grid-template-columns:1fr;gap:22px;padding:16px}.game-cover{min-height:300px}.game-related-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.game-leaderboard-grid{gap:12px}}
@media(max-width:480px){.game-header{height:66px;padding:0 14px}.game-brand{font-size:21px}.game-nav{gap:8px}.game-nav>a{font-size:13px}.game-nav .game-signup{padding:9px 11px}.game-language{padding:8px 10px}.game-cover{min-height:240px}.game-related-heading{align-items:flex-start;flex-direction:column}.game-related-heading h2{font-size:23px}.game-related-grid{gap:10px}.game-related-image{height:110px}.game-related-card{padding:8px}.game-leaderboard{padding:16px 10px}.game-leaderboard-grid{grid-template-columns:1fr}.game-score-panel{min-height:130px}}
`;
