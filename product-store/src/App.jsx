import {ShoppingCart,Search,Star,Boxes} from "lucide-react";

function App() {
  return (
    <div className="min-h-screen p-8">

      <div className="flex items-center gap-2 text-teal-700">
        <Boxes size={26} />

        <span className="font-display text-xl font-bold tracking-tight">My Store</span>
      </div>

      <h1 className="font-display text-4xl font-bold tracking-tight">
        Product Store
      </h1>

      <div className="mt-8 grid  lg:grid-cols-3 grid-cols-1 md:grid-cols-2  gap-6">

        <button className="flex items-center gap-2 text-slate-700 hover:text-teal-700">
          <ShoppingCart size={20} />
          <span>Cart</span>
        </button>

        <button className="flex items-center gap-2 text-slate-700 hover:text-teal-700">
          <Search size={20} />
          <span>Search</span>
        </button>

        <button className="flex items-center gap-2 text-slate-700 hover:text-teal-700">
          <Star size={20} />
          <span>Rating</span>
        </button>

      </div>

      <p className="mt-8 text-lg leading-relaxed">
        Browse our collection of products.
      </p>

    </div>
  );
}

export default App;
