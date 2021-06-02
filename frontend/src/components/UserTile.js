import React from 'react';

const UserTile = ({user, checkboxHandler}) => {

  const { id, name, email, isAdmin } = user;
  return (
    <div className="user-tile-container">
    
      <p className="user-tile-name">Name: {name}</p>
      <p className="user-tile-email">Email: {email}</p>
      {isAdmin ? 
        <p className="user-tile-role">Role: Admin</p> : 
        <p className="user-tile-role">Role: User</p>}

      <div className="user-tile-select">
        <p>Select:</p>
        <input type="checkbox" 
              className="delete-user-checkbox" 
              onChange={(e) => checkboxHandler(e, id)}/>
      </div>

    </div>
  )
}

export default UserTile
