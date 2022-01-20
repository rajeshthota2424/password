import './index.css'

const AddPassword = props => {
  const {passwordDetails, toggleIsStarred} = props
  const {id, deleteImage} = passwordDetails
  const deleteImg = deleteImage
    ? 'https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png'
    : 'showPassword'

  const onClickDeleteItem = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-item">
      <div className="header-container">
        <button
          type="button"
          testid="delete"
          className="delete-button"
          onClick={onClickDeleteItem}
        >
          <img src={deleteImg} className="delete" alt="delete" />
        </button>
      </div>
    </li>
  )
}

export default AddPassword
