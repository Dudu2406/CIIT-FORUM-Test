const $ = (s) => document.querySelector(s),
  esc = (s) =>
    String(s ?? "").replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
const FONTS = {
  Default: "system-ui,sans-serif",
  Georgia: "Georgia,serif",
  Trebuchet: "'Trebuchet MS',sans-serif",
  Verdana: "Verdana,sans-serif",
  Courier: "'Courier New',monospace",
  Comic: "'Comic Sans MS',cursive",
  Impact: "Impact,sans-serif",
  Script: "'Brush Script MT',cursive",
};
const DEF = {
  bg: "#dff3fb",
  bg2: "",
  accent: "#0b8fbf",
  ban: "",
  name: "#033250",
  bubble: "#ffffff",
  cb: "solid",
  font: "Default",
  sz: 16,
  rad: 14,
  op: 92,
  card: "light",
  pat: "none",
  ov: 0,
  tile: 0,
  img: "",
  bimg: "",
  av: "",
  bio: "",
  st: "",
  q: "",
  song: "",
  loc: "",
  int: "",
  about: "",
  ph: [],
  order: ["about", "photos", "comments", "interests", "posts"],
  hide: [],
  pv: 1,
  aw: 1,
  ls: 1,
  css: "",
};
const PRE = {
  Ocean: {},
  Sunset: {
    bg: "#ffe8cc",
    bg2: "#ffc9a0",
    accent: "#d9480f",
    name: "#7a2e0b",
    bubble: "#fff4e6",
    font: "Georgia",
    cb: "dashed",
  },
  Midnight: {
    bg: "#14172b",
    bg2: "#2b1d4d",
    accent: "#7c9cff",
    name: "#c5d1ff",
    bubble: "#222747",
    font: "Verdana",
    card: "dark",
    op: 85,
    pat: "dots",
  },
  Retro: {
    bg: "#fff9db",
    accent: "#e03997",
    name: "#a61e63",
    font: "Courier",
    cb: "dotted",
    pat: "stripes",
  },
  Forest: {
    bg: "#dfe9dc",
    bg2: "#a9c3a3",
    accent: "#4a7a5c",
    name: "#2f5a3f",
    bubble: "#f1f7ee",
    font: "Georgia",
  },
  Bubblegum: {
    bg: "#ffe3f1",
    bg2: "#d7ccff",
    accent: "#e0489b",
    name: "#8a1e5e",
    font: "Comic",
    rad: 28,
    pat: "dots",
  },
};
const DEMO = { id: "demo", email: "demo@ciit.edu.ph", pw: "ciit1234" },
  DEFAV = "img/Default%20Icon.jpg",
  LBL = { about: "About me", interests: "Interests", photos: "Photos", comments: "Comments", posts: "Posts" },
  GM = [
    ["edit", "Edit Profile", "Name, bio, and personal information", "✏️"],
    ["look", "Customize Appearance", "Colors, fonts, and themes", "🎨"],
    ["photos", "Manage Photos", "Profile picture, banner, and gallery", "🖼️"],
    ["arrange", "Arrange Sections", "Reorder and hide profile sections", "🗂️"],
    ["privacy", "Privacy Settings", "Manage profile visibility", "🔒"],
  ],
  gmenu = () =>
    `<div class="gm" role="menu" aria-label="Profile Settings"><div class="gh">Profile Settings</div>${GM.map(([k, t, d, i]) => `<button class="gi" role="menuitem" data-a="gm" data-v="${k}"><span aria-hidden="true">${i}</span><span><b>${t}</b><br><small>${d}</small></span><span aria-hidden="true">›</span></button>`).join("")}</div>`;
const T = (t) => ({ ...DEF, ...t }),
  CK = ["n", "bio", "st", "q", "song", "loc", "int", "about", "pv", "aw", "ls"],
  CK2 = [...CK, "ph", "av", "bimg", "order", "hide"];
