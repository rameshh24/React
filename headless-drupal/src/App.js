
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import logo from './logo.svg';
import './App.css';
import { AllRoutes } from './routes/AllRoutes';
function App() {
  const [data, setData] = useState()
  useEffect(()=>{
    fetch("http://localhost/drupal/blog/path")
    .then(response=>response.json())
    .then(data=> setData(data))
  })  
  return (
    <div className="App">
      <Header/>
      <AllRoutes/>
    </div>
  );
}

export default App;
