import React from 'react'

import { Footer, Blog, Topics, Features, Header } from './containers'
import { Navbar } from './components'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <div className="gradient__pic">     
      <Navbar />
      <Header />
      </div>
      <Features />
      <Topics />
      <Blog />
      <Footer />
    </div>
  )
}

export default App
