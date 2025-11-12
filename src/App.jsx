import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    const fetchSample = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/products/sample`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchSample()
  }, [])

  const filtered = category === 'All' ? products : products.filter(p => p.category === category)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-950/60 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center font-bold">E</div>
            <span className="font-semibold tracking-wide">ElectroX</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#products" className="hover:text-white">Products</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-sm">Sign in</button>
            <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-sm">Cart (0)</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/DAWBaaySM7FLUKpn/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/30 to-slate-950/90 pointer-events-none" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Futuristic electronics for creators and gamers
            </h1>
            <p className="mt-4 text-slate-300">
              Shop performance laptops, immersive audio, and pro displays with a minimalist aesthetic.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#products" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500">Shop now</a>
              <a href="#about" className="px-5 py-2.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15">Learn more</a>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="relative py-16">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">Featured products</h2>
            <div className="flex items-center gap-2 text-xs md:text-sm">
              {['All','Laptops','Audio','Monitors'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg border ${category===cat? 'bg-white text-slate-900 border-white':'border-white/20 text-slate-300 hover:bg-white/10'}`}
                >{cat}</button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="mt-10 text-slate-300">Loading products…</div>
          ) : error ? (
            <div className="mt-10 text-red-400">{error}</div>
          ) : (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <div key={p.id} className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.image_url + '?auto=format&fit=crop&w=800&q=60'} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-lg">{p.title}</h3>
                      <span className="px-2 py-1 rounded bg-white/10 text-xs">{p.category}</span>
                    </div>
                    <p className="mt-1 text-slate-300 text-sm line-clamp-2">{p.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-semibold">${p.price}</span>
                      <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-sm">Add to cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-white/10 py-10 text-sm text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ElectroX. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a className="hover:text-white" href="#">Privacy</a>
            <a className="hover:text-white" href="#">Terms</a>
            <a className="hover:text-white" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
