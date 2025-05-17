import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import { AllRouter } from './routes/AllRouter';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <AllRouter/>
      <Footer/>
    </div>
  );
}

export default App;
