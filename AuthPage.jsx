import { useEffect, useState } from "react";

const ROLE_KEYS = ["student", "teacher", "school"];
const TEXT = {
  en: {
    switchLanguage: "العربية",
    back: "Back to home",
    aboutTitle: "About EduGames24",
    aboutText: "We make learning fun with interactive educational games for students, teachers, and schools.",
    contactTitle: "Contact us",
    contactText: "Questions or feedback? Visit our contact page.",
    contactLink: "Contact page",
    welcome: "Welcome back",
    registerTitle: "Create your account",
    loginDescription: "Choose your account type and sign in to continue.",
    registerDescription: "Create an account to get started with EduGames24.",
    student: "Student",
    teacher: "Teacher",
    school: "School",
    name: "Full name",
    email: "Email address",
    phone: "Phone number",
    message: "Message",
    password: "Password",
    confirmPassword: "Confirm password",
    login: "Log in",
    register: "Create account",
    noAccount: "New to EduGames24?",
    haveAccount: "Already have an account?",
    signUp: "Create an account",
    signIn: "Log in",
    notice: "Preview only: authentication is not connected yet. This form will not sign you in or create an account.",
    passwordMismatch: "Passwords do not match.",
    studentHelp: "Play games and keep track of your progress.",
    teacherHelp: "Create classes and follow student progress.",
    schoolHelp: "Manage teachers and school classes.",
  },
  ar: {
    switchLanguage: "English",
    back: "العودة إلى الرئيسية",
    aboutTitle: "من نحن",
    aboutText: "نجعل التعلّم ممتعاً من خلال ألعاب تعليمية تفاعلية للطلاب والمعلمين والمدارس.",
    contactTitle: "اتصل بنا",
    contactText: "لديك سؤال أو ملاحظة؟ تفضل بزيارة صفحة التواصل.",
    contactLink: "صفحة التواصل",
    welcome: "مرحباً بعودتك",
    registerTitle: "إنشاء حساب جديد",
    loginDescription: "اختر نوع حسابك وسجّل الدخول للمتابعة.",
    registerDescription: "أنشئ حساباً للبدء باستخدام EduGames24.",
    student: "طالب",
    teacher: "معلم",
    school: "مدرسة",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    message: "رسالة",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    noAccount: "جديد في EduGames24؟",
    haveAccount: "لديك حساب بالفعل؟",
    signUp: "إنشاء حساب",
    signIn: "تسجيل الدخول",
    notice: "هذه نسخة معاينة فقط: خدمة الحسابات غير متصلة بعد. لن يؤدي إرسال النموذج إلى تسجيل الدخول أو إنشاء حساب.",
    passwordMismatch: "كلمتا المرور غير متطابقتين.",
    studentHelp: "العب الألعاب وتابع تقدمك.",
    teacherHelp: "أنشئ صفوفاً وتابع تقدم الطلاب.",
    schoolHelp: "أدر حسابات المعلمين وصفوف المدرسة.",
  },
};

const ROLE_LABEL_KEYS = { student: "student", teacher: "teacher", school: "school" };

