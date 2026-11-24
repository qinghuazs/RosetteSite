import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/noto-sans-sc/wght.css'
import '@fontsource/noto-serif-sc/400.css'
import '@fontsource/noto-serif-sc/500.css'
import '@fontsource/roboto-mono/400.css'
import './styles.css'
import { Hero } from './sections/Hero'
import { Focus } from './sections/Focus'
import { Files } from './sections/Files'
import { Writing } from './sections/Writing'
import { Faq } from './sections/Faq'
import { GetRosette } from './sections/GetRosette'
import { Footer } from './sections/Footer'

function App() {
  return (
    <>
      <Hero />
      <main>
        <Focus />
        <Files />
        <Writing />
        <Faq />
        <GetRosette />
      </main>
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
