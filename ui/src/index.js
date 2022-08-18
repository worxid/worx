import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// COMPONENTS
import App from './App'
import GlobalStyles from 'components/GlobalStyles/GlobalStyles'

// CONSTANTS
import theme from 'constants/theme'

// CONTEXTS
import { AllPagesContextProvider } from 'contexts/AllPagesContext'

// MUIS
import { 
  createTheme,
  StyledEngineProvider, 
  ThemeProvider, 
} from '@mui/material/styles'

// STYLES
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={createTheme(theme)}>
    <StyledEngineProvider injectFirst>
      <AllPagesContextProvider>
        <BrowserRouter>
          <GlobalStyles/>
          <App />
        </BrowserRouter>
      </AllPagesContextProvider>
    </StyledEngineProvider>
  </ThemeProvider>
)