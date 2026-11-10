import { useState } from "react";


const phoneText = "Nomre";
const instagram = "https://www.instagram.com/pizza.cano?srtk=OTc2ZnEwaW4xbjJo";
const address = "unvan";


const u = (id) => `https://images.unsplash.com/${id}?w=600`;

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
//pizzalar
  { id: "p1", cat: "pizza", name: "Margherita", description: "Mozzarella, pomidor sousu", options: sizes(8, 12, 16), image: u("photo-1579751626657-72bc17010498") },
  { id: "p2", cat: "pizza", name: "Pepperoni", description: "Pepperoni, mozzarella, sous", options: sizes(10, 14, 18), image: u("photo-1628840042765-356cda07504e") },
  { id: "p3", cat: "pizza", name: "Cheese Pizza", description: "Bol pendir və xüsusi sous", options: sizes(10, 14, 18), image: u("photo-1513104890138-7c749659a591") },
  { id: "p4", cat: "pizza", name: "Special Pizza", description: "Aşpazın xüsusi resepti", options: sizes(12, 17, 22), image: u("photo-1534308983496-4fabb1a015ee") },
  { id: "p5", cat: "pizza", name: "Toyuqlu pizza", description: "Toyuq, pendir, bibər, pomidor", options: sizes(9, 13, 17), image: u("photo-1565299624946-b28f40a0ae38") },

  //  burgerlər
  { id: "b1", cat: "burger", name: "Hamburger", description: "Mal əti kotleti, kahı, pomidor, sous", options: [{ label: "", price: 5 }], image: u("photo-1568901346375-23c9450c58cd") },
  { id: "b2", cat: "burger", name: "Cheeseburger", description: "Kotlet, çedar pendiri, turşu, sous", options: [{ label: "", price: 6 }], image: u("photo-1550547660-d9450f859349") },
  { id: "b3", cat: "burger", name: "Chicken burger", description: "Çıtır toyuq filesi, kahı, mayonez", options: [{ label: "", price: 5.5 }], image: u("photo-1606755962773-d324e0a13086") },
  { id: "b4", cat: "burger", name: "Double burger", description: "İki kotlet, ikiqat pendir", options: [{ label: "", price: 9 }], image: u("photo-1553979459-d2229ba7433b") },
  { id: "b5", cat: "burger", name: "Cano burger", description: "Evin xüsusi burgeri, fri ilə birlikdə", options: [{ label: "", price: 11 }], image: u("photo-1571091718767-18b5b1457add") },

  // naggetslər
  { id: "n1", cat: "nuggets", name: "Naggets", description: "Çıtır toyuq parçaları", options: [{ label: "6 ədəd", price: 4.5 }, { label: "9 ədəd", price: 6.5 }, { label: "12 ədəd", price: 8.5 }], image: u("photo-1562967914-608f82629710") },
  { id: "n2", cat: "nuggets", name: "Toyuq strips", description: "Zolaq şəklində çıtır toyuq", options: [{ label: "5 ədəd", price: 6 }, { label: "8 ədəd", price: 9 }], image: u("photo-1626645738196-c2a7c87a8f58") },
  { id: "n3", cat: "nuggets", name: "Kartof fri", description: "Qızarmış çıtır kartof", options: [{ label: "Kiçik", price: 2.5 }, { label: "Böyük", price: 4 }], image: u("photo-1573080496219-bb080dd4f877") },
  { id: "n4", cat: "nuggets", name: "Naggets + fri kombo", description: "9 naggets, kiçik fri, sous", options: [{ label: "", price: 8 }], image: u("photo-1585109649139-366815a0d713") },

  // içkilər
  { id: "d1", cat: "drinks", name: "Coca-Cola", description: "Soyuq qazlı içki", options: [{ label: "0.5 l", price: 2 }, { label: "1 l", price: 3 }], image: u("photo-1622483767028-3f66f32aef97") },
  { id: "d2", cat: "drinks", name: "Fanta", description: "Portağal dadlı qazlı içki", options: [{ label: "0.5 l", price: 2 }, { label: "1 l", price: 3 }], image: u("photo-1624517452488-04869289c4ca") },
  { id: "d3", cat: "drinks", name: "Ayran", description: "Soyuq, təbii ayran", options: [{ label: "", price: 1.5 }], image: "", emoji: "🥛" },
  { id: "d4", cat: "drinks", name: "Limonad", description: "Təzə limon və nanə", options: [{ label: "", price: 3 }], image: u("photo-1621263764928-df1444c5e859") },
  { id: "d5", cat: "drinks", name: "Su", description: "Təmiz içməli su", options: [{ label: "0.5 l", price: 1 }], image: u("photo-1548839140-29a749e1cf4d") }
];

const fmt = (n) => (Number.isInteger(n) ? n : n.toFixed(2));

function FoodImage({ food, emoji }) {
  const [failed, setFailed] = useState(false);
  if (failed || !food.image) {
    return (
      <div className="w-full h-44 bg-red-50 flex items-center justify-center text-6xl">
        {food.emoji || emoji}
      </div>
    );
  }
  return (
    <img
      src={food.image}
      alt={food.name}
      onError={() => setFailed(true)}
      className="w-full h-44 object-cover"
    />
  );
}

function App() {
  const [activeCat, setActiveCat] = useState("pizza");

  const visible = foods.filter((f) => f.cat === activeCat);
  const currentCat = categories.find((c) => c.id === activeCat);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-red-600 text-white px-6 pt-8 pb-7 text-center">
        <h1 className="text-4xl font-black tracking-tight">PIZZA CANO</h1>
        <p className="mt-2 text-red-100">Təzə, isti, sürətli.</p>

        <div className="flex flex-wrap justify-center gap-3 mt-5 text-sm font-bold">
          <a
            href={`tel:${phoneText.replace(/\s/g, "")}`}
            className="bg-white text-red-600 px-4 py-2 rounded-full"
          >
            📞 {phoneText}
          </a>
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className="bg-white text-red-600 px-4 py-2 rounded-full"
          >
            📷 Instagram
          </a>
        </div>
        <p className="mt-4 text-sm text-red-100">📍 {address}</p>
      </header>

      <nav className="sticky top-0 z-20 bg-white border-b-2 border-red-100">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 max-w-6xl mx-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`shrink-0 px-5 py-2 rounded-full font-bold border-2 transition ${
                activeCat === c.id
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-white border-red-100 text-red-600 hover:border-red-600"
              }`}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-black mb-8">
          {currentCat.emoji} {currentCat.name}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-2xl overflow-hidden border-2 border-red-100 flex flex-col"
            >
              <FoodImage food={food} emoji={currentCat.emoji} />

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold">{food.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{food.description}</p>

                <div className="mt-auto pt-5 space-y-1">
                  {food.options.map((o) => (
                    <div
                      key={o.label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">{o.label}</span>
                      <span className="text-red-600 text-lg font-black">
                        {fmt(o.price)} AZN
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-8 bg-red-600 text-white">
        <h2 className="font-black text-xl">PIZZA CANO</h2>
        <p className="mt-2 text-red-100">
          © 2026 Pizza Cano. Bütün hüquqlar qorunur.
        </p>
      </footer>
    </div>
  );
}

export default App;