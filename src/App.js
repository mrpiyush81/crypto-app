import { Route,Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import CoinPage from './pages/CoinPage';
function App() {
  return (
    <div className=''>
        <Header></Header>
       <Routes>
           <Route path='/' Component={Home} exact></Route>
           <Route path='/coins/:id' Component={CoinPage}></Route>
       </Routes>
    </div>
  );
}

export default App;
