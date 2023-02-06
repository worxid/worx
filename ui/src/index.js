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
  StyledEngineProvider, 
  ThemeProvider, 
} from '@mui/material/styles'

// SENTRY
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

// STYLES
import './index.css'

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [
    new BrowserTracing(), 
    new Sentry.Integrations.Breadcrumbs({console: false})
  ],
  tracesSampleRate: 1.0,
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={theme}>
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