import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Components/Home.js'
function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
    </Routes>
   </Router>
   </>
  );
}

export default App;
