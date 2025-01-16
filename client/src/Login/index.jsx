import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card, Container, Row, Col } from 'react-bootstrap'
import './styles.scss'
import { useEffect, useState } from 'react';
import { loginApi } from '../apiUtil';
import { useDispatch, useSelector } from 'react-redux';
import { loginActionCreator, resetPasswordActionCreator } from '../reducers/userReducer';
import { useLocation, useNavigate } from 'react-router'

function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState(null);
  const [showRestForm, setShowRestForm] = useState(false);

  const { username: isLoggedIn } = useSelector(({ user }) => user);

  const { message, success } = useSelector(({ user }) => user);


  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1);
    }

  }, [isLoggedIn]);


  useEffect(() => {
    if (showRestForm && success) {
      setShowRestForm(false);
    }

  }, [success, showRestForm]);



  const ENTER_KEY_CODE = 13;

  const updateState = (e, fn) => {
    fn(e.target.value);
  }

  const isFormValid = username && password;

  const onLogin = async () => {
    try {
      if (!isFormValid) return;
      const payload = { username, password };
      dispatch(loginActionCreator(payload))
      // const data = (await loginApi(payload)).data
      // console.log('loginData',data);
    } catch (error) {
      console.log(error);
    }
  }

  const passwordReset = async () => {
    try {
      if (!otp || !isFormValid) return;
      const payload = { username, password, otp };
      dispatch(resetPasswordActionCreator(payload))
    } catch (error) {
      console.log(error);
    }
  }

  const onKeyUp = (e) => {
    // console.log(e);
    if (e.keyCode === ENTER_KEY_CODE) {
      console.log('Enter key pressed');
      onLogin()
      // trigger submit
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col lg={{ span: 4, offset: 4 }} md={{ span: 6, offset: 3 }} sm={{ span: 10, offset: 1 }}>
          <Card className='mt-5 signup'>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>username</Form.Label>
                  <Form.Control placeholder="Enter username" onChange={e => updateState(e, setUsername)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password"
                    onKeyUp={onKeyUp}
                    onChange={e => updateState(e, setPassword)} />
                </Form.Group>
                {
                  showRestForm ?
                    <>
                      <Form.Group className="mb-3" controlId="otp">
                        <Form.Label>OTP</Form.Label>
                        <Form.Control type="number" placeholder="Code from Authenticator"
                          onKeyUp={onKeyUp}
                          onChange={e => updateState(e, setOTP)} />
                      </Form.Group>
                      <Button
                        variant="outline-primary"
                        onClick={passwordReset}
                        disabled={!isFormValid && !otp} >
                        Reset Password
                      </Button>
                    </>
                    :
                    <div className='d-flex justify-content-between'>
                      <Button
                        variant="outline-primary"
                        onClick={onLogin}
                        disabled={!isFormValid} >
                        Login
                      </Button>

                      <Button
                        variant="outline-danger"
                        onClick={() => setShowRestForm(true)}>
                        Forgot Password
                      </Button>
                    </div>
                }
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login