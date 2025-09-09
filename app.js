/* Consolidated app.js: populate language select, apply translations, toggle language,
   register/login handlers (localStorage) — robust to missing elements on any page. */

const texts = {
  ar: { title: "تسجيل مستخدم جديد", fullname: "الاسم بالكامل", username: "اسم المستخدم", password: "كلمة المرور", email: "البريد الإلكتروني", phone: "رقم الهاتف", country: "البلد", city: "المدينة", address: "العنوان", postalcode: "الرمز البريدي", birthdate: "تاريخ الميلاد", registerBtn: "تسجيل", langLabel: "اختر اللغة:", success: "✅ تم التسجيل بنجاح!", loginTitle: "تسجيل الدخول", loginBtn: "تسجيل الدخول", loginNav: "تسجيل الدخول", signupNav: "تسجيل", navHome: "الرئيسية" },
  en: { title: "New User Registration", fullname: "Full Name", username: "Username", password: "Password", email: "Email", phone: "Phone Number", country: "Country", city: "City", address: "Address", postalcode: "Postal Code", birthdate: "Birth Date", registerBtn: "Register", langLabel: "Choose Language:", success: "✅ Registered Successfully!", loginTitle: "Login", loginBtn: "Login", loginNav: "Login", signupNav: "Sign up", navHome: "Home" },
  fr: { title: "Nouvelle inscription utilisateur", fullname: "Nom complet", username: "Nom d'utilisateur", password: "Mot de passe", email: "Email", phone: "Numéro de téléphone", country: "Pays", city: "Ville", address: "Adresse", postalcode: "Code postal", birthdate: "Date de naissance", registerBtn: "S'inscrire", langLabel: "Choisir la langue:", success: "✅ Inscription réussie!", loginTitle: "Connexion", loginBtn: "Connexion", loginNav: "Connexion", signupNav: "S'inscrire", navHome: "Accueil" },
  es: { title: "Registro de nuevo usuario", fullname: "Nombre completo", username: "Nombre de usuario", password: "Contraseña", email: "Correo electrónico", phone: "Número de teléfono", country: "País", city: "Ciudad", address: "Dirección", postalcode: "Código postal", birthdate: "Fecha de nacimiento", registerBtn: "Registrar", langLabel: "Elegir idioma:", success: "✅ ¡Registrado con éxito!", loginTitle: "Iniciar sesión", loginBtn: "Iniciar sesión", loginNav: "Iniciar sesión", signupNav: "Registrarse", navHome: "Inicio" },
  de: { title: "Neue Benutzerregistrierung", fullname: "Vollständiger Name", username: "Benutzername", password: "Passwort", email: "E-Mail", phone: "Telefonnummer", country: "Land", city: "Stadt", address: "Adresse", postalcode: "Postleitzahl", birthdate: "Geburtsdatum", registerBtn: "Registrieren", langLabel: "Sprache wählen:", success: "✅ Erfolgreich registriert!", loginTitle: "Anmelden", loginBtn: "Anmelden", loginNav: "Anmelden", signupNav: "Registrieren", navHome: "Start" },
  zh: { title: "新用户注册", fullname: "全名", username: "用户名", password: "密码", email: "电子邮件", phone: "电话号码", country: "国家", city: "城市", address: "地址", postalcode: "邮政编码", birthdate: "出生日期", registerBtn: "注册", langLabel: "选择语言:", success: "✅ 注册成功!", loginTitle: "登录", loginBtn: "登录", loginNav: "登录", signupNav: "注册", navHome: "首页" },
  hi: { title: "नया उपयोगकर्ता पंजीकरण", fullname: "पूरा नाम", username: "उपयोगकर्ता नाम", password: "पासवर्ड", email: "ईमेल", phone: "फोन नंबर", country: "देश", city: "शहर", address: "पता", postalcode: "डाक कोड", birthdate: "जन्म तिथि", registerBtn: "पंजीकरण करें", langLabel: "भाषा चुनें:", success: "✅ सफलतापूर्वक पंजीकृत!", loginTitle: "लॉगिन", loginBtn: "लॉगिन", loginNav: "लॉगिन", signupNav: "साइन अप करें", navHome: "होम" },
  ru: { title: "Регистрация нового пользователя", fullname: "Полное имя", username: "Имя пользователя", password: "Пароль", email: "Электронная почта", phone: "Номер телефона", country: "Страна", city: "Город", address: "Адрес", postalcode: "Почтовый индекс", birthdate: "Дата рождения", registerBtn: "Зарегистрироваться", langLabel: "Выберите язык:", success: "✅ Успешно зарегистрировано!", loginTitle: "Вход", loginBtn: "Войти", loginNav: "Вход", signupNav: "Регистрация", navHome: "Главная" },
  ja: { title: "新規ユーザー登録", fullname: "フルネーム", username: "ユーザー名", password: "パスワード", email: "メール", phone: "電話番号", country: "国", city: "市", address: "住所", postalcode: "郵便番号", birthdate: "生年月日", registerBtn: "登録", langLabel: "言語を選択:", success: "✅ 登録に成功しました!", loginTitle: "ログイン", loginBtn: "ログイン", loginNav: "ログイン", signupNav: "サインアップ", navHome: "ホーム" },
  pt: { title: "Registro de Novo Usuário", fullname: "Nome Completo", username: "Nome de Usuário", password: "Senha", email: "Email", phone: "Número de Telefone", country: "País", city: "Cidade", address: "Endereço", postalcode: "Código Postal", birthdate: "Data de Nascimento", registerBtn: "Registrar", langLabel: "Escolha o Idioma:", success: "✅ Registrado com Sucesso!", loginTitle: "Entrar", loginBtn: "Entrar", loginNav: "Entrar", signupNav: "Registrar-se", navHome: "Início" }
  
  // أضف لغات أخرى هنا حسب الحاجة
  // zh, hi, ru, ja, pt, etc.
  // , { ... }
};

