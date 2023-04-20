const NotificationSuccess = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='notificationSuccess'>
        {message}
      </div>
    )
  }

  export default NotificationSuccess;