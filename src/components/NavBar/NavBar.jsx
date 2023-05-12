import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ModalContext } from "../../context/ModalProvider"
import { AuthContext } from "../../context/AuthProvider"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"

export default function NavBar({ onSearch }) {
  const { openSearchModal } = useContext(ModalContext)
  const { handleSignOut } = useContext(AuthContext)
  const [search, setSearch] = useState("")
  const location = useLocation()

  useEffect(() => {
    if (search === "" && onSearch) {
      onSearch("")
    }
  }, [search])

  const handleSubmit = function (e) {
    e.preventDefault()
    onSearch(search)
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          MuView
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {location?.pathname === "/albums" ? (
            <Form className="d-flex me-auto" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit" variant="outline-secondary">
                Search
              </Button>
            </Form>
          ) : (
            <div className="me-auto" />
          )}
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
