import React, { useContext, useState } from "react"
import { ModalContext } from "../../context/ModalProvider"
import { Button, Card, Spinner } from "react-bootstrap"
import { reqMethod } from "../../utilities/users-api"
import { AuthContext } from "../../context/AuthProvider"

const Reviews = ({ album, onFetchAlbum }) => {
  const { openReviewModal } = useContext(ModalContext)

  return (
    <div className="container">
      <div className="mb-3">
        <div className="row">
          <div className="col-6">
            {" "}
            <h2 className="text-start">Reviews</h2>
          </div>
          <div className="col-6">
            {" "}
            <div className="rating">
              <Button
                variant="outline-secondary"
                onClick={() =>
                  openReviewModal({
                    payload: { albumId: album._id, callback: onFetchAlbum },
                  })
                }
              >
                Add Review
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {album.reviews.length === 0 ? (
          <p className="fst-italic mt-5"> No reviews for this album yet.</p>
        ) : (
          <ul>
            {album.reviews.map((review, index) => (
              <Card key={index} className="mb-2" border="light">
                <Card.Header className="d-flex justify-content-between">
                  <span className=" text-muted">
                    Post by: {review?.user?.name}
                  </span>
                  <span className="fs-6 text-muted" style={{ fontSize: 8 }}>
                    created on: {new Date(review?.createdAt).toDateString()}
                  </span>
                </Card.Header>
                <Card.Body className="text-start">
                  <p> {review?.description}</p>
                  <p className="fs-6 text-muted text-end">
                    Rating: {review?.rating}
                  </p>
                </Card.Body>
              </Card>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Reviews
