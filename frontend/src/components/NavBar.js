import React from 'react'

const NavBar = ({mode, toggleMode}) => {

  return (
    <div>
      <h1>Navbar</h1>
      {mode}
      <input type="checkbox" onClick={toggleMode}></input>
    </div>
  )
}

export default NavBar
