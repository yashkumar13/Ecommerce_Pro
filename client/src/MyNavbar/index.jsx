import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Form, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logoutActionCreator } from '../reducers/userReducer';
import { Cart } from 'react-bootstrap-icons';
import './styles.scss'

function MyNavbar() {
    const dispatch = useDispatch();
    const [, setSearchParams] = useSearchParams();

    const { username, totalCount } = useSelector(({ user }) => user)

    const logout = () => {
        dispatch(logoutActionCreator())
    }

    return (
        <Navbar expand="md" variant='dark' bg='dark'>
            <Container fluid>
                {/* <Navbar.Brand href="#home">EcommercePro</Navbar.Brand> */}
                <Navbar.Brand as={Link} to='/' >EcommercePro</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link as={Link} to='/' >Home</Nav.Link> */}
                        {/* <Nav.Link as={Link} to='/bootstrap'>Bootstrap</Nav.Link>
                        <Nav.Link as={Link} to='/flex'>Flexbox</Nav.Link> */}
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Nav>
                        {username ? <>
                            <Nav.Link as={Link} to='/cart'><>
                                <Cart size={25} />
                                {totalCount ? <Badge pill bg="primary" className='count'>
                                    {totalCount}
                                </Badge> : null}
                            </>
                            </Nav.Link>
                            <Nav.Link as={Link} onClick={logout} >Logout</Nav.Link>
                        </> :
                            <>
                                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                                <Nav.Link as={Link} to='/signup'>Signup</Nav.Link>
                            </>
                        }


                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={e => setSearchParams({ 'search': e.target.value })}
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MyNavbar