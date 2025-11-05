import React, { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

/**
 * 數字DNA — 您的光之守護 WebApp（完整版）
 * 視覺：粉金 × 墨綠金 × 雲霧仙氣 × 曼陀羅能量
 * 功能：生日/個人代碼/身分證/車牌 → 數字頻率 → 八大守護者映射
 * 內容：守護者卡片、課程定價（39,800／31,931／31,419）、專案服務（6,800／16,800／16,888）、CTA
 */

const BRAND_COLORS = {
  primary: "from-pink-100 via-rose-200 to-amber-100",
  accent: "from-emerald-700 via-emerald-800 to-green-900",
};

const GUARDIANS = [
  { id: 1, key: "正官", en: "Solar Guardian of Order", color: "from-amber-100 via-amber-300 to-amber-500", glow: "shadow-[0_0_40px_rgba(251,191,36,0.55)]", desc: "秩序 × 責任 × 定錨。穩住場域、建立邊界與承擔。" },
  { id: 2, key: "食神", en: "Angel of Abundance", color: "from-yellow-100 via-yellow-300 to-amber-400", glow: "shadow-[0_0_40px_rgba(245,158,11,0.5)]", desc: "富足 × 分享 × 接納。讓能量流動,豐盛自來。" },
  { id: 3, key: "比肩", en: "Crimson Warrior of Courage", color: "from-rose-200 via-pink-300 to-rose-400", glow: "shadow-[0_0_40px_rgba(244,63,94,0.5)]", desc: "勇氣 × 自我 × 行動。以真實之心,踏出第一步。" },
  { id: 4, key: "正印", en: "Goddess of Compassion", color: "from-white via-pink-50 to-amber-50", glow: "shadow-[0_0_40px_rgba(203,213,225,0.5)]", desc: "慈悲 × 安定 × 療癒。以柔軟承接,回到中心。" },
  { id: 5, key: "七煞", en: "Flame Breaker Spirit", color: "from-orange-200 via-rose-300 to-red-400", glow: "shadow-[0_0_40px_rgba(251,146,60,0.55)]", desc: "突破 × 蛻變 × 斷捨離。燒掉不合時宜的殼。" },
  { id: 6, key: "傷官", en: "Azure Sage of Wisdom", color: "from-sky-100 via-blue-200 to-indigo-300", glow: "shadow-[0_0_40px_rgba(96,165,250,0.5)]", desc: "創意 × 表達 × 靈感。讓語言成為療癒的橋。" },
  { id: 7, key: "劫財", en: "Amber Flow Keeper", color: "from-amber-100 via-yellow-200 to-amber-400", glow: "shadow-[0_0_40px_rgba(217,119,6,0.5)]", desc: "欲望 × 流通 × 邊界。金錢是能量,流通有度。" },
  { id: 8, key: "偏印", en: "Violet Seer of Inspiration", color: "from-violet-100 via-fuchsia-200 to-purple-300", glow: "shadow-[0_0_40px_rgba(168,85,247,0.5)]", desc: "靈感 × 非典型 × 直覺。走出自己的路。" },
];

// —— 計算工具 ——
function sumDigitsToOneFromString(str) {
  const digits = (str || "").replace(/[^0-9]/g, "");
  if (!digits) return null;
  let s = digits.split("").map((d) => parseInt(d, 10)).reduce((a, b) => a + b, 0);
  while (s > 9) s = String(s).split("").reduce((a, b) => a + parseInt(b, 10), 0);
  return s === 0 ? 9 : s;
}

function sumDigitsToOne(n) {
  let s = String(n).split("").filter((c) => /\d/.test(c)).map((d) => parseInt(d, 10)).reduce((a, b) => a + b, 0);
  while (s > 9) s = String(s).split("").reduce((a, b) => a + parseInt(b, 10), 0);
  return s === 0 ? 9 : s;
}

function mapToGuardianId(num1to9) {
  if (!num1to9) return null;
  const v = num1to9 === 9 ? 1 : num1to9;
  return ((v - 1) % 8) + 1;
}

function calcAll(dateStr, personalCode, idStr, plateStr) {
  const birthdayDigits = (dateStr || "").replace(/[^0-9]/g, "");
  const life = birthdayDigits ? sumDigitsToOne(birthdayDigits) : null;
  const pairs = { 1: 9, 2: 8, 3: 7, 4: 6, 5: 5, 6: 4, 7: 3, 8: 2, 9: 1 };
  const shadow = life ? pairs[life] : null;
  const codeNum = sumDigitsToOneFromString(personalCode);
  const idNum = sumDigitsToOneFromString(idStr);
  const plateNum = sumDigitsToOneFromString(plateStr);
  return {
    life,
    shadow,
    birthdayGuardian: mapToGuardianId(life),
    codeNum,
    codeGuardian: mapToGuardianId(codeNum),
    idNum,
    idGuardian: mapToGuardianId(idNum),
    plateNum,
    plateGuardian: mapToGuardianId(plateNum),
  };
}

// —— UI 小元件 ——
const Halo = ({ className = "" }) => (
  <svg viewBox="0 0 200 200" className={`w-full h-full ${className}`}>
    <defs>
      <radialGradient id="g" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="60%" stopColor="#fde68a" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="100" r="90" fill="url(#g)" />
  </svg>
);

const Angel = ({ accent = "#f59e0b" }) => (
  <svg viewBox="0 0 300 300" className="w-full h-40">
    <defs>
      <linearGradient id="wing" x1="0" x2="1">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
        <stop offset="100%" stopColor={accent} stopOpacity="0.45" />
      </linearGradient>
    </defs>
    <circle cx="150" cy="150" r="80" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="2" />
    <path d="M40,170 C90,130 120,120 150,165 C180,120 210,130 260,170 C230,120 205,90 150,95 C95,90 70,120 40,170 Z" fill="url(#wing)" />
    <path d="M150 105 C140 120 138 140 150 175 C162 140 160 120 150 105 Z" fill="#fff" opacity="0.9" />
    <g fill={accent} opacity="0.55">
      <circle cx="190" cy="120" r="2" />
      <circle cx="110" cy="130" r="1.8" />
      <circle cx="165" cy="185" r="1.6" />
    </g>
  </svg>
);

const Badge = ({ text }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs backdrop-blur">
    <Sparkles className="w-3 h-3" />
    <span>{text}</span>
  </div>
);

export default function App() {
  const [dateStr, setDateStr] = useState("");
  const [codeStr, setCodeStr] = useState("");
  const [idStr, setIdStr] = useState("");
  const [plateStr, setPlateStr] = useState("");

  const profile = useMemo(() => calcAll(dateStr, codeStr, idStr, plateStr), [dateStr, codeStr, idStr, plateStr]);

  return (
    <div className={`min-h-screen w-full text-slate-800 bg-gradient-to-b ${BRAND_COLORS.primary}`}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-70 mix-blend-screen">
          <Halo className="absolute -top-20 -left-20 w-[40rem] h-[40rem]"/>
          <Halo className="absolute -bottom-32 -right-10 w-[34rem] h-[34rem]"/>
        </div>
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-3/5">
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-emerald-900">數字DNA — 您的光之守護</h1>
              <p className="mt-4 text-emerald-900/90 md:text-lg leading-relaxed">
                以八大能量原型（正官／食神／比肩／正印／七煞／傷官／劫財／偏印）映照你的靈魂藍圖。
                透過生日與代碼演算,找到此刻最需要啟動的守護力量。
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge text="DNA 13191419" />
                <Badge text="Oracle × Mandala × Angel" />
                <Badge text="五行能量整合" />
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm text-emerald-800">出生日期（YYYY-MM-DD）</span>
                  <input
                    type="date"
                    className="rounded-xl border border-emerald-300 bg-white/70 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm text-emerald-800">個人代碼（手機末四碼等）</span>
                  <input
                    type="text"
                    placeholder="0912 / 6789"
                    className="rounded-xl border border-emerald-300 bg-white/70 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={codeStr}
                    onChange={(e) => setCodeStr(e.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm text-emerald-800">身分證（僅取數字,用於能量映射）</span>
                  <input
                    type="text"
                    placeholder="A123456789"
                    className="rounded-xl border border-emerald-300 bg-white/70 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={idStr}
                    onChange={(e) => setIdStr(e.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm text-emerald-800">車牌號碼（僅取數字,用於能量映射）</span>
                  <input
                    type="text"
                    placeholder="ABC-1234 / 8888"
                    className="rounded-xl border border-emerald-300 bg-white/70 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={plateStr}
                    onChange={(e) => setPlateStr(e.target.value)}
                  />
                </label>
              </div>
              <p className="mt-4 text-xs text-emerald-900/80">
                計算邏輯：將數字相加至 1–9（0 視為 9 的回歸）,9 對應 1 的高階循環,用以映射八守護者；此為入門版演算法。
              </p>
            </div>
            <div className="md:w-2/5">
              <div className="rounded-3xl bg-white/60 backdrop-blur p-6 shadow-2xl ring-1 ring-white/50">
                <Angel accent="#f59e0b" />
                <div className="text-center mt-2">
                  <div className="text-xs tracking-widest text-amber-700">ANGELIC FREQUENCY</div>
                  <div className="text-lg font-medium text-emerald-900">光之守護啟動</div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-amber-50 border border-amber-100 p-3">
                    <div className="text-amber-700">主命數</div>
                    <div className="text-2xl font-bold text-amber-800">{profile.life || "—"}</div>
                  </div>
                  <div className="rounded-xl bg-violet-50 border border-violet-100 p-3">
                    <div className="text-violet-700">影子對位</div>
                    <div className="text-2xl font-bold text-violet-800">{profile.shadow || "—"}</div>
                  </div>
                  <div className="rounded-xl bg-rose-50 border border-rose-100 p-3">
                    <div className="text-rose-700">生日守護</div>
                    <div className="text-sm text-rose-800">{profile.birthdayGuardian ? `#${profile.birthdayGuardian} ${GUARDIANS.find(g=>g.id===profile.birthdayGuardian)?.key}` : "—"}</div>
                  </div>
                  <div className="rounded-xl bg-sky-50 border border-sky-100 p-3">
                    <div className="text-sky-700">代碼守護</div>
                    <div className="text-sm text-sky-800">{profile.codeGuardian ? `#${profile.codeGuardian} ${GUARDIANS.find(g=>g.id===profile.codeGuardian)?.key}` : "—"}</div>
                  </div>
                  <div className="rounded-xl bg-fuchsia-50 border border-fuchsia-100 p-3 col-span-2">
                    <div className="text-fuchsia-700">身分證守護／車牌守護</div>
                    <div className="text-sm text-fuchsia-800 mt-1">
                      {profile.idGuardian ? `#${profile.idGuardian} ${GUARDIANS.find(g=>g.id===profile.idGuardian)?.key}` : "—"}
                      <span className="mx-2">｜</span>
                      {profile.plateGuardian ? `#${profile.plateGuardian} ${GUARDIANS.find(g=>g.id===profile.plateGuardian)?.key}` : "—"}
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-[11px] text-slate-600 text-center">
                  提醒：此為入門版演算法；完整課程將帶你進入字母轉碼、位置權重、上盤/下盤比例等進階解析。
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guardians Grid */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-emerald-900">八大能量守護者</h2>
        <p className="mt-2 text-emerald-900/80">對應：正官／食神／比肩／正印／七煞／傷官／劫財／偏印。點擊卡片可查看關鍵提醒。</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUARDIANS.map((g) => {
            return (
              <div key={g.id} className={`group relative rounded-3xl p-1 bg-gradient-to-br ${g.color} ${g.glow}`}>
                <div className="rounded-2xl bg-white/70 backdrop-blur p-5 h-full">
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold text-emerald-900">{g.key}</div>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500">{g.en}</span>
                  </div>
                  <div className="mt-3">
                    <Angel />
                  </div>
                  <p className="mt-3 text-sm text-slate-700 leading-relaxed">{g.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing & CTA */}
      <section id="signup" className="relative">
        <div className="absolute inset-0 -z-10 opacity-60">
          <Halo className="absolute left-1/2 -translate-x-1/2 -top-40 w-[48rem] h-[48rem]" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-emerald-900">課程資訊與報名</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-white/70 backdrop-blur p-6 ring-1 ring-white/60 shadow-xl">
              <div className="text-sm text-slate-500">原價</div>
              <div className="text-3xl font-bold text-slate-900">NT$ 39,800</div>
              <div className="mt-4 text-sm text-slate-600">三日完整課程（線上／實體擇一）,含教材與結業證書。</div>
            </div>
            <div className="rounded-3xl bg-white/90 backdrop-blur p-6 ring-2 ring-amber-300 shadow-2xl">
              <div className="text-sm text-amber-700">個人一對一・限時優惠</div>
              <div className="text-3xl font-bold text-amber-800">NT$ 31,931</div>
              <ul className="mt-3 text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>專屬解盤：靈魂藍圖 PDF</li>
                <li>八守護者能量卡</li>
                <li>顯化冥想音頻</li>
              </ul>
              <a href="https://line.me/ti/p/~loveyogaleona" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center justify-center w-full rounded-xl bg-amber-500 px-4 py-3 text-white font-semibold hover:bg-amber-600 transition">
                透過 LINE 報名
              </a>
            </div>
            <div className="rounded-3xl bg-white/80 backdrop-blur p-6 ring-1 ring-white/60 shadow-xl">
              <div className="text-sm text-violet-700">三人同行・開班價</div>
              <div className="text-3xl font-bold text-violet-800">NT$ 31,419／人</div>
              <ul className="mt-3 text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>小班共學（3–6人）</li>
                <li>團隊能量整合練習</li>
                <li>群體顯化場域祝福</li>
              </ul>
              <a href="mailto:loveyogaandangel@gmail.com?subject=我要報名數字DNA課程&body=您好,我想報名三人同行開班,預計人數：___,可上課時段：___" className="mt-4 inline-flex items-center justify-center w-full rounded-xl bg-violet-600 px-4 py-3 text-white font-semibold hover:bg-violet-700 transition">
                Email 洽詢／團報
              </a>
            </div>
          </div>

          {/* 專案服務 */}
          <div className="mx-auto max-w-6xl mt-10">
            <h3 className="text-xl font-semibold text-emerald-900 mb-4">專案服務（單點諮詢）</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-3xl bg-white/85 backdrop-blur p-6 ring-1 ring-emerald-100 shadow-xl">
                <div className="text-sm text-emerald-700">一對一解盤（90–120分鐘）</div>
                <div className="text-3xl font-bold text-emerald-900">NT$ 6,800</div>
                <ul className="mt-3 text-sm text-slate-700 list-disc list-inside space-y-1">
                  <li>個人數字DNA深度解析</li>
                  <li>當期課題與顯化指引</li>
                  <li>重點摘要 PDF</li>
                </ul>
                <a href="https://line.me/ti/p/~loveyogaleona" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center justify-center w-full rounded-xl bg-emerald-700 px-4 py-3 text-white font-semibold hover:bg-emerald-800 transition">預約一對一</a>
              </div>

              <div className="rounded-3xl bg-white/85 backdrop-blur p-6 ring-1 ring-amber-100 shadow-xl">
                <div className="text-sm text-amber-700">挑選車牌（含能量校準）</div>
                <div className="text-3xl font-bold text-amber-900">NT$ 16,800</div>
                <ul className="mt-3 text-sm text-slate-700 list-disc list-inside space-y-1">
                  <li>數字能量 五行頻率 校準磁場</li>
                  <li>選對順行能量 啟動共振頻率</li>
                  <li>讓人生全程順流</li>
                </ul>
                <a href="https://line.me/ti/p/~loveyogaleona" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center justify-center w-full rounded-xl bg-amber-500 px-4 py-3 text-white font-semibold hover:bg-amber-600 transition">諮詢車牌</a>
              </div>

              <div className="rounded-3xl bg-white/85 backdrop-blur p-6 ring-1 ring-rose-100 shadow-xl">
                <div className="text-sm text-rose-700">頻率提升・開運大頭貼</div>
                <div className="text-3xl font-bold text-rose-900">NT$ 16,888</div>
                <ul className="mt-3 text-sm text-slate-700 list-disc list-inside space-y-1">
                  <li>數字頻率 × 色彩脈輪建議</li>
                  <li>搭配八字五行能量構圖</li>
                  <li>開運能量背景設計</li>
                </ul>
                <a href="https://line.me/ti/p/~loveyogaleona" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center justify-center w-full rounded-xl bg-rose-500 px-4 py-3 text-white font-semibold hover:bg-rose-600 transition">打造大頭貼</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl bg-white/60 backdrop-blur p-6 ring-1 ring-white/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div>
              <div className="text-sm tracking-widest text-slate-500">CONTACT</div>
              <div className="mt-2 text-emerald-900 font-medium">愛倒立的天使 Leona</div>
              <div className="text-sm text-slate-600">IG／FB／LINE：搜尋「愛倒立的天使療癒」</div>
              <div className="text-sm text-slate-600">Email：loveyogaandangel@gmail.com</div>
            </div>
            <div className="md:col-span-2 text-sm text-slate-600">
              <p>Frequency & Soul Design｜以修行的優雅與實作的清晰,協助你看見靈魂藍圖、調頻與顯化。</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href="https://line.me/ti/p/~loveyogaleona" target="_blank" rel="noreferrer" className="rounded-full bg-emerald-600/90 text-white px-4 py-2 text-sm font-semibold hover:bg-emerald-700">加 LINE 諮詢</a>
                <a href="#signup" className="rounded-full bg-amber-500 text-white px-4 py-2 text-sm font-semibold hover:bg-amber-600">查看課程資訊</a>
              </div>
            </div>
          </div>
          <div className="mt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} Leona Angel. DNA 13191419 • All rights reserved.
            <div className="mt-2">
              LINE：https://line.me/ti/p/~loveyogaleona |
              IG：@love_yoga_leona31931 |
              Email：loveyogaandangel@gmail.com
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}