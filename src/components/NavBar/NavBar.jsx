import { useContext } from "react"
import { Link } from "react-router-dom"
import { ModalContext } from "../../context/ModalProvider"
import { AuthContext } from "../../context/AuthProvider"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"

export default function NavBar() {
  const { openSearchModal } = useContext(ModalContext)
  const { handleSignOut } = useContext(AuthContext)
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          MuView
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex me-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary">Search</Button>
          </Form>
          <Nav
            className=" my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/albums">
              Albums
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              {" "}
              Profile
            </Nav.Link>
            <Nav.Link onClick={handleSignOut}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
