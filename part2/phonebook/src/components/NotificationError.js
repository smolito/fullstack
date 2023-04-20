const NotificationError = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='notificationError'>
        {message}
      </div>
    )
  }

  export default NotificationError;