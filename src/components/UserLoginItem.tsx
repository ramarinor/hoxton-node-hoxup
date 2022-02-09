function UserLoginItem ({ user, logIn }) {
  return (
    <li>
      <button
        className='user-selection'
        onClick={() => {
          logIn(user)
        }}
      >
        <img
          className='avatar'
          width='50'
          height='50'
          src={user.avatar}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <h3>
          {user.firstName} {user.lastName}
        </h3>
      </button>
    </li>
  )
}

export default UserLoginItem
