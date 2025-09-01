import Hero from "./components/custom/Hero"
import Footer from "./view-trip/components/Footer"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Hero />
      </div>
    </div>
  )
}

export default App