export default function AuthPage({ mode }) {
  const [language, setLanguage] = useState(() => {
    try {
      return window.localStorage.getItem("edugames24-language") === "en" ? "en" : "ar";
    } catch {
      return "ar";
    }
  });
  const [role, setRole] = useState(() => {
    const requestedRole = new URLSearchParams(window.location.search).get("role");
    return ROLE_KEYS.includes(requestedRole) ? requestedRole : "student";
  });
  const [message, setMessage] = useState("");
  const isRegister = mode === "register";
  const isEnglish = language === "en";
  const copy = TEXT[language];
  const roleOptions = [
    { key: "student", icon: "🎒", description: copy.studentHelp },
    { key: "teacher", icon: "👩‍🏫", description: copy.teacherHelp },
    { key: "school", icon: "🏫", description: copy.schoolHelp },
  ];

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (isRegister && form.elements.password.value !== form.elements.confirmPassword.value) {
      setMessage(copy.passwordMismatch);
      return;
    }
    setMessage(copy.notice);
  };

  return (
    <main className={"auth-page" + (isEnglish ? " auth-en" : "")} dir={isEnglish ? "ltr" : "rtl"} lang={language}>
      <style>{AUTH_CSS}</style>
      <header className="auth-header">
        <a className="auth-brand" href="/preview.html">EduGames24</a>
        <button className="auth-language" type="button" lang={isEnglish ? "ar" : "en"} onClick={changeLanguage}>{copy.switchLanguage}</button>
      </header>

      <div className="auth-layout">
        <aside className="auth-aside">
          <span className="auth-aside-icon" aria-hidden="true">✨</span>
          <p>{isEnglish ? "A little fun makes learning go a long way." : "قليل من المرح يجعل التعلّم رحلة ممتعة."}</p>
          <div className="auth-decor" aria-hidden="true">📚　🚀　🎮</div>
        </aside>

        <section className="auth-card" aria-labelledby="auth-title">
          <a className="auth-back" href="/preview.html">← {copy.back}</a>
          <span className="auth-eyebrow">EduGames24</span>
          <h1 id="auth-title">{isRegister ? copy.registerTitle : copy.welcome}</h1>
          <p className="auth-description">{isRegister ? copy.registerDescription : copy.loginDescription}</p>

          <div className="auth-roles" role="group" aria-label={isEnglish ? "Account type" : "نوع الحساب"}>
            {roleOptions.map((option) => (
              <button
                key={option.key}
                className={"auth-role" + (role === option.key ? " is-selected" : "")}
                type="button"
                aria-pressed={role === option.key}
                onClick={() => setRole(option.key)}
              >
                <span aria-hidden="true">{option.icon}</span>
                {copy[ROLE_LABEL_KEYS[option.key]]}
              </button>
            ))}
          </div>
          <p className="auth-role-description">{roleOptions.find((option) => option.key === role)?.description}</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegister && (
              <label>
                {copy.name}
                <input name="name" type="text" autoComplete="name" required />
              </label>
            )}
            <label>
              {copy.email}
              <input name="email" type="email" autoComplete="email" required />
            </label>
            {isRegister && (
              <>
                <label>
                  {copy.phone}
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
                <label>
                  {copy.message}
                  <textarea name="message" rows="3" />
                </label>
              </>
            )}
            <label>
              {copy.password}
              <input name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} minLength={8} required />
            </label>
            {isRegister && (
              <label>
                {copy.confirmPassword}
                <input name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required />
              </label>
            )}
            <button className="auth-submit" type="submit">{isRegister ? copy.register : copy.login}</button>
          </form>

          <p className="auth-message" role="status">{message || copy.notice}</p>
          <p className="auth-switch">
            {isRegister ? copy.haveAccount : copy.noAccount}{" "}
            <a href={isRegister ? `/login.html?role=${role}` : "/register.html"}>
              {isRegister ? copy.signIn : copy.signUp}
            </a>
          </p>
        </section>
      </div>

      <footer className="auth-footer">
        <section className="auth-footer-section">
          <h2>{copy.aboutTitle}</h2>
          <p>{copy.aboutText}</p>
          <a href="https://edugames24.com/sitepages/topic/39">{copy.aboutTitle}</a>
        </section>
        <section className="auth-footer-section">
          <h2>{copy.contactTitle}</h2>
          <p>{copy.contactText}</p>
          <a href="https://edugames24.com/contact">{copy.contactLink}</a>
        </section>
      </footer>
    </main>
  );
}

