const Notification = ({message, type = 'ok'}) => {
  if (!message) return null

  const styleOk = {
    border: '2px solid green',
    borderRadius: '8px',
    backgroundColor: 'lightgray',
    padding: '10px 20px',
    display: 'inline-block',
    maxWidth: '500px',
    fontSize: '20px',
  }

  const styleError = {
    ...styleOk,
    border: '2px solid red',

  }

  let style = null
  if (type === 'ok') {
    style = styleOk
  } else if (type === 'error') {
    style = styleError
  }

  const pStyle = {
    margin: 0
  }

  return (
    <div style={style}>
      <p style={pStyle}>{message}</p>
    </div>
  )
}

export default Notification