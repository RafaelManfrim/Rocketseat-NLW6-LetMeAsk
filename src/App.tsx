import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"

import { AuthContextProvider } from './context/authContext'

function App() {

  return (
      <div>
        <BrowserRouter>   
          <AuthContextProvider>
            <Route path="/" exact component={Home}/>
            <Route path="/salas/nova-sala" component={NewRoom}/>
          </AuthContextProvider>
        </BrowserRouter>
      </div>
  );
}

export default App;
