import { Form, Col, Row, Button, Container } from "react-bootstrap";
import {Formik} from 'formik';
import * as yup from 'yup';
import {redirect} from 'react-router';

const schema = yup.object().shape({
    firstName: yup.string().required('Required.'),
    lastName: yup.string().required('Required.'),
    username: yup.string().matches(/^[a-z0-9]*$/).required('Required.'),
    email: yup.string().email().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gmi, 'Invalid email').required('Required.'),
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required('Required.'),
    passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
    phoneNumber: yup.string().matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/gm).required('Required.')
});


const SignUp = () => {
    

    const handleSubmit = async (values) => {
        
        try {
          const response = await fetch("http://localhost:5001/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
         /* eslint-disable no-undef */   body: JSON.stringify(values)
          });
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            console.log("form submission complete");
            redirect('/');
          } else {
            throw new Error("Error submitting form");
          }
        } catch (error) {
          console.error(error);
        } 
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
      

  return (
    <Container className='text-center justify-content-center align-items-center h-100'>
    <Formik
    initialValues={{firstName: '', lastName: '', username:'', email: '', password:'', passwordConfirmation: '', phoneNumber:''}}
    validationSchema={schema}
    onSubmit={handleSubmit}
    
    >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors
        }) => (
    <Form noValidate onSubmit={handleSubmit} className='mx-auto '>
      <Form.Group as={Row} className='mb-3' controlId='username'>
        <Form.Label column sm='1'>Username:</Form.Label>
        <Col sm='4'>
          <Form.Control 
          name='username'
          type='text'
          value={values.username}
          onChange={handleChange}
          isValid={touched.username && !errors.username} />
        </Col>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="first.name">
        <Form.Label column sm='1'>First Name:</Form.Label>
        <Col sm="4">
          <Form.Control 
          name='firstName'
          value={values.firstName}
          onChange={handleChange}
          isValid={touched.firstName && !errors.firstName}
          type="text" placeholder="John" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="last.name">
        <Form.Label column sm='1'>Last Name:</Form.Label>
        <Col sm="4">
          <Form.Control 
          name='lastName'
          value={values.lastName}
          onChange={handleChange}
          isValid={touched.lastName && !errors.lastName}
          type="text" 
          placeholder="Doe" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="email">
        <Form.Label column sm='1'>Email:</Form.Label>
        <Col sm="4">
          <Form.Control 
          name='email'
          value={values.email}
          onChange={handleChange}
          isValid={touched.email && !errors.email}
          type="email" 
          placeholder="example@placeholder.com" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="phoneNumber">
        <Form.Label column sm='1'>Phone Number:</Form.Label>
        <Col sm="4">
          <Form.Control 
          name='phoneNumber'
          value={values.phoneNumber}
          onChange={handleChange}
          isValid={touched.phoneNumber && !errors.phoneNumber}
          type="text" 
          placeholder="8884441122" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="password">
        <Form.Label column sm="1">
          Password
        </Form.Label>
        <Col sm="4">
          <Form.Control
          name='password'
          value={values.password}
          onChange={handleChange}
          isValid={touched.password && !errors.password} 
          type="password" 
          placeholder="Password" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="confirmpass">
        <Form.Label column sm='1'>
          Confirm Password
        </Form.Label>
        <Col sm="4">
          <Form.Control 
          name='passwordConfirmation'
          value={values.passwordConfirmation}
          onChange={handleChange}
          isValid={values.passwordConfirmation && !errors.passwordConfirmation}
          type="password" 
          placeholder="Password" />
        </Col>
      </Form.Group>
      <Button type='submit'>Submit</Button>
    </Form>
  )}
    </Formik>
    </Container>
  );
};

export default SignUp;
