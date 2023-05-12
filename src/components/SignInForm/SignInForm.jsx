import { Component } from "react"
import { AuthContext } from "../../context/AuthProvider"
import { reqMethod } from "../../utilities/users-api"
import { toast } from "react-toastify"

export default class SignInForm extends Component {
  static contextType = AuthContext
  state = {
    email: "",
    password: "",
    error: null,
  }

  handleSubmit = async (evt) => {
    evt.preventDefault()
    // alert(JSON.stringify(this.state))
    try {
      this.setState({ error: null })

      const data = await reqMethod("/api/auth/signin", "POST", {
        email: this.state.email,
        password: this.state.password,
      })

      const { handleSignIn } = this.context
      localStorage.setItem("token", data.token)
      toast.success("Sign in successful")
      handleSignIn({ token: data.token })
    } catch (error) {
      toast.error("Error trying to sign in")
    }
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    })
  }

  render() {
    return (
      <div>
        <div className="form-container">
          {this.state.error && <p>Error trying to create user</p>}
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <button type="submit">SIGN IN</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    )
  }
}
