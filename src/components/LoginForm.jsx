import { useState } from "react"
import loginService from '../services/login'

const LoginForm = ({setUser, notify}) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      notify(`${user.name} logged in`)
    } catch (error) {
      console.error('wrong credentials:',error.response.data.error)
      notify(`wrong credentials: ${error.response.data.error}`, 'error')
    }
  }

  return (
    <>
    <h1>Login</h1>
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text" 
          value={username}
          onChange={({target}) => setUserName(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input 
          id="password"
          type="password" 
          value={password}
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </>
  )
}

export default LoginForm