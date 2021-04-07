import React from 'react'

const UserTile = ({user, checkboxHandler}) => {

  const { id, name, email, isAdmin } = user;
  return (
    <div>
     {name}
     {email}
     {isAdmin ? <p>Admin</p> : <p>User</p>}
     <input type="checkbox" className="delete-user-checkbox" onChange={(e) => checkboxHandler(e, id)}/>
    </div>
  )
}

export default UserTile
