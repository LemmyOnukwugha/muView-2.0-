import { useState } from "react"
import SignInForm from "../../components/SignInForm/SignInForm"
import SignUpForm from "../../components/SignUpForm/SignUpForm"

export default function AuthPage() {
  const [authForm, setAuthForm] = useState("signin")
  const clickMessage =
    authForm === "signin"
      ? "Don't have an account? Sign up."
      : "Already have an account. Sign in."

  const handleAuth = () => {
    setAuthForm((prevState) => {
      if (prevState === "signin") {
        return "signup"
      }
      if (prevState === "signup") {
        return "signin"
      }
    })
  }
  return (
    <main>
      <h1>AuthPage</h1>
      {authForm === "signup" ? <SignUpForm /> : <SignInForm />}
      <p onClick={handleAuth}>{clickMessage}</p>
    </main>
  )
}
