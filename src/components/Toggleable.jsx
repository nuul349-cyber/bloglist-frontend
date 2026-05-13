import { useImperativeHandle, useState } from "react"

const Toggleable = ({children, buttonLabel, ref}) => {
  const [visible, setVisible] = useState(false)
  const divStyle = {
    margin: '10px 0',
  }

  useImperativeHandle(ref, () => {
    return {setVisible}
  })

  if (!visible) {
    return (
      <div style={divStyle}>
        <button onClick={() => setVisible(true)}>{buttonLabel}</button>
      </div>
    )
  }

  return (
    <>
    {children}
    <div style={divStyle}>
      <button onClick={() => setVisible(false)}>cancel</button>
    </div>
    </>
  )
}

export default Toggleable