import React, { useContext, useState } from "react"
import { FloatingLabel } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import ModalLayout from "./Modal"
import { ModalContext } from "../../context/ModalProvider"
import { AuthContext } from "../../context/AuthProvider"

const AddReviewModal = () => {
  const { modalState } = useContext(ModalContext)
  const { auth } = useContext(AuthContext)
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { payload } = modalState.payload
  console.log(payload.albumId)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      setLoading(true)
      const res = await fetch(`/api/albums/${payload.albumId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + auth?.user.token,
        },
        body: JSON.stringify({
          description,
          rating: parseInt(rating),
        }),
      })
      const data = await res.json()

      setLoading(false)
    } catch (err) {
      setError(err)
      console.log(err)
      setLoading(false)
    }
  }
  return (
    <ModalLayout title="Add Review" onSubmit={handleSubmit} loading={loading}>
      {error && <p className="text-danger">Error occurred, try again.</p>}
      <FloatingLabel controlId="floatingTextarea2" label="Enter review">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FloatingLabel>
      <div className="mt-4">
        <Form.Select
          aria-label="Default select example"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option>Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">3</option>
          <option value="5">3</option>
        </Form.Select>
      </div>
    </ModalLayout>
  )
}

export default AddReviewModal