const AUTH_CSS = `
.auth-page{--auth-ink:#1f2a44;--auth-muted:#66708a;--auth-accent:#5661db;--auth-line:#dfe3ef;min-height:100vh;padding:0 6vw 48px;background:linear-gradient(145deg,#f1f3fc 0%,#fcfcfa 55%,#e9f4f1 100%);color:var(--auth-ink);font-family:"Tajawal",system-ui,sans-serif}
.auth-page *{box-sizing:border-box}
.auth-page.auth-en{font-family:Arial,system-ui,sans-serif}
.auth-header{height:78px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #dfe3ef99}
.auth-brand{color:var(--auth-accent);font-size:25px;font-weight:800;text-decoration:none}
.auth-language{padding:9px 16px;border:1px solid var(--auth-line);border-radius:999px;background:#fff;color:var(--auth-ink);font:inherit;font-size:15px;font-weight:700;cursor:pointer}
.auth-layout{width:min(1020px,100%);min-height:calc(100vh - 126px);margin:24px auto 0;display:grid;grid-template-columns:.85fr 1.15fr;align-items:center;gap:40px}
.auth-aside{position:relative;min-height:430px;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;padding:38px;border:1px solid #ffffffb3;border-radius:32px;background:linear-gradient(145deg,#dceaff,#e9e5ff);text-align:center}
.auth-aside-icon{font-size:72px;filter:drop-shadow(0 10px 12px #29335220);animation:auth-float 3s ease-in-out infinite}
.auth-aside p{max-width:330px;font-size:26px;font-weight:800;line-height:1.55}
.auth-decor{position:absolute;bottom:30px;font-size:35px}
@keyframes auth-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.auth-card{width:100%;max-width:540px;justify-self:center;padding:36px;border:1px solid #e8eaf2;border-radius:28px;background:#fff;box-shadow:0 24px 70px #28357912}
.auth-back{display:inline-block;margin-bottom:26px;color:var(--auth-muted);font-weight:700;text-decoration:none}
.auth-back:hover,.auth-switch a:hover{color:var(--auth-accent)}
.auth-eyebrow{display:block;color:var(--auth-accent);font-size:14px;font-weight:800;letter-spacing:.08em}
.auth-card h1{margin:8px 0;font-size:34px}
.auth-description{margin:0 0 22px;color:var(--auth-muted);line-height:1.7}
.auth-roles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.auth-role{min-height:75px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:8px 5px;border:1px solid var(--auth-line);border-radius:15px;background:#fff;color:var(--auth-ink);font:inherit;font-size:15px;font-weight:700;cursor:pointer}
.auth-role span{font-size:22px}
.auth-role.is-selected{border-color:var(--auth-accent);background:#f0f1ff;color:var(--auth-accent);box-shadow:inset 0 0 0 1px var(--auth-accent)}
.auth-role-description{min-height:24px;margin:12px 0 20px;color:var(--auth-muted);font-size:14px}
.auth-form{display:flex;flex-direction:column;gap:15px}
.auth-form label{display:flex;flex-direction:column;gap:7px;font-size:14px;font-weight:700}
.auth-form input{width:100%;min-height:48px;padding:0 13px;border:1px solid var(--auth-line);border-radius:12px;background:#fff;color:var(--auth-ink);font:inherit;font-size:16px;font-weight:500}
.auth-form textarea{width:100%;min-height:88px;padding:12px 13px;border:1px solid var(--auth-line);border-radius:12px;background:#fff;color:var(--auth-ink);font:inherit;font-size:16px;resize:vertical}
.auth-form input:focus{border-color:var(--auth-accent);outline:3px solid #5661db22}
.auth-form textarea:focus{border-color:var(--auth-accent);outline:3px solid #5661db22}
.auth-submit{min-height:50px;margin-top:4px;border:0;border-radius:13px;background:var(--auth-accent);color:#fff;font:inherit;font-size:17px;font-weight:800;cursor:pointer}
.auth-submit:hover{filter:brightness(.95)}
.auth-message{margin:18px 0 0;padding:12px;border:1px solid #f0d99f;border-radius:12px;background:#fff9e9;color:#755817;font-size:13px;line-height:1.6}
.auth-switch{margin:20px 0 0;text-align:center;color:var(--auth-muted);font-size:14px}
.auth-switch a{color:var(--auth-accent);font-weight:800;text-decoration:none}
.auth-footer{width:min(1020px,100%);margin:38px auto 0;padding-top:24px;border-top:1px solid #dfe3ef;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:32px}
.auth-footer-section h2{margin:0 0 8px;font-size:19px}
.auth-footer-section p{max-width:440px;margin:0 0 10px;color:var(--auth-muted);line-height:1.7}
.auth-footer-section a{color:var(--auth-accent);font-weight:800;text-decoration:none}
.auth-footer-section a:hover{text-decoration:underline}
.auth-page :is(a,button,input):focus-visible{outline:3px solid #f2a900;outline-offset:3px}
@media(max-width:760px){.auth-page{padding:0 16px 28px}.auth-header{height:66px}.auth-layout{min-height:auto;grid-template-columns:1fr;margin-top:18px}.auth-aside{display:none}.auth-card{padding:26px 20px}.auth-card h1{font-size:29px}.auth-footer{grid-template-columns:1fr;gap:22px;margin-top:26px}}
@media(prefers-reduced-motion:reduce){.auth-aside-icon{animation:none}}
`;
