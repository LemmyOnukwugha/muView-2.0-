import React, { useContext } from "react"
import Reviews from "../../components/Reviews/Reviews"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import Loading from "../../components/Loading/Loading"
import { AuthContext } from "../../context/AuthProvider"
import { reqMethod } from "../../utilities/users-api"
import NavBar from "../../components/NavBar/NavBar"

const AlbumDetail = () => {
  const [album, setAlbum] = useState(null)
  const [loading, setloading] = useState(true)
  const [error, setError] = useState(null)
  const { auth } = useContext(AuthContext)
  const { id } = useParams()

  useEffect(() => {
    handleFetchAlbum()
  }, [])

  const handleFetchAlbum = () => {
    reqMethod(`/api/albums/${id}`, "GET", auth?.user?.token)
      .then((data) => {
        setAlbum(data.data)
        setloading(false)
      })
      .catch((err) => {
        setloading(false)
        setError(err)
        console.log(err)
      })
  }
  if (loading) return <Loading />
  if (error)
    return (
      <div className="d-flex justify-content-center align-items-center">
        <p className="text-danger">Error Occurred</p>
      </div>
    )
  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="mt-2">Album Details</h1>
        <div className="row">
          <div className="col-4">
            {" "}
            <div className="image"></div>
          </div>
          <div className="col-8">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: 300 }}
            >
              <div className="text-start">
                <div className="mb-1 fw-light">
                  {" "}
                  <span className="fw-semibold">Name:</span> {album?.Title}
                </div>
                <div className="mb-1 fw-light">
                  {" "}
                  <span className="fw-semibold">Artist:</span> {album?.Artist}
                </div>
                <div className="mb-1 fw-light">
                  {" "}
                  <span className="fw-semibold">Released:</span>{" "}
                  {album?.Release}
                </div>
                <div className="mb-1 fw-light">
                  {" "}
                  <span className="fw-semibold">Genre:</span> {album?.Genre}
                </div>
                <div className="mb-1 fw-light">
                  {" "}
                  <span className="fw-semibold">Average Rating:</span>{" "}
                  {album?.rating}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Reviews album={album} />
      </div>
    </>
  )
}

export default AlbumDetail