(function () {
  'use strict';

  const langKey = 'lang';
  const langs = Object.keys(texts);

  function safeEl(id) { return document.getElementById(id) || null; }

  function populateLangSelect() {
    const sel = safeEl('language');
    if (!sel) return;
    sel.innerHTML = '';
    langs.forEach(code => {
      const opt = document.createElement('option');
      opt.value = code;
      // عرض اسم اللغة لو موجود أو الكود كبير
      opt.textContent = (texts[code].navHome || code).toString().length > 0 ? `${code.toUpperCase()} — ${texts[code].title || code}` : code.toUpperCase();
      sel.appendChild(opt);
    });
    const saved = localStorage.getItem(langKey) || 'en';
    if (sel.querySelector(`[value="${saved}"]`)) sel.value = saved;
  }

  function applyLang(lang) {
    if (!lang || !texts[lang]) lang = 'en';
    const t = texts[lang];

    // dir/lang
    document.documentElement.lang = (lang === 'ar' ? 'ar' : 'en');
    document.documentElement.dir = (lang === 'ar' ? 'rtl' : 'ltr');

    // helper setters (no error if element missing)
    const setText = (id, txt) => { const el = safeEl(id); if (el) el.innerText = txt; };
    const setPlaceholder = (id, txt) => { const el = safeEl(id); if (el) el.placeholder = txt; };

    // Common elements to update
    setText('title', t.title);
    setText('registerBtn', t.registerBtn);
    setText('loginTitle', t.loginTitle);
    setText('loginBtn', t.loginBtn);
    setText('navHome', t.navHome || (lang === 'ar' ? 'الرئيسية' : 'Home'));
    setText('navSignup', t.signupNav || (lang === 'ar' ? 'تسجيل' : 'Sign up'));
    setText('navLogin', t.loginNav || (lang === 'ar' ? 'تسجيل الدخول' : 'Login'));
    setText('lang-label', t.langLabel || '');

    // placeholders
    setPlaceholder('fullname', t.fullname);
    setPlaceholder('username', t.username);
    setPlaceholder('password', t.password);
    setPlaceholder('email', t.email);
    setPlaceholder('phone', t.phone);
    setPlaceholder('country', t.country);
    setPlaceholder('city', t.city);
    setPlaceholder('address', t.address);
    setPlaceholder('postalcode', t.postalcode);
    setPlaceholder('birthdate', t.birthdate);
  }

  function updateToggleLabel() {
    const btn = safeEl('langToggleBtn');
    const sel = safeEl('language');
    const cur = localStorage.getItem(langKey) || (sel && sel.value) || 'en';
    if (btn) btn.innerText = cur.toUpperCase();
  }

  // simple auth helpers (local only)
  function findUser(username) { const users = JSON.parse(localStorage.getItem('users') || '[]'); return users.find(u => u.username === username); }
  function saveUser(user) { const users = JSON.parse(localStorage.getItem('users') || '[]'); users.push(user); localStorage.setItem('users', JSON.stringify(users)); }
  function setLoggedIn(username) { localStorage.setItem('loggedIn', '1'); localStorage.setItem('currentUser', username); }

  document.addEventListener('DOMContentLoaded', () => {
    populateLangSelect();

    const sel = safeEl('language');
    const toggle = safeEl('langToggleBtn');

    // apply saved language first
    const saved = localStorage.getItem(langKey) || (sel && sel.value) || 'en';
    applyLang(saved);
    updateToggleLabel();

    if (sel) {
      sel.addEventListener('change', (e) => {
        const v = e.target.value;
        localStorage.setItem(langKey, v);
        applyLang(v);
        updateToggleLabel();
      });
    }

    if (toggle) {
      toggle.addEventListener('click', () => {
        const cur = localStorage.getItem(langKey) || (sel && sel.value) || 'en';
        const i = langs.indexOf(cur);
        const next = langs[(i + 1) % langs.length];
        localStorage.setItem(langKey, next);
        if (sel) sel.value = next;
        applyLang(next);
        updateToggleLabel();
      });
    }

    // register handler
    const registerForm = safeEl('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const lang = localStorage.getItem(langKey) || 'en';
        const fullname = (safeEl('fullname')?.value || '').trim();
        const username = (safeEl('username')?.value || '').trim();
        const password = safeEl('password')?.value || '';
        const email = (safeEl('email')?.value || '').trim();
        if (!fullname || !username || !password || !email) {
          return alert(lang === 'ar' ? 'من فضلك املأ الحقول المطلوبة.' : 'Please fill required fields.');
        }
        if (findUser(username)) return alert(lang === 'ar' ? 'اسم المستخدم موجود بالفعل.' : 'Username already exists.');
        saveUser({ fullname, username, password, email });
        setLoggedIn(username);
        location.href = 'home.html';
      });
    }

    // login handler
    const loginForm = safeEl('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const lang = localStorage.getItem(langKey) || 'en';
        const u = (safeEl('username')?.value || '').trim();
        const p = safeEl('password')?.value || '';
        if (!u || !p) return alert(lang === 'ar' ? 'من فضلك أدخل اسم المستخدم وكلمة المرور.' : 'Please enter username and password.');
        const user = findUser(u);
        if (!user || user.password !== p) return alert(lang === 'ar' ? 'اسم المستخدم أو كلمة المرور غير صحيحة.' : 'Invalid username or password.');
        setLoggedIn(u);
        location.href = 'home.html';
      });
    }

    // update nav user status (optional)
    const nav = document.querySelector('nav');
    if (nav) {
      const userStatus = safeEl('userStatus') || (function(){ const s = document.createElement('span'); s.id = 'userStatus'; nav.appendChild(s); return s; })();
      const current = localStorage.getItem('currentUser');
      if (current) userStatus.innerHTML = `مرحباً، ${current} <a href="#" id="logoutLink">(خروج)</a>`;
      else userStatus.innerHTML = `<a href="login.html">تسجيل الدخول</a>`;
      const logoutLink = safeEl('logoutLink');
      if (logoutLink) logoutLink.addEventListener('click', (ev) => { ev.preventDefault(); localStorage.removeItem('loggedIn'); localStorage.removeItem('currentUser'); location.href = 'login.html'; });
    }

    // عنوان/نص مشاركة يمكن تغييره
    const shareUrl = window.location.href || 'https://your-site.com'; // أو ضع رابط الموقع النهائي هنا
    const shareText = encodeURIComponent('شوف هذا الموقع: ');
    const shareTitle = encodeURIComponent('Eyes of the World');

    // نسخ الرابط للحافظة
    const copyBtn = document.getElementById('copyLinkBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(shareUrl);
          alert('تم نسخ الرابط إلى الحافظة');
        } catch (err) {
          // fallback
          prompt('انسخ الرابط يدوياً:', shareUrl);
        }
      });
    }

    // Web Share API (الجوال/المتصفحات التي تدعمه) مع fallback للنسخ
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        if (navigator.share) {
          try {
            await navigator.share({ title: 'Eyes of the World', text: 'شاهد هذا الموقع', url: shareUrl });
          } catch (err) {
            // إلغاء المستخدم أو خطأ بسيط - لا نفعل شيء
          }
        } else {
          // fallback: ننسخ الرابط ونخبر المستخدم
          try {
            await navigator.clipboard.writeText(shareUrl);
            alert('المتصفح لا يدعم المشاركة المباشرة. تم نسخ الرابط يمكنك لصقه ومشاركته.');
          } catch (err) {
            prompt('انسخ الرابط وشاركه يدوياً:', shareUrl);
          }
        }
      });
    }

    // روابط واتساب وتيليجرام (تفتح نافذة جديدة)
    const wa = document.getElementById('waShare');
    if (wa) wa.href = `https://wa.me/?text=${shareText}${encodeURIComponent(shareUrl)}`;

    const tg = document.getElementById('tgShare');
    if (tg) tg.href = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${shareText}${shareTitle}`;
  });
})();

