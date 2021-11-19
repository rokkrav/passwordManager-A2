import './index.css'

const STARS_IMG_URL =
  'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

const PasswordItem = props => {
  const {passwordDetails, onDeletePassword, isChecked} = props

  const {id, website, username, password, initialClassName} = passwordDetails
  const initial = username ? username[0].toUpperCase() : ''

  const onClickDelete = () => {
    onDeletePassword(id)
  }
  return (
    <li className="password-item">
      <div className="details-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div className="password-details">
          <p className="website">{website}</p>
          <p className="username">{username}</p>
          <p className="password">
            {isChecked ? (
              password
            ) : (
              <img src={STARS_IMG_URL} alt="stars" className="stars" />
            )}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="button"
        onClick={onClickDelete}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordItem
