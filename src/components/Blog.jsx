import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const divStyle = {
    border: '2px solid black',
    padding: '10px 20px',
    marginBottom: '10px',
    width: '400px',
    textAlign: 'center',
    borderRadius: '4px'
  }

  const buttonStyle = {
    marginLeft: '10px'
  }

  const info = () => {
    if (!showDetails)
    return (
      <>
        {blog.title} by <span>{blog.author}</span>
        <button style={buttonStyle} onClick={() => setShowDetails(true)}>view</button>
      </>  
    )
    return (
      <>
        <div>
          <span>Title:</span> {blog.title}
          <button style={buttonStyle} onClick={() => setShowDetails(false)}>close</button>
        </div>
        <p><span>Author:</span> {blog.author}</p>
        <p><span>Url:</span> {blog.url}</p>
        <div>
          <span>Likes:</span> {blog.likes}
          <button style={buttonStyle}>like</button> 
        </div> 
        <p><span>Post owner:</span> {blog.user.username}</p>
      </>  
    )
  }
  return (
    <div style={divStyle}>
      {info()}
    </div>  
  )
}

export default Blog