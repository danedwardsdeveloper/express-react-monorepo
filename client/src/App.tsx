import { Outlet } from 'react-router-dom'
import MenuBar from './components/MenuBar'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <MenuBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
