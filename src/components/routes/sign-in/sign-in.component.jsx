import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  createAuthUserWithEmailAndPassword,
} from "../../../utils/firebase/firebase.utils";
import Login from "../../login/login.component";
import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
};

const SignIn = () => {
  const setCurrentUser = useContext(UserContext);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password } = formFields;
  // console.log(formFields);
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDoc = await createUserDocFromAuth(user);
    // console.log(userDoc);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocFromAuth(user, { displayName });
      resetFormFields();
      setCurrentUser(user);
      alert("Sign In Successfull");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot Create User, Email Already Exists");
      }
      if (error.code === "auth/weak-password") {
        alert("Password must be of 6 characters");
      }
      console.log("error while creating user" + error);
    }
  };
  return (
    <Container>
      <Row className="justify-content-center">
        {/* Signin Form  */}
        <Col sm={4} className="me-5">
          <h2>New here ?</h2>
          <span> Sign Up with your Email </span>
          <form onSubmit={handleSumbit}>
            <label>Name</label>
            <Form.Control
              type="text"
              placeholder="Enter Your Full Name"
              required
              name="displayName"
              value={displayName}
              onChange={handleChange}
            ></Form.Control>
            <label>Email</label>
            <Form.Control
              type="email"
              placeholder="Enter your Email"
              required
              value={email}
              onChange={handleChange}
              name="email"
            ></Form.Control>
            <label>Password</label>
            <Form.Control
              type="password"
              placeholder="Enter your Password"
              required
              value={password}
              onChange={handleChange}
              name="password"
            ></Form.Control>
            <Row className="justify-content-center">
              <Button className="mt-3 col-4 btn-dark" type="submit">
                Sign Up
              </Button>
              <Button
                onClick={logGoogleUser}
                className=" ms-2 mt-3 col-6 btn-danger"
                type="submit"
              >
                Sign Up with Google
              </Button>
            </Row>
          </form>
        </Col>
        <Col sm={6}>
          <Login />
        </Col>
      </Row>
    </Container>
  );
};
export default SignIn;