const U = (id, n, p, o) => ({ id, n, t: T({ ...PRE[p], ...o }), wall: o.w || [], views: o.vw || 0 });
const SEED = {
  users: [
    U("demo", "Mochi", "Forest", {
      av: "img/MainProfileFortesting.jpg",
      vw: 4872,
      bio: "BSCS 3rd year · CIIT Quezon City",
      st: "Testing the new forum ✨",
      q: "Peace, love, and clean commits.",
      song: "Lo-fi study beats",
      loc: "Quezon City, Philippines",
      int: "cats, coding, matcha, sketching, early-2000s web",
      about: "Hi! I’m the test account for the CIIT Forum demo. I like cats, cozy playlists, and building things that feel a little like the early-2000s web.",
      ph: ["img/MainProfileFortesting.jpg"],
      w: [
        { u: "u1", t: "Best study buddy ever! Always shares the notes.", r: 5 },
        { u: "u2", t: "Made me the cutest sticker pack. Cheers to our friendship!", r: 5 },
        { u: "u3", t: "Reliable org mate, never misses a meeting.", r: 4 },
        { u: "u4", t: "Carried our game jam team. GG!", r: 5 },
      ],
    }),
    U("u1", "User1", "Midnight", {
      av: "img/profile1.jpg",
      vw: 1203,
      bio: "BSCS 3rd year",
      st: "Debugging life ☕",
      q: "It works on my machine.",
      song: "Lo-fi beats",
      loc: "Quezon City",
      int: "coding, ramen, chess",
      about: "Ask me about Python and why my code only works at 2 AM.",
      w: [{ u: "u2", t: "Best study buddy ever!", r: 5 }],
    }),
    U("u2", "Bogart", "Bubblegum", {
      av: "img/profile2.jpg",
      vw: 860,
      bio: "BA Multimedia",
      st: "Drawing till dawn",
      q: "Make it pop!",
      song: "City pop mix",
      loc: "Manila",
      int: "art, anime, matcha",
      about: "Poster designer and sticker addict.",
      w: [{ u: "u3", t: "Loved your org fair poster 🎨", r: 4 }],
    }),
    U("u3", "Jo", "Sunset", {
      av: "img/Profile3.jpg",
      vw: 541,
      bio: "BSIT 2nd year",
      st: "Looking for org mates",
      q: "Sleep is optional.",
      loc: "Makati",
      int: "events, photography",
      about: "Org officer. Come say hi at the booth!",
    }),
    U("u4", "John", "Forest", {
      vw: 322,
      bio: "BS Game Dev",
      st: "Playing Valorant",
      q: "GG no re.",
      song: "Game OST",
      loc: "Pasig",
      int: "games, plants, cats",
      about: "Making tiny games and big messes.",
    }),
  ],
  posts: [
    {
      id: 1,
      c: "Org Board",
      u: "u3",
      t: "Org fair this Friday!",
      b: "All orgs are invited to set up booths at the lobby. Sign up at the SSC office.",
      l: 12,
      cm: [
        { u: "u2", t: "Our org is in! 🎨" },
        { u: "u1", t: "What time does it start?" },
      ],
    },
    {
      id: 2,
      c: "Concern",
      u: "u1",
      t: "Who knows how to enroll in electives?",
      b: "Is the portal down for everyone or just me?",
      l: 5,
      cm: [{ u: "u4", t: "Try again after 5 PM, worked for me." }],
    },
    {
      id: 3,
      c: "Regular post",
      u: "u4",
      t: "Valorant night at the lab",
      b: "Bring your own mouse. Casual only!",
      l: 9,
      cm: [],
    },
    {
      id: 4,
      c: "Org Board",
      u: "u2",
      t: "Art org needs poster designers",
      b: "Beginner friendly. Drop a comment if you’re interested.",
      l: 7,
      cm: [{ u: "u3", t: "Count me in." }],
    },
  ],
};
let S,
  V = {
    view: null,
    edit: null,
    panel: null,
    plain: false,
    open: null,
    tab: "profile",
    q: "",
    login: "in",
    comp: 0,
    more: 0,
    cat: "All",
    d: { t: "", b: "", c: "Regular post" },
    pop: null,
  };
