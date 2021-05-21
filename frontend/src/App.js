import './App.css';
import  Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import Home from './pages';
import Accounts from './pages/accounts';
import Transfer from './pages/transfer' ;
import SignInScreen from './pages/signin' ;
import Transfer_conf from './pages/transfer_conf' ;
import Payee from './pages/payee' ;
import AddPayee from './pages/addpayee' ;

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SignInScreen} />
      <div>
      <Navbar />
        <Route path="/home" exact component={Home} />
        <Route path="/transfer" exact component={Transfer} />
        <Route path="/transaction" exact component={Home} />
        <Route path="/accounts" exact component={Accounts} />
        <Route path="/billPayment" exact component={Home} />
        <Route path="/add-DeletePayee" exact component={Payee} />
        <Route path="/addpayee" exact component={AddPayee} />
        <Route path="/tranfser-confirmation" exact component={Transfer_conf} />
        </div>
        </Switch>

    </Router> 

  );
}

export default App;
