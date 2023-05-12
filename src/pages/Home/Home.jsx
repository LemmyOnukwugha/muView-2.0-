import React from "react"
import NavBar from "../../components/NavBar/NavBar"

const Home = () => {
  return (
    <>
      <NavBar />
      <section className="container">
        <h3 className="mt-5 text-start">Trending</h3>
        <ul className="mt-3">
          <li>some album</li>
          <li>some album</li>
        </ul>
      </section>
    </>
  )
}

export default Home
