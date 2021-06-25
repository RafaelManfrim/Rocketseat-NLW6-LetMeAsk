import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

import { AuthContextProvider } from './context/authContext'



function App() {

  return (
      <div>
        <BrowserRouter>   
          <AuthContextProvider>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/salas/nova-sala" exact component={NewRoom}/>
              <Route path="/salas/:id" component={Room}/>
              <Route path="/admin/salas/:id" component={AdminRoom}/>
            </Switch>
          </AuthContextProvider>
        </BrowserRouter>
      </div>
  );
}

export default App;
