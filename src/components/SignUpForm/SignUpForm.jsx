import { Component } from "react"
import { AuthContext } from "../../context/AuthProvider"

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: null,
  }

  static contextType = AuthContext

  handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      this.setState({ error: null })
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        }),
      })
      const data = await res.json()
      console.log(data.token)
      const { handleSignIn } = this.context
      handleSignIn({ token: data.token })
    } catch (error) {
      this.setState({ error: error })
    }
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    })
  }

  render() {
    const disable = this.state.password !== this.state.confirm
    return (
      <div>
        <div className="form-container">
          {this.state.error && <p>Error trying to create user</p>}
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
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
            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />
            <button type="submit" disabled={disable}>
              SIGN UP
            </button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    )
  }
}
