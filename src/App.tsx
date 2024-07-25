import { ThemeProvider } from '@/components/theme-provider'
import { Header } from './components/Header'
import { ShortenerInput } from './components/ShortenerInput'
import { Toaster } from './components/ui/toaster'

function App() {
    return (
        <ThemeProvider>
            <Header />
            <ShortenerInput />
            <Toaster />
        </ThemeProvider>
    )
}

export default App
