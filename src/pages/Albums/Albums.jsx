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

const Albums = () => {
  const navigate = useNavigate()
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { auth } = useContext(AuthContext)
  const { openAlbumModal } = useContext(ModalContext)
  const [page, setPage] = useState(1)

  useEffect(() => {
    handleFetch("", page)
    console.log("page changed")
  }, [page])

  const handleNavigate = (id) => {
    navigate(`/album/${id}`)
  }

  const handleFetch = (search = "", page = 1) => {
    setError(null)
    reqMethod(`/api/albums?q=${search}&page=${page}`, "GET", auth?.user?.token)
      .then((data) => {
        setAlbums(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }
  const handleDelete = async (event, id) => {
    event.stopPropagation()
    setError(null)
    try {
      setLoading(true)
      await reqMethod(`/api/albums/${id}`, "DELETE", auth?.user?.token)
      toast.success("Album deleted successfully")
      handleFetch()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("Error deleting album")
    }
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
        <h1 className="mt-5">All Albums</h1>
        <Button variant="outline-secondary" onClick={openAlbumModal}>
          Add Album
        </Button>
        <div className="row g-3 mt-3">
          {albums?.data?.length > 0 &&
            albums?.data?.map((album, index) => (
              <div
                className="col-12 col-sm-6 col-md-4 "
                onClick={() => handleNavigate(album._id)}
                key={index}
              >
                <Card>
                  <Card.Img variant="top" src="holder.js/100px160" />
                  <Card.Body>
                    <Card.Title>{album.Title}</Card.Title>
                    <Card.Text>Artist: {album.Artist}</Card.Text>
                    <Button
                      onClick={(event) => handleDelete(event, album._id)}
                      size="sm"
                      variant="secondary"
                    >
                      Delete
                    </Button>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Average Rating: {album.rating}
                    </small>
                  </Card.Footer>
                </Card>
              </div>
            ))}
          {albums?.data?.length === 0 && <p>No Albums found</p>}
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

export default Albums
