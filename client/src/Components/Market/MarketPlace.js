import { Outlet } from 'react-router-dom'
import Header from '../Header/Header.js'
import Footer from '../Footer/Footer.js'
export default function MarketPlace(){
    return(<>
    <Header/>
    <div className="container-fluid p-5" style={{ flexGrow: 1 }}>
            <Outlet />
          </div>
          <Footer/>
    </>)
}