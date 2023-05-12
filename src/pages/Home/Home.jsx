import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthProvider"
import { Button, Card } from "react-bootstrap"
import CustomPagination from "../../components/Pagination/Pagination"
import { reqMethod } from "../../utilities/users-api"
import Loading from "../../components/Loading/Loading"
import { ModalContext } from "../../context/ModalProvider"
import { toast } from "react-toastify"
import NavBar from "../../components/NavBar/NavBar"

const Home = () => {
  const navigate = useNavigate()
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [page, setPage] = useState(1)

  useEffect(() => {
    handleFetch("", page)
  }, [page])

  const handleNavigate = (id) => {
    navigate(`/album/${id}`)
  }

  const handleFetch = (search = "", page = 1) => {
    setError(null)
    reqMethod(`/api/albums?q=${search}&page=${page}&sort=trending`, "GET")
      .then((data) => {
        setAlbums(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  if (loading) return <Loading />
  if (error)
    return (
      <p className="d-flex justify-content-center align-items-center my-5">
        Error fetching albums
      </p>
    )
  return (
    <>
      <NavBar onSearch={handleFetch} />
      <div className="container pb-5">
        <h1 className="mt-5">Trending</h1>

        <div className="row g-3 mt-3">
          {albums?.data?.length > 0 &&
            albums?.data?.map((album, index) => (
              <div
                className="col-12 col-sm-6 col-md-4 "
                onClick={() => handleNavigate(album._id)}
                key={index}
              >
                <Card>
                  <Card.Img variant="top" src={`/uploads/${album?.image}`} />
                  <Card.Body>
                    <Card.Title>{album.Title}</Card.Title>
                    <Card.Text>Artist: {album.Artist}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Average Rating: {album.rating}
                    </small>
                  </Card.Footer>
                </Card>
              </div>
            ))}
          {albums?.data?.length === 0 && <p>No Albums on trending</p>}
        </div>
        <div className=" d-flex justify-content-center align-items-center">
          <CustomPagination
            page={page}
            totalPages={parseInt(albums?.totalPages)}
            setPage={setPage}
          />
        </div>
      </div>
    </>
  )
}

export default Home
