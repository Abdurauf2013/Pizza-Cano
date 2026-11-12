import { useState, useEffect } from "react";

// ====== BURANI DƏYİŞ ======
const phoneText = "Nomre";
const instagram = "https://www.instagram.com/pizza.cano?srtk=OTc2ZnEwaW4xbjJo";
const address = "unvan";
// WhatsApp nömrəsi: + və boşluq olmadan, 994 ilə başla. Məs: "994501234567"
const whatsappNumber = "";
// ==========================

const u = (id) => `https://images.unsplash.com/${id}?w=600&auto=format&fit=crop`;

const categories = [
  { id: "pizza", name: "Pizzalar", emoji: "🍕" },
  { id: "burger", name: "Burgerlər", emoji: "🍔" },
  { id: "nuggets", name: "Naggetslər", emoji: "🍗" },
  { id: "drinks", name: "İçkilər", emoji: "🥤" }
];

const sizes = (a, b, c) => [
  { label: "Kiçik", price: a },
  { label: "Orta", price: b },
  { label: "Böyük", price: c }
];

const foods = [
  // PİZZALAR
  { id: "p1", cat: "pizza", name: "Margherita", description: "Mozzarella, pomidor sousu", options: sizes(8, 12, 16), image: "/images/margherita.png", cutout: true },
  { id: "p2", cat: "pizza", name: "Pepperoni", description: "Pepperoni, mozzarella, sous", options: sizes(10, 14, 18), image: "/images/pepperoni.png", cutout: true },
  { id: "p3", cat: "pizza", name: "Cheese Pizza", description: "Bol pendir və xüsusi sous", options: sizes(10, 14, 18), image: "/images/cheesepizza.webp", cutout: true },
  { id: "p5", cat: "pizza", name: "Chicken Pizza", description: "Toyuq, pendir, bibər, pomidor", options: sizes(9, 13, 17), image: "/images/chickenpizza.png", cutout: true },

  // BURGERLƏR
  { id: "b1", cat: "burger", name: "Hamburger", description: "Mal əti kotleti, kahı, pomidor, sous", options: [{ label: "", price: 5 }], image: u("photo-1568901346375-23c9450c58cd") },
  { id: "b2", cat: "burger", name: "Cheeseburger", description: "Kotlet, çedar pendiri, turşu, sous", options: [{ label: "", price: 6 }], image: u("photo-1586190848861-99aa4a171e90") },
  { id: "b3", cat: "burger", name: "Chicken burger", description: "Çıtır toyuq filesi, kahı, mayonez", options: [{ label: "", price: 5.5 }], image: u("photo-1606755962773-d324e0a13086") },
  { id: "b4", cat: "burger", name: "Double burger", description: "İki kotlet, ikiqat pendir", options: [{ label: "", price: 9 }], image: u("photo-1572802419224-296b0aeee0d9") },

  // NAGGETSLƏR
  { id: "n1", cat: "nuggets", name: "Naggets", description: "Çıtır toyuq parçaları", options: [{ label: "6 ədəd", price: 4.5 }, { label: "9 ədəd", price: 6.5 }, { label: "12 ədəd", price: 8.5 }], image: u("photo-1562967914-608f82629710") },
  { id: "n2", cat: "nuggets", name: "Toyuq strips", description: "Zolaq şəklində çıtır toyuq", options: [{ label: "5 ədəd", price: 6 }, { label: "8 ədəd", price: 9 }], image: u("photo-1626645738196-c2a7c87a8f58") },
  { id: "n3", cat: "nuggets", name: "Kartof fri", description: "Qızarmış çıtır kartof", options: [{ label: "Kiçik", price: 2.5 }, { label: "Böyük", price: 4 }], image: u("photo-1573080496219-bb080dd4f877") },
  { id: "n4", cat: "nuggets", name: "Naggets + fri kombo", description: "9 naggets, kiçik fri, sous", options: [{ label: "", price: 8 }], image: u("photo-1585109649139-366815a0d713") },

  // İÇKİLƏR
  { id: "d1", cat: "drinks", name: "Coca-Cola", description: "Soyuq qazlı içki", options: [{ label: "0.5 l", price: 2 }, { label: "1 l", price: 3 }], image: u("photo-1622483767028-3f66f32aef97") },
  { id: "d2", cat: "drinks", name: "Fanta", description: "Portağal dadlı qazlı içki", options: [{ label: "0.5 l", price: 2 }, { label: "1 l", price: 3 }], image: u("photo-1624517452488-04869289c4ca") },
  { id: "d3", cat: "drinks", name: "Ayran", description: "Soyuq, təbii ayran", options: [{ label: "", price: 1.5 }], image: "", emoji: "🥛" },
  { id: "d4", cat: "drinks", name: "Limonad", description: "Təzə limon və nanə", options: [{ label: "", price: 3 }], image: u("photo-1621263764928-df1444c5e859") },
  { id: "d5", cat: "drinks", name: "Su", description: "Təmiz içməli su", options: [{ label: "0.5 l", price: 1 }], image: u("photo-1548839140-29a749e1cf4d") }
];

