import { useImperativeHandle, useState } from "react"

const Toggleable = ({children, buttonLabel, ref}) => {
  const [visible, setVisible] = useState(false)
  
  useImperativeHandle(ref, () => {
    return {setVisible}
  })

  if (!visible) {
    return (
      <button onClick={() => setVisible(true)}>{buttonLabel}</button>
    )
  }

  return (
    <>
    {children}
    <button onClick={() => setVisible(false)}>cancel</button>
    </>
  )
}

export default Toggleable