const load = () => {
  try {
    const s = JSON.parse(localStorage.getItem("ciitf4") || "null");
    if (s) return s;
  } catch (e) {}
  return {
    me: null,
    users: SEED.users,
    posts: SEED.posts,
    show: { posts: true, people: true },
    rules: true,
  };
};
const save = () => {
  try {
    localStorage.setItem("ciitf4", JSON.stringify(S));
    return true;
  } catch (e) {
    return false;
  }
};
const CATS = {
  Announcements: "Org Board",
  "Concerns (Q&A)": "Concern",
  "Org Boards": "Org Board",
  Hangout: "Regular post",
};
function normalize() {
  S.show = S.show || { posts: true, people: true };
  S.posts.forEach((p) => {
    p.c = CATS[p.c] || p.c;
    p.by = p.by || [];
  });
  if (S.me) S.me = S.users.find((u) => u.id === S.me.id) || S.me;
}
S = load();
normalize();
const lum = (h) => {
  const c = [1, 3, 5].map((i) => {
    let v = parseInt(h.substr(i, 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const rat = (a, b) => {
  const x = lum(a),
    y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
const on = (bg) => (lum(bg) > 0.4 ? "#12212b" : "#ffffff"),
  user = (id) => S.users.find((u) => u.id === id) || S.me;
const safe = (s) =>
  esc(
    String(s || "")
      .replace(/url\(|@|expression|javascript|behavior|position|[<>{}\\]/gi, "")
      .slice(0, 400),
  );
function toast(m) {
  const t = $("#toast");
  t.textContent = m;
  t.classList.add("on");
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove("on"), 2400);
}
const bub = (u) => {
  const t = T(u.t);
  return `border:${t.cb == "none" ? "none" : "2px " + t.cb + " " + t.accent};background:${t.bubble};color:${on(t.bubble)};font-family:${FONTS[t.font]}`;
};
const avh = (u) => `<img src="${T(u.t).av || DEFAV}" alt="">`;
function bgCSS(t) {
  const L = [],
    Z = [],
    P = {
      dots: ["radial-gradient(rgba(0,0,0,.15) 1.5px,transparent 1.5px)", "18px 18px"],
      stripes: [
        "repeating-linear-gradient(45deg,rgba(0,0,0,.07) 0 10px,transparent 10px 20px)",
        "auto",
      ],
      grid: [
        "linear-gradient(rgba(0,0,0,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.08) 1px,transparent 1px)",
        "24px 24px,24px 24px",
      ],
    }[t.pat];
  if (P) {
    L.push(P[0]);
    Z.push(P[1]);
  }
  if (+t.ov) {
    const a = t.ov / 100;
    L.push(`linear-gradient(rgba(0,0,0,${a}),rgba(0,0,0,${a}))`);
    Z.push("auto");
  }
  if (t.img) {
    L.push(`url(${t.img})`);
    Z.push(+t.tile ? "auto" : "cover");
  } else if (t.bg2) {
    L.push(`linear-gradient(135deg,${t.bg},${t.bg2})`);
    Z.push("auto");
  }
  return (
    `background-color:${t.bg};` +
    (L.length ? `background-image:${L.join(",")};background-size:${Z.join(",")};` : "")
  );
}
const sideBg = (t) => `color-mix(in srgb,${t.accent} 28%,#0f1b24)`;
function prof(u, t0, ed, plain) {
  const t = T(t0),
    s = plain ? T({}) : t,
    dk = s.card == "dark",
    ink = dk ? "#f2f6f8" : "#12212b",
    card = `background:${dk ? `rgba(18,24,38,${s.op / 100})` : `rgba(255,255,255,${s.op / 100})`};color:${ink};border-radius:${s.rad}px;`,
    nm = t.n ?? u.n;
  const e = (k) =>
    ed
      ? `contenteditable="true" data-k="${k}" class="ce" role="textbox" aria-label="Edit ${k}"`
      : "";
  const ln = (ic, k) => (t[k] || ed ? `<div>${ic} <span ${e(k)}>${esc(t[k])}</span></div>` : "");
  const posts = S.posts.filter((p) => p.u === u.id),
    mine = u.id === S.me.id;
  const B = {
    about: () => `<h3>About me</h3><p style="margin:0" ${e("about")}>${esc(t.about)}</p>`,
    interests: () =>
      `<h3>Interests</h3>${
        t.int
          .split(",")
          .filter((x) => x.trim())
          .map(
            (x) =>
              `<span class="chip" style="background:${s.accent};color:${on(s.accent)}">${esc(x.trim())}</span>`,
          )
          .join("") || `<span class="mut">None yet.</span>`
      }`,
    photos: () =>
      `<h3>Photos</h3><div class="ph">${t.ph.map((p, i) => `<img src="${p}" alt="Photo ${i + 1} by ${esc(nm)}">`).join("") || `<span class="mut">No photos yet.</span>`}</div>`,
    comments: () =>
      `<h3 class="serif">Comments</h3>${
        (u.wall || [])
          .map((c) => {
            const w = user(c.u);
            return `<div class="tm"><span class="av sm">${avh(w)}</span><div class="cm" style="${bub(w)}"><b style="color:${T(w.t).name}">${esc(w.n)}</b><br>${esc(c.t)}</div></div>`;
          })
          .join("") || `<span class="mut">No comments yet.</span>`
      }${ed || mine ? "" : !+t.aw ? `<div class="mut">${esc(nm)} has turned off comments on this profile.</div>` : `<div style="display:flex;gap:6px;margin-top:8px"><input id="wc" maxlength="200" placeholder="Write a comment (Enter to send)" aria-label="Comment"><button class="btn" data-a="wall">Send</button></div>`}`,
    posts: () =>
      `<h3>Posts</h3>${posts.map((p) => `<div>• ${esc(p.t)}</div>`).join("") || `<span class="mut">No posts yet.</span>`}`,
  };
  const ban = t.bimg ? `url(${t.bimg}) center/cover` : s.ban || s.accent,
    gear = mine && !ed ? `<button class="gear" data-a="gear" aria-label="Profile settings" aria-haspopup="true" aria-expanded="${!!V.menu}">⚙</button>${V.menu ? gmenu() : ""}` : "";
  return `<div id="pw" style="font-family:${FONTS[s.font]};font-size:${s.sz}px;${plain ? "" : safe(t.css)}"><section class="pf">${gear}<div class="pcol"><div class="port" style="border-color:${s.accent}"><img src="${t.av || DEFAV}" alt="Profile picture of ${esc(nm)}"></div><div class="dt" style="${card}">${ln("🎓", "bio")}${ln("📍", "loc")}${ln("🎵", "song")}</div></div><div class="pmain" style="${card}overflow:hidden"><div class="ban" style="background:${ban}"></div><div class="pinfo"><h1 style="color:${s.name}" ${e("n")}>${esc(nm)}</h1><div class="qbox" style="border-color:${s.accent}">${ln("💬", "st")}${ln("❝", "q")}</div></div></div></section>
 <div class="blks">${t.order
   .filter((k) => !t.hide.includes(k))
   .map(
     (k) =>
       `<section class="blk ${k == "photos" || k == "comments" ? "span" : ""}" style="${card}">${B[k]()}</section>`,
   )
   .join("")}</div></div>`;
}
function warn(d) {
  const cc = d.card == "dark" ? "#121826" : "#ffffff",
    a = rat(d.name, cc),
    b = rat(d.name, d.bubble),
    m = [];
  if (a < 4.5) m.push(`Name color is hard to read on cards (${a.toFixed(1)}:1).`);
  if (b < 4.5) m.push(`Name color is hard to read on comment bubbles (${b.toFixed(1)}:1).`);
  if (+d.op < 55) m.push("Cards are very transparent, so text may be hard to read.");
  return m.length
    ? `<span class="err">⚠ ${m.join(" ")}</span> <button class="btn sm" data-a="fix">Fix automatically</button>`
    : `<span class="ok">✓ Everything is readable</span>`;
}
const PN = [
  ["info", "📝 Info"],
  ["themes", "🎨 Themes"],
  ["colors", "Colors"],
  ["bg", "Background"],
  ["style", "Style"],
  ["media", "Media"],
  ["blocks", "Blocks"],
  ["privacy", "🔒 Privacy"],
  ["adv", "Advanced"],
];
function barHTML(own, vu) {
  if (V.edit)
    return (
      `<b>Editing</b>` +
      PN.map(
        ([k, l]) =>
          `<button class="tab" data-a="pn" data-v="${k}" aria-pressed="${V.panel == k}">${l}</button>`,
      ).join("") +
      `<span class="mut" style="color:#566873">Tip: click text on the profile to edit it</span>`
    );
  return own
    ? ""
    : `<button class="btn sm" data-a="back">← Back to my profile</button>`;
}
function panel() {
  const d = V.edit,
    p = V.panel;
  if (!p) return "";
  const C = (k, l) =>
      `<label>${l}<input type="color" data-k="${k}" value="${d[k] || d.accent}"></label>`,
    Sl = (k, l, o) =>
      `<label>${l}<select data-k="${k}">${o.map(([v, n]) => `<option value="${v}" ${d[k] == v ? "selected" : ""}>${n}</option>`).join("")}</select></label>`,
    Rg = (k, l, a, b) =>
      `<label>${l}: <span id="v_${k}">${d[k]}</span><input type="range" min="${a}" max="${b}" data-k="${k}" value="${d[k]}"></label>`,
    Up = (k, l) =>
      `<label>${l}<input type="file" accept="image/png,image/jpeg,image/webp" data-up="${k}"></label>`,
    Rm = (k, l) => (d[k] ? `<button class="btn sm g" data-a="rm" data-v="${k}">${l}</button>` : "");
  const I = (k, l, m) => `<label>${l}<input data-k="${k}" maxlength="${m}" value="${esc(d[k])}"></label>`;
  const M = {
    info: `<div class="pn">${I("n", "Display name", 30)}${I("bio", "Course / year", 40)}${I("loc", "Location", 40)}${I("st", "Status", 60)}${I("q", "Favorite quote", 80)}${I("song", "Now playing", 40)}</div><label>About me<textarea rows="2" maxlength="200" data-k="about">${esc(d.about)}</textarea></label>`,
    privacy: `<div class="pn">${Sl("aw", "Comments from others", [[1, "Allowed"], [0, "Turned off"]])}${Sl("ls", "Show me in Friends & people", [[1, "Yes"], [0, "No, hide me"]])}</div><div class="mut" style="color:#566873">Changes apply after you press Save.</div>`,
    themes: `<b>Start from a theme (your text and photos are kept)</b><div class="tabs" style="margin-top:6px">${Object.keys(
      PRE,
    )
      .map(
        (k) =>
          `<button class="tab" style="background:#fff;color:#12212b;border-color:#c5ccc8" data-a="pre" data-v="${k}">${k}</button>`,
      )
      .join("")}</div>`,
    colors: `<div class="pn">${C("bg", "Background")}${C("bg2", "Gradient end")}${C("accent", "Accent / avatar")}${C("ban", "Banner color")}${C("name", "Name color")}${C("bubble", "Comment bubble")}${Sl(
      "card",
      "Card style",
      [
        ["light", "Light cards"],
        ["dark", "Dark cards"],
      ],
    )}${Rg("op", "Card opacity %", 30, 100)}</div><button class="btn sm g" style="margin-top:6px" data-a="rm" data-v="bg2">No gradient</button>`,
    bg: `<div class="pn">${Up("img", "Background image")}${Sl("tile", "Image mode", [
      [0, "Cover"],
      [1, "Tile"],
    ])}${Sl("pat", "Pattern", [
      ["none", "None"],
      ["dots", "Dots"],
      ["stripes", "Stripes"],
      ["grid", "Grid"],
    ])}${Rg("ov", "Darken image %", 0, 80)}</div>${Rm("img", "Remove image")}<div class="err" id="uerr" role="alert"></div>`,
    style: `<div class="pn">${Sl(
      "font",
      "Font",
      Object.keys(FONTS).map((f) => [f, f]),
    )}${Sl("sz", "Text size", [
      [14, "Small"],
      [16, "Medium"],
      [19, "Large"],
    ])}${Rg("rad", "Corner roundness", 0, 36)}${Sl("cb", "Comment border", [
      ["solid", "Solid"],
      ["dashed", "Dashed"],
      ["dotted", "Dotted"],
      ["none", "None"],
    ])}</div>`,
    media: `<div class="pn">${Up("av", "Profile picture")}${Up("bimg", "Banner image")}${Up("ph", "Add a photo (up to 6)")}<label>Interests (comma separated)<input data-k="int" maxlength="90" value="${esc(d.int)}"></label></div>${Rm("av", "Remove picture")} ${Rm("bimg", "Remove banner")}<div class="ph" style="margin-top:8px;max-width:420px">${d.ph.map((x, i) => `<div><img src="${x}" alt="Photo ${i + 1}"><button class="btn sm g" data-a="rmph" data-v="${i}">Remove</button></div>`).join("")}</div><div class="err" id="uerr" role="alert"></div>`,
    blocks: `<b>Show, hide and reorder sections</b>${d.order.map((k, i) => `<div style="display:flex;gap:8px;align-items:center;padding:3px 0"><label style="margin:0;flex:1;display:flex;gap:6px;align-items:center"><input type="checkbox" data-b="${k}" ${d.hide.includes(k) ? "" : "checked"}>${LBL[k]}</label><button class="btn sm g" data-a="mv" data-v="${i}:-1" aria-label="Move up">↑</button><button class="btn sm g" data-a="mv" data-v="${i}:1" aria-label="Move down">↓</button></div>`).join("")}`,
    adv: `<label>Custom style (CSS declarations only, applied to your whole profile)<textarea rows="3" data-k="css" placeholder="letter-spacing:1px; text-shadow:0 1px 2px #0003;">${esc(d.css)}</textarea></label><div class="mut" style="color:#566873">Links, imports and positioning are blocked to keep the forum safe.</div>`,
  };
  return `<div>${M[p]}</div>`;
}
function likeBtn(p) {
  const liked = p.by.includes(S.me.id);
  return `<button class="btn sm g${V.pop == p.id ? " pop" : ""}" data-a="like" data-v="${p.id}" aria-pressed="${liked}" style="${liked ? "color:#e0245e;border-color:#e0245e" : ""}">${liked ? "❤️ Liked" : "♡ Like"}</button>`;
}
const CI = { Concern: "❓", "Org Board": "📌", "Regular post": "💬" };
function bodyPosts() {
  const q = V.q.toLowerCase(),
    all = S.posts.filter((p) => (p.t + p.b + p.c + user(p.u).n).toLowerCase().includes(q)),
    ps = all.filter((p) => V.cat == "All" || p.c == V.cat),
    shown = ps.slice(0, V.more ? 99 : 3),
    d = V.d;
  const comp = V.comp
    ? `<div class="card"><b>New post</b><label for="pt">Title <span class="cnt" id="ptc">${d.t.length}/80</span></label><input id="pt" maxlength="80" value="${esc(d.t)}" aria-describedby="pe"><label for="pb">Message <span class="cnt" id="pbc">${d.b.length}/500</span></label><textarea id="pb" rows="3" maxlength="500" aria-describedby="pe" placeholder="What’s on your mind? (Ctrl+Enter to post)">${esc(d.b)}</textarea><label for="pc">Category</label><select id="pc">${Object.keys(CI).map((c) => `<option ${d.c == c ? "selected" : ""}>${c}</option>`).join("")}</select><div class="mut" style="margin-top:4px">Concern = a question or problem · Org Board = announcements · Regular post = everything else</div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn" data-a="post">Post</button><button class="btn g" data-a="comp">Cancel</button></div><div class="err" id="pe" role="alert"></div></div>`
    : `<button class="btn" data-a="comp" style="margin-bottom:10px">＋ New post</button>`;
  const chips = `<div class="tabs" role="group" aria-label="Filter by category">${["All", ...Object.keys(CI)].map((c) => `<button class="tab" data-a="cat" data-v="${c}" aria-pressed="${V.cat == c}">${CI[c] ? CI[c] + " " : ""}${c}</button>`).join("")}</div>`;
  const status = `<div class="mut" role="status" aria-live="polite" style="margin:0 0 8px">Showing ${shown.length} of ${ps.length} thread${ps.length == 1 ? "" : "s"}${V.q ? ` for “${esc(V.q)}”` : ""}</div>`;
  const list = shown
    .map((p) => {
      const a = user(p.u),
        o = V.open === p.id;
      return `<article class="card"><span class="tag" data-c="${esc(p.c)}"><span aria-hidden="true">${CI[p.c] || ""}</span> ${esc(p.c)}</span>${p.u == S.me.id ? ' <span class="tag">You</span>' : ""}<h3 style="margin:6px 0 2px;font-size:18px">${esc(p.t)}</h3><div class="clip">${esc(p.b)}</div><div class="mut"><a href="#" data-a="visit" data-v="${a.id}" style="color:var(--cyd)">${esc(a.n)}</a> · ${p.l} likes · ${p.cm.length} comments</div><div style="margin-top:6px">${likeBtn(p)} <button class="btn sm g" data-a="open" data-v="${p.id}" aria-expanded="${o}">💬 ${o ? "Hide" : "Comments"}</button></div>${
        o
          ? p.cm
              .map((c) => {
                const w = user(c.u);
                return `<div class="cm" style="${bub(w)}"><b style="color:${T(w.t).name}">${esc(w.n)}</b><br>${esc(c.t)}</div>`;
              })
              .join("") +
            `<div style="display:flex;gap:6px;margin-top:6px"><input id="cc" placeholder="Write a comment (Enter to send)" aria-label="Comment"><button class="btn" data-a="cmt" data-v="${p.id}">Send</button></div>`
          : ""
      }</article>`;
    })
    .join("");
  const empty = `<div class="card mut">No threads match${V.q ? ` “${esc(V.q)}”` : ""}${V.cat != "All" ? ` in ${esc(V.cat)}` : ""}. <button class="btn sm g" data-a="clr">Clear search &amp; filters</button></div>`;
  return (
    comp + chips + status + (list || empty) +
    (ps.length > 3 ? `<button class="btn sm g" data-a="more">${V.more ? "Show less" : "Show " + (ps.length - 3) + " more"}</button>` : "")
  );
}
function bodyPeople() {
  const q = V.q.toLowerCase(),
    l = S.users.filter((u) => u.id !== S.me.id && +T(u.t).ls !== 0 && u.n.toLowerCase().includes(q));
  return `<h3 style="margin:0 0 8px">Friends <span class="mut">${l.length}</span></h3><div class="fr">${l.map((u) => `<button class="ftile" data-a="visit" data-v="${u.id}"><img src="${T(u.t).av || DEFAV}" alt=""><span>${esc(u.n)}</span></button>`).join("") || `<span class="mut">No people match.</span>`}</div>`;
}
function sideInner() {
  const sh = S.show,
    hint = S.hint !== false ? `<div class="card"><b>Welcome! 3 quick steps</b><ol style="margin:6px 0;padding-left:20px"><li>Open <b>Edit profile</b> and make your page your own</li><li>Open a thread and leave a comment</li><li>Ask a question under <b>Concern</b></li></ol><button class="btn sm" data-a="hint">Got it, hide this</button></div>` : "";
  return hint + `<div class="tabs" role="group" aria-label="Sections">${[
    ["posts", "Posts"],
    ["people", "People"],
  ]
    .map(
      ([k, l]) =>
        `<button class="tab" data-a="tg" data-v="${k}" aria-pressed="${sh[k]}">${l}</button>`,
    )
    .join(
      "",
    )}</div><div id="sb">${sh.posts ? `<div>${bodyPosts()}</div>` : ""}${sh.people ? `<div style="margin-bottom:12px">${bodyPeople()}</div>` : ""}</div>
 <div class="card"><button class="btn g sm" data-a="rules" aria-expanded="${S.rules}">${S.rules ? "▾" : "▸"} Rules</button>${S.rules ? `<ul><li>Be respectful</li><li>No harassment or hate speech</li><li>No spam or unauthorized selling</li></ul>` : ""}</div><button class="btn g sm" data-a="reset">Reset demo data</button>`;
}
function render() {
  const a = $("#app");
  if (!S.me) {
    a.innerHTML = `<div class="login card"><h1 style="color:var(--cyd)">CIIT Forum</h1><p class="mut">${V.login == "up" ? "Create your account" : "Log in to continue"}. An account is required.</p>${V.login == "up" ? `<label for="ln">Display name</label><input id="ln" autocomplete="nickname" aria-describedby="lerr">` : ""}<label for="le">Email</label><input id="le" type="email" autocomplete="email" aria-describedby="lerr" placeholder="you@example.com"><label for="lp">Password</label><input id="lp" type="password" autocomplete="current-password" aria-describedby="lerr" placeholder="At least 8 characters"><label style="display:flex;gap:6px;align-items:center;font-weight:400"><input type="checkbox" data-showpw> Show password</label><div class="err" id="lerr" role="alert" style="min-height:22px"></div><button class="btn" style="width:100%" data-a="auth">${V.login == "up" ? "Sign up" : "Log in"}</button>${V.login == "in" ? `<div class="demo"><b>Try the demo account</b><br>Email: ${DEMO.email}<br>Password: ${DEMO.pw}<br><button class="btn sm g" style="margin-top:6px" data-a="demo">Fill in demo login</button></div>` : ""}<p><a href="#" data-a="tog" style="color:var(--cyd)">${V.login == "up" ? "I already have an account" : "Create an account"}</a> · <a href="#" data-a="forgot" style="color:var(--cyd)">Forgot password?</a></p></div>`;
    return;
  }
  const sm = $("#main")?.scrollTop,
    sa = $("#side")?.scrollTop,
    own = !V.view || V.view == S.me.id,
    vu = own ? S.me : user(V.view),
    t = V.edit || T(vu.t);
  a.innerHTML = `<a class="skip" href="#main">Skip to content</a><header class="hdr"><a href="#" class="brand" data-a="home" aria-label="CIIT Forum home"><span aria-hidden="true">☺</span> ciit forum</a><input id="q" type="search" placeholder="Search threads, people… (press /)" aria-label="Search threads and people" value="${esc(V.q)}"><span class="sp"></span><span style="color:#cfe3ec">Signed in as <strong>${esc(S.me.n)}</strong></span><button class="btn g sm" data-a="out">Log out</button></header>
 <div class="mt"><button class="tab" data-a="mt" data-v="profile" aria-selected="${V.tab == "profile"}">Profile</button><button class="tab" data-a="mt" data-v="feed" aria-selected="${V.tab == "feed"}">Feed</button></div>
 <div class="wrap"><main id="main" tabindex="-1" class="${V.tab == "feed" ? "hid" : ""}" style="${bgCSS(own || !V.plain ? t : T({}))}">${V.edit || !own ? `<div class="bar" id="bar">${barHTML(own, vu)}</div>` : ""}<div id="panel">${V.edit ? panel() : ""}</div><div id="pvw">${prof(vu, t, !!V.edit, V.plain && !own)}</div>${V.edit ? `<div class="sv"><button class="btn" data-a="save">Save</button><button class="btn g" data-a="cancel">Cancel</button><button class="btn g" data-a="def">Reset to default</button><span id="dirty" class="mut" style="color:#566873" role="status">No changes yet</span> <span id="warn">${warn(V.edit)}</span></div>` : ""}</main>
 <aside id="side" aria-label="Forum threads and people" class="${V.tab == "profile" ? "hid" : ""}" style="background:${sideBg(t)}">${sideInner()}</aside></div>`;
  if (sm) $("#main").scrollTop = sm;
  if (sa) $("#side").scrollTop = sa;
}
function pv() {
  const d = V.edit;
  $("#pvw").innerHTML = prof(S.me, d, true, false);
  $("#main").style.cssText = bgCSS(d);
  $("#side").style.background = sideBg(d);
  ds();
}
function rp() {
  $("#bar").innerHTML = barHTML(true, S.me);
  $("#panel").innerHTML = panel();
}
const isDirty = () => {
  if (!V.edit) return false;
  const { n, ...t } = V.edit;
  return JSON.stringify(t) != JSON.stringify(T(S.me.t)) || n != S.me.n;
};
const discardOk = () => !isDirty() || confirm("Discard your unsaved changes?");
const ds = () => {
  const d = $("#dirty");
  if (!d) return;
  const x = isDirty();
  d.textContent = x ? "● Unsaved changes" : "No changes yet";
  d.className = x ? "dirty" : "mut";
};
window.addEventListener("beforeunload", (e) => {
  if (isDirty()) { e.preventDefault(); e.returnValue = ""; }
});
document.addEventListener("keydown", (e) => {
  const t = e.target, typing = /INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable;
  if (e.key == "/" && !typing && $("#q")) { e.preventDefault(); $("#q").focus(); return; }
  if (e.key == "Escape") {
    if (V.menu) { V.menu = false; render(); $('[data-a="gear"]')?.focus(); }
    else if (V.edit) act("cancel");
    else if (V.comp) act("comp");
    else if (t.id == "q" && V.q) { V.q = ""; t.value = ""; $("#side").innerHTML = sideInner(); }
    return;
  }
  if (e.key == "Enter" && t.tagName == "INPUT" && !e.shiftKey) {
    const m = { le: "auth", lp: "auth", ln: "auth", cc: "cmt", wc: "wall" }[t.id];
    if (m) { e.preventDefault(); $(`[data-a="${m}"]`)?.click(); }
  }
  if (e.key == "Enter" && (e.ctrlKey || e.metaKey) && t.id == "pb") $('[data-a="post"]')?.click();
});
const draft = () => {
  V.edit = JSON.parse(JSON.stringify({ ...T(S.me.t), n: S.me.n }));
  V.panel = "themes";
  V.tab = "profile";
};
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-a]");
  if (V.menu && !e.target.closest(".gm") && !(b && b.dataset.a == "gear")) {
    V.menu = false;
    render();
  }
  if (!b) return;
  if (b.tagName == "A") e.preventDefault();
  const a = b.dataset.a, v = b.dataset.v;
  act(a, v);
  if (document.activeElement === document.body || !document.body.contains(document.activeElement)) {
    const sel = `[data-a="${a}"]` + (v != null ? `[data-v="${CSS.escape(v)}"]` : "");
    const el = (a == "comp" && V.comp && $("#pt")) || (a == "open" && V.open && $("#cc")) || (a == "gear" && V.menu && $(".gi")) || $(sel) ||
      (a == "post" && $('[data-a="comp"]')) || $("#main") || $("#le");
    el && el.focus();
  }
});
document.addEventListener("input", (e) => {
  const b = e.target;
  if (b.id == "pt" || b.id == "pb") {
    const k = b.id == "pt" ? "t" : "b";
    V.d[k] = b.value;
    b.removeAttribute("aria-invalid");
    $("#" + b.id + "c").textContent = b.value.length + "/" + (k == "t" ? 80 : 500);
    return;
  }
  if (b.id == "q") {
    V.q = b.value;
    const s = $("#side");
    s.innerHTML = sideInner();
    return;
  }
  const k = b.dataset.k;
  if (!k || !V.edit) return;
  V.edit[k] = b.isContentEditable ? b.textContent : b.value;
  if (!b.isContentEditable) {
    const sp = $("#v_" + k);
    if (sp) sp.textContent = b.value;
    pv();
  }
  $("#warn").innerHTML = warn(V.edit);
  ds();
});
document.addEventListener("change", (e) => {
  const b = e.target;
  if (b.id == "pc") V.d.c = b.value;
  if (b.hasAttribute("data-showpw")) $("#lp").type = b.checked ? "text" : "password";
  if (b.hasAttribute("data-plain")) {
    V.plain = b.checked;
    render();
  }
  if (b.dataset.b) {
    const h = V.edit.hide,
      k = b.dataset.b,
      i = h.indexOf(k);
    if (b.checked && i > -1) h.splice(i, 1);
    if (!b.checked && i < 0) h.push(k);
    pv();
  }
  if (b.dataset.up) upload(b.files[0], b.dataset.up);
  if (b.dataset.k == "card" || b.dataset.k == "bubble" || b.dataset.k == "name")
    $("#warn").innerHTML = warn(V.edit);
});
function upload(f, k) {
  const er = $("#uerr"),
    bad = (m) => {
      if (er) er.textContent = m;
      toast(m);
    };
  if (!f) return;
  if (!["image/png", "image/jpeg", "image/webp"].includes(f.type))
    return bad("Unsupported file type. Please choose a JPG, PNG or WebP image.");
  if (f.size > 512000)
    return bad(
      "That image is " + Math.round(f.size / 1024) + " KB. Please choose one under 500 KB.",
    );
  if (k == "ph" && V.edit.ph.length >= 6)
    return bad("You can add up to 6 photos. Remove one first.");
  const r = new FileReader();
  r.onload = () => {
    k == "ph" ? V.edit.ph.push(r.result) : (V.edit[k] = r.result);
    rp();
    pv();
    toast("Image added to preview");
  };
  r.readAsDataURL(f);
}
function act(a, v) {
  const A = {
    tog() {
      V.login = V.login == "in" ? "up" : "in";
      render();
    },
    forgot() {
      $("#lerr").textContent = "Demo only: a reset link would be sent to your email.";
    },
    auth() {
      const E = $("#le"), P = $("#lp"), N = $("#ln"), er = $("#lerr"),
        e = E.value.trim(), p = P.value, n = N ? N.value.trim() : "";
      [E, P, N].forEach((x) => x && x.removeAttribute("aria-invalid"));
      er.textContent = "";
      const bad = (x, m) => { er.textContent = m; x.setAttribute("aria-invalid", "true"); x.focus(); };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return bad(E, "Please enter a valid email, like you@example.com.");
      if (p.length < 8) return bad(P, "Password needs at least 8 characters (yours has " + p.length + ").");
      if (V.login == "up" && !n) return bad(N, "Please choose a display name.");
      if (V.login == "in" && e.toLowerCase() == DEMO.email) {
        if (p !== DEMO.pw) return bad(P, "That’s not the demo password. It’s shown below the form.");
        return loginAs(DEMO.id);
      }
      join(n || e.split("@")[0]);
    },
    demo() {
      $("#le").value = DEMO.email;
      $("#lp").value = DEMO.pw;
      $("#lerr").textContent = "Demo login filled in. Press Log in.";
      $('[data-a="auth"]').focus();
    },
    gear() {
      V.menu = !V.menu;
      render();
    },
    gm() {
      V.menu = false;
      draft();
      V.panel = { edit: "info", look: "themes", photos: "media", arrange: "blocks", privacy: "privacy" }[v];
      render();
    },
    out() {
      if (!discardOk()) return;
      resetView();
      S.me = null;
      S.users = S.users.filter((u) => u.id != "me");
      save();
      V.view = null;
      V.edit = null;
      render();
    },
    edit() {
      draft();
      render();
    },
    pn() {
      V.panel = V.panel == v ? null : v;
      rp();
    },
    pre() {
      const o = V.edit,
        n = T(PRE[v]);
      CK2.forEach((k) => (n[k] = o[k]));
      V.edit = JSON.parse(JSON.stringify(n));
      pv();
      rp();
      $("#warn").innerHTML = warn(V.edit);
    },
    def() {
      const o = V.edit,
        n = T({});
      CK.forEach((k) => (n[k] = o[k]));
      V.edit = n;
      pv();
      rp();
      toast("Reset to default theme");
    },
    rm() {
      V.edit[v] = v == "bg2" ? "" : "";
      pv();
      rp();
    },
    rmph() {
      V.edit.ph.splice(+v, 1);
      rp();
      pv();
    },
    mv() {
      const [i, d] = v.split(":").map(Number),
        o = V.edit.order,
        j = i + d;
      if (j < 0 || j >= o.length) return;
      [o[i], o[j]] = [o[j], o[i]];
      rp();
      pv();
    },
    fix() {
      const d = V.edit,
        cc = d.card == "dark" ? "#121826" : "#ffffff";
      d.name = on(cc);
      if (rat(d.name, d.bubble) < 4.5) d.bubble = cc;
      d.op = Math.max(+d.op, 70);
      rp();
      pv();
      $("#warn").innerHTML = warn(d);
    },
    save() {
      const { n, ...t } = V.edit;
      if (!n.trim()) return toast("Your name can’t be empty.");
      S.me.n = n.trim();
      S.me.t = t;
      V.edit = null;
      V.panel = null;
      const ok = save();
      render();
      toast(
        ok
          ? "Profile saved"
          : "Saved for now, but images are too big to keep after you close the tab",
      );
    },
    cancel() {
      if (!discardOk()) return;
      V.edit = null;
      V.panel = null;
      render();
    },
    visit() {
      if (!discardOk()) return;
      V.view = v == S.me.id ? null : v;
      V.plain = false;
      V.tab = "profile";
      V.edit = null;
      render();
      $("#main").scrollTop = 0;
    },
    back() {
      V.view = null;
      render();
    },
    home() {
      if (!discardOk()) return;
      V.view = null;
      V.edit = null;
      V.panel = null;
      V.tab = "feed";
      render();
    },
    hint() {
      S.hint = false;
      save();
      render();
      toast("Tip hidden. You can reset it from “Reset demo data”.");
    },
    cat() {
      V.cat = v;
      V.more = 0;
      render();
    },
    clr() {
      V.q = "";
      V.cat = "All";
      render();
      toast("Showing all threads");
    },
    tg() {
      S.show[v] = !S.show[v];
      if (!S.show.posts && !S.show.people) {
        S.show = { posts: true, people: true };
        toast("Both sections were off, so both are showing again");
      }
      save();
      render();
    },
    rules() {
      S.rules = !S.rules;
      save();
      render();
    },
    mt() {
      V.tab = v;
      render();
    },
    open() {
      V.open = V.open == +v ? null : +v;
      render();
    },
    like() {
      const p = S.posts.find((x) => x.id == v),
        i = p.by.indexOf(S.me.id);
      if (i < 0) {
        p.by.push(S.me.id);
        p.l++;
        toast("Liked");
      } else {
        p.by.splice(i, 1);
        p.l--;
        toast("Like removed");
      }
      save();
      V.pop = +v;
      render();
      V.pop = null;
    },
    comp() {
      if (V.comp) {
        if ((V.d.t || V.d.b) && !confirm("Discard this draft?")) return;
        V.d = { t: "", b: "", c: "Regular post" };
      }
      V.comp = !V.comp;
      render();
    },
    more() {
      V.more = !V.more;
      render();
    },
    cmt() {
      const i = $("#cc");
      if (!i.value.trim()) return toast("Write something first");
      S.posts.find((x) => x.id == v).cm.push({ u: S.me.id, t: i.value.trim() });
      save();
      render();
      toast("Comment posted");
    },
    wall() {
      const i = $("#wc");
      if (!i.value.trim()) return toast("Write something first");
      const u = user(V.view);
      (u.wall = u.wall || []).push({ u: S.me.id, t: i.value.trim() });
      save();
      render();
      toast("Comment posted");
    },
    post() {
      const t = $("#pt").value.trim(),
        b = $("#pb").value.trim();
      if (!t || !b) {
        $("#pe").textContent = !t ? "Please add a title." : "Please write a message.";
        const f = $(!t ? "#pt" : "#pb");
        f.setAttribute("aria-invalid", "true");
        return f.focus();
      }
      S.posts.unshift({
        id: Date.now(),
        c: $("#pc").value,
        u: S.me.id,
        t,
        b,
        l: 0,
        cm: [],
        by: [],
      });
      V.comp = 0;
      V.d = { t: "", b: "", c: "Regular post" };
      V.cat = "All";
      V.q = "";
      save();
      render();
      toast("Posted! Your thread is at the top of the list.");
    },
    reset() {
      if (!confirm("Reset all demo data?")) return;
      localStorage.removeItem("ciitf4");
      S = load();
      normalize();
      V.view = null;
      V.edit = null;
      render();
      toast("Demo data reset");
    },
  };
  A[a] && A[a]();
}
function resetView() {
  Object.assign(V, {
    view: null,
    edit: null,
    panel: null,
    plain: false,
    open: null,
    tab: "profile",
    q: "",
    comp: 0,
    more: 0,
    cat: "All",
    d: { t: "", b: "", c: "Regular post" },
  });
}
function loginAs(id) {
  resetView();
  S.me = S.users.find((u) => u.id == id);
  save();
  render();
  toast("Welcome back, " + S.me.n + "!");
}
function join(n) {
  resetView();
  try {
    joinNow(n);
  } catch (err) {
    S.me = null;
    render();
    $("#lerr").textContent = "Something went wrong: " + err.message;
  }
}
function joinNow(n) {
  S.me = {
    id: "me",
    n,
    t: T({ bio: "CIIT student", st: "Just joined!", q: "Hello, CIIT!" }),
    wall: [],
  };
  S.users = S.users.filter((u) => u.id != "me");
  S.users.push(S.me);
  save();
  draft();
  render();
  toast("Welcome, " + n + "! Make your profile your own.");
}
render();
