import React, { useState } from "react";
import { Heart, Coffee, Trash2, CheckCircle, ShoppingBag } from "lucide-react";

// Data 8 Produk Kopi
const PRODUK_LIST = [
  {
    id: 1,
    nama: "Gayo Arabica",
    harga: 35000,
    desc: "Aroma buah nangka & madu",
    img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500",
  },
  {
    id: 2,
    nama: "Sidikalang Robusta",
    harga: 25000,
    desc: "Body tebal & coklat",
    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500",
  },
  {
    id: 3,
    nama: "Mandheling Coffee",
    harga: 32000,
    desc: "Rasa rempah & herbal",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
  },
  {
    id: 4,
    nama: "Iced Aren Latte",
    harga: 22000,
    desc: "Gula aren asli Medan",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
  },
  {
    id: 5,
    nama: "Matcha Premium",
    harga: 28000,
    desc: "Bubuk matcha Jepang",
    img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500",
  },
  {
    id: 6,
    nama: "Hot Cappuccino",
    harga: 24000,
    desc: "Foam susu lembut",
    img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500",
  },
  {
    id: 7,
    nama: "Sanger Khas Medan",
    harga: 18000,
    desc: "Kopi susu pekat khas Aceh-Medan",
    img: "/Kopi-Sanger-Aceh.jpg",
  },
  {
    id: 8,
    nama: "Cold Brew Lemon",
    harga: 27000,
    desc: "Segar & rendah asam",
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500",
  },
];

export default function App() {
  const [halaman, setHalaman] = useState("katalog"); // State untuk pindah halaman
  const [wishlist, setWishlist] = useState([]); // State simpan data wishlist
  const [notif, setNotif] = useState(false); // Feedback visual (Notifikasi)

  // Fungsi Tambah/Hapus dari Wishlist
  const aksiWishlist = (item) => {
    const sudahAda = wishlist.find((i) => i.id === item.id);
    if (sudahAda) {
      setWishlist(wishlist.filter((i) => i.id !== item.id));
    } else {
      setWishlist([...wishlist, item]);
      setNotif(true);
      setTimeout(() => setNotif(false), 2000);
    }
  };

  return (
    <div className="bg-[#fdf8f1] min-h-screen font-sans text-gray-900">
      {/* --- NAVBAR --- */}
      <nav className="bg-white shadow-md sticky top-0 z-50 p-4 flex justify-between items-center px-6 md:px-20 border-b border-gray-200">
        <div className="flex items-center gap-2 font-bold text-xl text-orange-900">
          <Coffee className="text-black-700" /> <span>Le Coffee</span>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setHalaman("katalog")}
            className={`px-4 py-2 rounded-lg transition ${halaman === "katalog" ? "bg-orange-700 text-white" : "text-gray-600 hover:bg-gray-100"}`}
          >
            Katalog
          </button>
          <button
            onClick={() => setHalaman("wishlist")}
            className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
          >
            <Heart
              size={22}
              className={
                wishlist.length > 0
                  ? "fill-red-500 text-red-500"
                  : "text-gray-500"
              }
            />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full px-1.5 font-bold shadow-sm">
                {wishlist.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* --- NOTIFIKASI VISUAL --- */}
      {notif && (
        <div className="fixed top-20 right-5 bg-green-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 animate-bounce">
          <CheckCircle size={20} /> Berhasil ditambah ke Wishlist!
        </div>
      )}

      {/* --- KONTEN --- */}
      <main className="max-w-6xl mx-auto p-6">
        {halaman === "katalog" ? (
          <div>
            <header className="text-center my-12">
              <h1 className="text-4xl font-extrabold text-black-900">
                Katalog Le Coffe
              </h1>
              <p className="text-gray-500 mt-2">
                will and always serve the best for you
              </p>
            </header>

            {/* Grid Produk - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PRODUK_LIST.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="relative">
                    <img
                      src={p.img}
                      alt={p.nama}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => aksiWishlist(p)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg"
                    >
                      <Heart
                        size={18}
                        className={
                          wishlist.find((i) => i.id === p.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }
                      />
                    </button>
                  </div>
                  <div className="p-5">
                    <h2 className="font-bold text-lg">{p.nama}</h2>
                    <p className="text-gray-400 text-xs mb-3 italic">
                      {p.desc}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-orange-800 font-bold text-lg">
                        Rp {p.harga.toLocaleString("id-ID")}
                      </span>
                      <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm hover:bg-orange-700 transition">
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* --- HALAMAN WISHLIST --- */
          <div>
            <h1 className="text-3xl font-bold my-10 flex items-center gap-3">
              <Heart className="text-red-500 fill-red-500" /> Wishlist Saya
            </h1>

            {wishlist.length === 0 ? (
              <div className="bg-white p-20 text-center rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 text-lg">
                  Wishlist kosong nih, Rel.
                </p>
                <button
                  onClick={() => setHalaman("katalog")}
                  className="mt-4 text-orange-700 font-bold hover:underline"
                >
                  Lihat Katalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wishlist.map((w) => (
                  <div
                    key={w.id}
                    className="bg-white p-4 rounded-2xl flex items-center gap-5 shadow-sm border border-gray-100"
                  >
                    <img
                      src={w.img}
                      alt={w.nama}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{w.nama}</h3>
                      <p className="text-orange-800 font-bold">
                        Rp {w.harga.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <button
                      onClick={() => aksiWishlist(w)}
                      className="p-3 text-red-400 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-20 py-10 border-t border-gray-200 text-center text-gray-400 text-sm">
        © 2026 GDG USU Final Project • M. AL FACHREL FAHROZA
      </footer>
    </div>
  );
}
