import React, { useContext, useEffect, useState } from "react"
import { reqMethod } from "../../utilities/users-api"
import { AuthContext } from "../../context/AuthProvider"
import { Button, Card, Spinner } from "react-bootstrap"
import Loading from "../../components/Loading/Loading"
import { toast } from "react-toastify"
import NavBar from "../../components/NavBar/NavBar"

const Profile = () => {
  const [userDetails, setUserDetails] = useState({})

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { auth } = useContext(AuthContext)
  useEffect(() => {
    handleFetchReview()
  }, [])
  const handleFetchReview = () => {
    setLoading(true)
    reqMethod("/api/auth/me", "GET", auth?.user?.token)
      .then((data) => {
        setUserDetails(data.user)
        setLoading(false)
      })
      .catch((error) => toast.error("Failed to fetch review"))
  }
  const handleDelete = async (review) => {
    try {
      setLoading(true)
      setError(null)
      await reqMethod(`/api/reviews/${review._id}`, "DELETE", auth?.user?.token)
      setLoading(false)
      handleFetchReview()
    } catch (error) {
      setLoading(false)
      setError(error)
    }
  }
  if (loading) return <Loading />
  if (error)
    return (
      <p className="d-flex justify-content-center align-items-center my-5 text-danger">
        Failed to delete review
      </p>
    )
  return (
    <>
      <NavBar />
      <div className="container  ">
        <h2 className="mt-4">Profile Details</h2>
        <Card
          className="py-2 px-4 text-start mx-auto"
          style={{ maxWidth: 800 }}
        >
          <div>Name: {userDetails?.name}</div>
          <div>Email: {userDetails?.email}</div>
          <div>Role: {userDetails?.role}</div>
        </Card>
        <h4 className="mt-4">My Reviews</h4>
        {userDetails?.reviews?.length === 0 && (
          <p>You haven't made any reviews yet</p>
        )}
        {userDetails?.reviews &&
          userDetails?.reviews?.length > 0 &&
          userDetails?.reviews?.map((review, index) => (
            <Card
              key={index}
              className="mb-2 mx-auto"
              border="light"
              style={{ maxWidth: 800 }}
            >
              <Card.Header className="d-flex justify-content-between">
                <p>
                  {" "}
                  <span className="fw-bold fs-4">
                    {" "}
                    {review?.album.Title}
                  </span>{" "}
                  <span className="fst-italic">by</span>{" "}
                  <span className="text-muted"> {review?.album.Artist}</span>
                </p>
                <br />
                <span className="fs-6 text-muted" style={{ fontSize: 8 }}>
                  created on: {new Date(review?.createdAt).toDateString()}
                </span>
                <Button
                  size="sm"
                  variant="dark"
                  onClick={() => {
                    handleDelete(review)
                  }}
                  disabled={loading}
                >
                  <span>Delete</span>
                </Button>
              </Card.Header>
              <Card.Body className="text-start">
                <p> {review?.description}</p>
                <p className="fs-6 text-muted text-end">
                  Rating: {review?.rating}
                </p>
              </Card.Body>
            </Card>
          ))}
      </div>
    </>
  )
}

export default Profile
