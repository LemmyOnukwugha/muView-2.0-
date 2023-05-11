import React, { useContext, useState } from "react"
import ModalLayout from "./Modal"
import { Form, ListGroup } from "react-bootstrap"
import { reqMethod } from "../../utilities/users-api"
import { AuthContext } from "../../context/AuthProvider"
import { toast } from "react-toastify"

const AlbumModal = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    Title: "",
    Artist: "",
    Release: "",
    Genre: "",
  })

  const { auth } = useContext(AuthContext)

  const handleChange = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }
  const handleSubmit = async () => {
    try {
      setLoading(true)
      await reqMethod("/api/albums", "POST", auth?.user?.token, data)
      setData({ Title: "", Artist: "", Release: "", Genre: "" })
      setLoading(false)
      toast.success("Success creating album")
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error("Error creating album")
    }
  }
  return (
    <ModalLayout title="Album" onSubmit={handleSubmit} loading={loading}>
      <div>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Title"
            onChange={handleChange}
            value={data.Title}
            name="Title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Artist</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Artist name"
            onChange={handleChange}
            value={data.Artist}
            name="Artist"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Release</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Release Date"
            onChange={handleChange}
            value={data.Release}
            name="Release"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Genre"
            onChange={handleChange}
            value={data.Genre}
            name="Genre"
          />
        </Form.Group>
      </div>
    </ModalLayout>
  )
}

export default AlbumModal
