import React from "react"
import { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useContext } from "react"
import { ModalContext } from "../../context/ModalProvider"
import { Spinner } from "react-bootstrap"

const ModalLayout = ({ title, children, onSubmit, loading }) => {
  const { modalState, closeModal } = useContext(ModalContext)

  const handleClose = () => closeModal()

  const handleSubmit = () => {
    if (onSubmit) onSubmit()
  }

  return (
    <Modal show={!!modalState.modal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Loading...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalLayout
