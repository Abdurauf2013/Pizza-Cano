import { useState, useEffect } from "react";

// ====== BURANI DƏYİŞ ======
const phoneText = "Nomre";
const instagram = "https://www.instagram.com/pizza.cano?srtk=OTc2ZnEwaW4xbjJo";
const address = "unvan";
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
  { id: "p1", cat: "pizza", name: "Margherita", description: "Mozzarella, pomidor sousu", options: sizes(8, 12, 16), image: u("photo-1604382354936-07c5d9983bd3") },
  { id: "p2", cat: "pizza", name: "Pepperoni", description: "Pepperoni, mozzarella, sous", options: sizes(10, 14, 18), image: "https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
  { id: "p3", cat: "pizza", name: "Cheese Pizza", description: "Bol pendir və xüsusi sous", options: sizes(10, 14, 18), image: "https://images.unsplash.com/photo-1732223229355-95a1433404bf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
  { id: "p4", cat: "pizza", name: "Special Pizza", description: "Aşpazın xüsusi resepti", options: sizes(12, 17, 22), image: "https://plus.unsplash.com/premium_photo-1661762555601-47d088a26b50?q=80&w=1192&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
  { id: "p5", cat: "pizza", name: "Toyuqlu pizza", description: "Toyuq, pendir, bibər, pomidor", options: sizes(9, 13, 17), image: "https://thealburooj.com/wp-content/uploads/2026/02/Special-Pizza.png" },

  // BURGERLƏR
  { id: "b1", cat: "burger", name: "Hamburger", description: "Mal əti kotleti, kahı, pomidor, sous", options: [{ label: "", price: 5 }], image: u("photo-1568901346375-23c9450c58cd") },
  { id: "b2", cat: "burger", name: "Cheeseburger", description: "Kotlet, çedar pendiri, turşu, sous", options: [{ label: "", price: 6 }], image: u("photo-1572802419224-296b0aeee0d9") },
  { id: "b3", cat: "burger", name: "Chicken burger", description: "Çıtır toyuq filesi, kahı, mayonez", options: [{ label: "", price: 5.5 }], image: u("photo-1606755962773-d324e0a13086") },
  { id: "b4", cat: "burger", name: "Double burger", description: "İki kotlet, ikiqat pendir", options: [{ label: "", price: 9 }], image: u("photo-1586190848861-99aa4a171e90") },
  { id: "b5", cat: "burger", name: "Cano burger", description: "Evin xüsusi burgeri, fri ilə birlikdə", options: [{ label: "", price: 11 }], image: u("photo-1550547660-d9450f859349") },

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

function FoodImage({ food, emoji }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="mx-auto mb-3 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-orange-100">
      {failed || !food.image ? (
        <span className="text-6xl" aria-hidden="true">{food.emoji || emoji}</span>
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

function FoodCard({ food, emoji }) {
  const [sel, setSel] = useState(0);
  const multi = food.options.length > 1;

  return (
    <div className="flex flex-col rounded-3xl border-2 border-orange-100 bg-white p-5">
      <FoodImage food={food} emoji={emoji} />
      <h3 className="text-xl font-black">{food.name}</h3>
      <p className="mb-4 mt-1 text-sm text-gray-500">{food.description}</p>

      <div className="mt-auto">
        {multi && (
          <div className="mb-3 flex flex-wrap gap-2">
            {food.options.map((o, i) => (
              <button
                key={o.label}
                type="button"
                aria-pressed={sel === i}
                onClick={() => setSel(i)}
                className={`rounded-full border-2 px-3 py-1 text-sm font-bold transition ${
                  sel === i
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-orange-100 bg-orange-50 text-gray-800 hover:border-gray-900"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
        <div className="text-3xl font-black text-red-600">
          {fmt(food.options[sel].price)}
          <span className="ml-1 text-base font-extrabold">AZN</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeCat, setActiveCat] = useState("pizza");

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
    <div className="min-h-screen bg-orange-50 font-sans text-gray-900">
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
          Təzə, isti, sürətli. Zəng et, sifarişini deyək, qapına gətirək.
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
        className="-mt-7 block h-7 w-full text-orange-50"
      >
        <path d="M0 10 Q 12.5 0 25 6 T 50 6 T 75 6 T 100 4 V10Z" fill="currentColor" />
      </svg>

      {/* Kateqoriya paneli */}
      <nav aria-label="Kateqoriyalar" className="sticky top-0 z-20 border-b-2 border-orange-100 bg-orange-50">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => goTo(c.id)}
              className={`shrink-0 rounded-full border-2 px-5 py-2 font-extrabold transition ${
                activeCat === c.id
                  ? "border-red-600 bg-red-600 text-white"
                  : "border-orange-100 bg-white hover:border-red-600"
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {foods
                .filter((f) => f.cat === c.id)
                .map((f) => (
                  <FoodCard key={f.id} food={f} emoji={c.emoji} />
                ))}
            </div>
          </section>
        ))}

        <div className="mt-10 rounded-3xl border-2 border-orange-100 bg-white p-6">
          <h2 className="mb-3 text-2xl font-black">Sifariş necə verilir</h2>
          <ul className="list-disc space-y-1 pl-5 text-gray-600">
            <li>Yuxarıdakı nömrəyə zəng edin, seçdiyiniz yeməkləri və ünvanı deyin.</li>
            <li>Sifarişiniz təzə hazırlanıb isti çatdırılır.</li>
            <li>Qiymətlər manatladır (AZN).</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-red-600 px-4 py-8 text-center text-white">
        <h2 className="text-2xl font-black">Pizza Cano</h2>
        <p className="mt-2 text-red-100">© 2026 Pizza Cano. Bütün hüquqlar qorunur.</p>
      </footer>
    </div>
  );
}

export default App;