import { ExampleProvider } from "./providers/UserContext"
import { ContactProvider } from "./providers/Contacts";
import Rotas from "./routes/Rotas"
import './style/index.scss'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ptBR } from '@mui/x-date-pickers/locales';

function App() {

  return (
    <div className="App">

      <ExampleProvider>
        <ContactProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
            <Rotas />
          </LocalizationProvider>
        </ContactProvider>
      </ExampleProvider>

      <ToastContainer />
    </div>
  )
}
export default App
