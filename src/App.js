import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Components/Home.js'
function App() {
  return (
   <>
   <Router basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
    </Routes>
   </Router>
   </>
  );
}

export default App;
