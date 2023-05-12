import React, { useContext, useState } from "react"
import { FloatingLabel } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import ModalLayout from "./Modal"
import { ModalContext } from "../../context/ModalProvider"
import { AuthContext } from "../../context/AuthProvider"
import { toast } from "react-toastify"
import { reqMethod } from "../../utilities/users-api"

const AddReviewModal = () => {
  const { modalState } = useContext(ModalContext)
  const { auth } = useContext(AuthContext)
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { payload } = modalState.payload

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      setLoading(true)

      await reqMethod(
        `/api/albums/${payload.albumId}/reviews`,
        "POST",

        {
          description,
          rating: parseInt(rating),
        }
      )

      setDescription("")
      setRating("")
      setLoading(false)

      toast.success("Successfully added review")
    } catch (err) {
      setError(err.status)
      console.log(err)
      setLoading(false)
      toast.error("Not Allowed")
    }
  }
  return (
    <ModalLayout title="Add Review" onSubmit={handleSubmit} loading={loading}>
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
          aria-label="Choose rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option>Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Select>
      </div>
    </ModalLayout>
  )
}

export default AddReviewModal
