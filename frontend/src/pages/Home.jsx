import Hero from "../components/Hero"
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <main className="w-full max-h-screen inset-0 overflow-hidden">
      <Navbar />
      <div className="h-screen flex items-center justify-center pb-4">
      <Hero />
      </div>
    </main>
  )
}

export default Home