const fmt = (n) => (Number.isInteger(n) ? n : n.toFixed(2));
const CART_KEY = "pizzacano-cart";

function FoodImage({ food, emoji }) {
  const [failed, setFailed] = useState(false);
  const [fit, setFit] = useState(null);

  // Şəffaf PNG/WebP-nin boş kənarlarını ölçüb avtomatik kəsir:
  // beləliklə bütün pizzalar eyni ölçüdə görünür
  const measure = (e) => {
    try {
      const img = e.currentTarget;
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      if (!w || !h) return;
      const cw = 200;
      const ch = Math.max(1, Math.round((cw * h) / w));
      const canvas = document.createElement("canvas");
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, cw, ch);
      const { data } = ctx.getImageData(0, 0, cw, ch);
      let x0 = cw, y0 = ch, x1 = -1, y1 = -1;
      for (let y = 0; y < ch; y++) {
        for (let x = 0; x < cw; x++) {
          if (data[(y * cw + x) * 4 + 3] > 24) {
            if (x < x0) x0 = x;
            if (x > x1) x1 = x;
            if (y < y0) y0 = y;
            if (y > y1) y1 = y;
          }
        }
      }
      if (x1 < 0) return;
      // object-contain ilə şəklin kvadrat qutuda yeri
      const dw = w >= h ? 1 : w / h;
      const dh = h >= w ? 1 : h / w;
      const X0 = (1 - dw) / 2 + (x0 / cw) * dw;
      const X1 = (1 - dw) / 2 + ((x1 + 1) / cw) * dw;
      const Y0 = (1 - dh) / 2 + (y0 / ch) * dh;
      const Y1 = (1 - dh) / 2 + ((y1 + 1) / ch) * dh;
      const s = 1 / Math.max(X1 - X0, Y1 - Y0);
      const cx = (X0 + X1) / 2;
      const cy = (Y0 + Y1) / 2;
      setFit({ s, tx: (0.5 - cx) * s * 100, ty: (0.5 - cy) * s * 100 });
    } catch {
      /* ölçmək alınmasa, şəkil olduğu kimi göstərilir */
    }
  };

  // Şəffaf PNG (cutout): dairəyə kəsmədən, pizza kartdan çıxmış kimi
  if (food.cutout && !failed) {
    return (
      <div className="relative z-10 mx-auto -mt-12 aspect-square w-[92%] transition duration-300 group-hover:-translate-y-1 group-hover:scale-105">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          onLoad={measure}
          onError={() => setFailed(true)}
          style={
            fit
              ? { transform: `translate(${fit.tx}%, ${fit.ty}%) scale(${fit.s})` }
              : undefined
          }
          className="h-full w-full object-contain drop-shadow-[0_14px_14px_rgba(0,0,0,0.28)]"
        />
      </div>
    );
  }

  return (
    <div className="relative z-10 mx-auto -mt-12 aspect-square w-[86%] overflow-hidden rounded-full bg-white shadow-[0_12px_24px_rgba(0,0,0,0.22)] transition duration-300 group-hover:-translate-y-1 group-hover:scale-105">
      {failed || !food.image ? (
        <div
          className="flex h-full w-full items-center justify-center bg-stone-200 text-8xl"
          aria-hidden="true"
        >
          {food.emoji || emoji}
        </div>
      ) : (
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

function FoodCard({ food, emoji, onAdd }) {
  const [sel, setSel] = useState(0);
  const [added, setAdded] = useState(false);
  const multi = food.options.length > 1;

  const add = () => {
    onAdd(food, sel);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };

  return (
    <div className="group flex flex-col rounded-3xl bg-white px-5 pb-5">
      <FoodImage food={food} emoji={emoji} />
      <h3 className="mt-4 text-base font-extrabold">{food.name}</h3>
      <p className="mt-1 min-h-[2.5rem] text-xs text-gray-500">{food.description}</p>

      <div className="my-4 flex min-h-[2.25rem] justify-center">
        {multi && (
          <div className="inline-flex divide-x divide-stone-200 overflow-hidden rounded-full border border-stone-200">
            {food.options.map((o, i) => (
              <button
                key={o.label}
                type="button"
                aria-pressed={sel === i}
                onClick={() => setSel(i)}
                className={`px-3.5 py-1.5 text-sm transition ${
                  sel === i ? "bg-stone-200 font-bold" : "bg-white hover:bg-stone-100"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2">
        <div className="text-2xl font-black">
          {fmt(food.options[sel].price)}
          <span className="ml-1 text-sm font-bold">AZN</span>
        </div>
        <button
          type="button"
          onClick={add}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
            added ? "bg-green-600 text-white" : "bg-amber-400 text-gray-900 hover:bg-amber-300"
          }`}
        >
          {added ? "✓ Əlavə olundu" : "Səbətə"}
        </button>
      </div>
    </div>
  );
}

function CartDrawer({ cart, setQty, clear, onClose, total }) {
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const waReady = /^\d{9,15}$/.test(whatsappNumber);
  const canSend = waReady && cart.length > 0 && name.trim() && addr.trim();

  const send = () => {
    const lines = cart.map(
      (i) => `• ${i.qty}x ${i.name}${i.label ? ` (${i.label})` : ""} - ${fmt(i.price * i.qty)} AZN`
    );
    const text = [
      "Salam, Pizza Cano! Sifariş vermək istəyirəm:",
      "",
      ...lines,
      "",
      `Cəmi: ${fmt(total)} AZN`,
      "",
      `Ad: ${name.trim()}`,
      `Ünvan: ${addr.trim()}`,
      note.trim() ? `Qeyd: ${note.trim()}` : ""
    ]
      .filter((l, idx, arr) => l !== "" || arr[idx - 1] !== "")
      .join("\n");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const input = "w-full rounded-xl border-2 border-stone-200 bg-stone-100 px-3 py-2 outline-none focus:border-red-600";

  return (
    <div className="fixed inset-0 z-40 flex justify-end" role="dialog" aria-modal="true" aria-label="Sifariş səbəti">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-red-600 px-5 py-4 text-white">
          <h2 className="text-xl font-black">🛒 Səbətim</h2>
          <button type="button" onClick={onClose} aria-label="Bağla" className="text-2xl font-black leading-none">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <p className="mt-10 text-center text-gray-500">Səbət boşdur. Menyudan seçim edin 🍕</p>
          ) : (
            <>
              <ul className="space-y-3">
                {cart.map((i) => (
                  <li key={i.key} className="flex items-center gap-3 rounded-2xl border-2 border-stone-200 p-3">
                    <div className="flex-1">
                      <div className="font-bold">
                        {i.name} {i.label && <span className="text-gray-500">({i.label})</span>}
                      </div>
                      <div className="text-sm font-black text-red-600">{fmt(i.price * i.qty)} AZN</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" aria-label="Azalt" onClick={() => setQty(i.key, i.qty - 1)} className="h-8 w-8 rounded-full bg-stone-200 font-black">−</button>
                      <span className="w-5 text-center font-black">{i.qty}</span>
                      <button type="button" aria-label="Artır" onClick={() => setQty(i.key, i.qty + 1)} className="h-8 w-8 rounded-full bg-stone-200 font-black">+</button>
                    </div>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={clear} className="mt-3 text-sm font-bold text-gray-500 underline">
                Səbəti təmizlə
              </button>

              <div className="mt-6 space-y-3">
                <input className={input} placeholder="Adınız *" value={name} onChange={(e) => setName(e.target.value)} />
                <input className={input} placeholder="Çatdırılma ünvanı *" value={addr} onChange={(e) => setAddr(e.target.value)} />
                <textarea className={input} rows={2} placeholder="Qeyd (istəyə bağlı)" value={note} onChange={(e) => setNote(e.target.value)} />
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t-2 border-stone-200 p-5">
            <div className="mb-3 flex items-center justify-between text-xl font-black">
              <span>Cəmi</span>
              <span className="text-red-600">{fmt(total)} AZN</span>
            </div>
            <button
              type="button"
              disabled={!canSend}
              onClick={send}
              className="w-full rounded-full bg-green-600 py-3 font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              WhatsApp ilə sifariş et
            </button>
            {!waReady && (
              <p className="mt-2 text-center text-xs text-red-600">WhatsApp nömrəsi hələ kodda yazılmayıb.</p>
            )}
            {waReady && !(name.trim() && addr.trim()) && (
              <p className="mt-2 text-center text-xs text-gray-500">Ad və ünvanı yazın.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [activeCat, setActiveCat] = useState("pizza");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (food, optIdx) => {
    const o = food.options[optIdx];
    const key = `${food.id}-${optIdx}`;
    setCart((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { key, name: food.name, label: o.label, price: o.price, qty: 1 }];
    });
  };

  const setQty = (key, qty) =>
    setCart((prev) =>
      qty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty } : i))
    );

  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // Aşağı sürüşdürəndə aktiv kateqoriyanı işıqlandır
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveCat(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const phoneHref = `tel:${phoneText.replace(/[^\d+]/g, "")}`;
  const hasPhone = /\d{5,}/.test(phoneText);

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-gray-900">
      {/* Üst zolaq */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 bg-red-600 px-5 py-2 text-sm font-bold text-white">
        <span>📍 {address}</span>
        <span className="flex gap-4">
          {hasPhone ? <a href={phoneHref}>📞 {phoneText}</a> : <span>📞 {phoneText}</span>}
          <a href={instagram} target="_blank" rel="noreferrer">📷 Instagram</a>
        </span>
      </div>

      {/* Hero */}
      <header className="bg-red-600 px-5 pb-14 pt-8 text-center text-white">
        <h1 className="text-5xl font-black leading-none tracking-tight sm:text-7xl">Pizza Cano</h1>
        <p className="mx-auto mb-6 mt-3 max-w-xs text-lg">
          Təzə, isti, sürətli. Səbətə at, WhatsApp-la sifariş et, qapına gətirək.
        </p>
        <button
          type="button"
          onClick={() => goTo("pizza")}
          className="rounded-full bg-amber-300 px-7 py-3 font-black text-gray-900 hover:bg-amber-200"
        >
          Menyuya bax
        </button>
      </header>
      <svg
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="-mt-7 block h-7 w-full text-stone-100"
      >
        <path d="M0 10 Q 12.5 0 25 6 T 50 6 T 75 6 T 100 4 V10Z" fill="currentColor" />
      </svg>

      {/* Kateqoriya paneli */}
      <nav aria-label="Kateqoriyalar" className="sticky top-0 z-20 border-b-2 border-stone-200 bg-stone-100">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => goTo(c.id)}
              className={`shrink-0 rounded-full border-2 px-5 py-2 font-extrabold transition ${
                activeCat === c.id
                  ? "border-amber-400 bg-amber-400 text-gray-900"
                  : "border-stone-200 bg-stone-200 hover:bg-stone-300"
              }`}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Menyu */}
      <main className="mx-auto max-w-6xl px-4 pb-10">
        {categories.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-20 pt-8">
            <h2 className="mb-5 text-3xl font-black">
              {c.emoji} {c.name}
            </h2>
            <div className="grid grid-cols-1 gap-x-5 gap-y-16 pt-12 sm:grid-cols-2 lg:grid-cols-4">
              {foods
                .filter((f) => f.cat === c.id)
                .map((f) => (
                  <FoodCard key={f.id} food={f} emoji={c.emoji} onAdd={addToCart} />
                ))}
            </div>
          </section>
        ))}

        <div className="mt-10 rounded-3xl border-2 border-stone-200 bg-white p-6">
          <h2 className="mb-3 text-2xl font-black">Sifariş necə verilir</h2>
          <ul className="list-disc space-y-1 pl-5 text-gray-600">
            <li>Sevdiyiniz məhsulları «Səbətə» düyməsi ilə əlavə edin.</li>
            <li>Səbətdə adınızı və ünvanınızı yazın, WhatsApp ilə göndərin.</li>
            <li>Sifarişiniz təzə hazırlanıb isti çatdırılır. Qiymətlər manatladır (AZN).</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-red-600 px-4 py-8 pb-24 text-center text-white">
        <h2 className="text-2xl font-black">Pizza Cano</h2>
        <p className="mt-2 text-red-100">© 2026 Pizza Cano. Bütün hüquqlar qorunur.</p>
      </footer>

      {/* Üzən səbət düyməsi */}
      {count > 0 && !cartOpen && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed bottom-4 left-4 right-4 z-30 flex items-center justify-between rounded-full bg-gray-900 px-6 py-4 font-black text-white shadow-xl sm:left-auto sm:right-6 sm:w-80"
        >
          <span>🛒 Səbət ({count})</span>
          <span className="text-amber-300">{fmt(total)} AZN</span>
        </button>
      )}

      {cartOpen && (
        <CartDrawer
          cart={cart}
          setQty={setQty}
          clear={() => setCart([])}
          onClose={() => setCartOpen(false)}
          total={total}
        />
      )}
    </div>
  );
}

export default App;