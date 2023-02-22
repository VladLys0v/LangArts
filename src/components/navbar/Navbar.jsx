import React, {useState} from 'react'
import { RiMenu3Line, RiCloseLine} from 'react-icons/ri'
import logo from "../../assets/logo.jpg"
import './navbar.css'

const Menu = () => (
  <>
  <p><a href='#home'>Home</a></p>
  <p><a href='#features'>Let's translate!</a></p>
  <p><a href='#topics'>Topics</a></p>
  <p><a href='#blog'>Library</a></p>
  </>
)

const Navbar = () => {
  const[toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="langarts__navbar">
      <div className="langarts__navbar-links">
        <div className="langarts__navbar-links_logo"> 
        <img src={logo} alt="logo"/>
        </div>
        <div className="langarts__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="langarts__navbar-sign">
        <button type="button">Sign in</button>
      </div>
      <div className="langarts__navbar-menu">
          {toggleMenu 
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)}/>
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)}/>
          }
          {toggleMenu && (
            <div className= "langarts__navbar-menu_container scale-up-center">
              <div className="langarts__navbar-menu_container-links"> 
              <Menu />
              <div className="langarts__navbar-menu_container-links-sign">
              <button type="button">Sign in</button>
              </div>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default Navbar
