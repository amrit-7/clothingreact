import { useContext, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/userContext";
import { emailSignInStart } from "../../store/action/action";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const user = dispatch(emailSignInStart(email, password));
      setCurrentUser(user);
      resetFormFields();
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert(" Please Enter correct password");
          break;
        case "auth/user-not-found":
          alert("No user found with this email");
          break;
        default:
          console.log(error);
      }
    }
  };
  return (
    <div>
      <h2>I already have an account </h2>
      <span>Login with your email</span>
      <Form onSubmit={handleSumbit}>
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
          onChange={handleChange}
          name="password"
          value={password}
        ></Form.Control>
        <Row className="justify-content-center">
          <Button className="mt-3 col-4 btn-dark" type="submit">
            Login
          </Button>
        </Row>
      </Form>
    </div>
  );
};
export default Login;
