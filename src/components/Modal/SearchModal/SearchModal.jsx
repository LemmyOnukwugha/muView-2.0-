import React, { useContext } from "react"
import ModalLayout from "../Modal"
import { Form, ListGroup } from "react-bootstrap"
import { ModalContext } from "../../../context/ModalProvider"

const SearchModal = () => {
  return (
    <ModalLayout title="Search">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label></Form.Label>
          <Form.Control type="text" placeholder="Enter Album name" />
        </Form.Group>
      </Form>
      <ListGroup>
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </ModalLayout>
  )
}

export default SearchModal
