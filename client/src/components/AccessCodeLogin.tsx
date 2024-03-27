import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { error } from 'console';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import './stylesheets/LoginSquare.css';
import { access } from 'fs';

const AccessCodeLogin: React.FC = () => {
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState('');
    const [accessCodeVisible,setAccessCodeVisible] = useState(false);
    const navigate = useNavigate();

    const handleAccessCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccessCode(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8080/auth/verify',{ 
        "accessCode" :accessCode 
    })
        .catch(function (error) {
            console.log(error);
        });
        
    };
      // Make a POST request to verify the access code
/*      
      if (res.status === 200) {
        // Access code verified successfully
        const verifiedCode = res.data; // Assuming the backend returns the verified code information
        if (verifiedCode !== null) {
          // Code is valid, proceed to review form
          onSubmit(verifiedCode.reviewId); // Pass the reviewId to the onSubmit callback
        } else {
          setError('Invalid access code. Please try again.');
        }
      } else {
        setError('Invalid access code. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting access code:', error);
      setError('An error occurred. Please try again later.');
    }
*/

    return (
        <Container className = "loginsquare-container">
            <Row classname = "d-flex flex-column align-items-center justify-content-center">
                <Form className="loginsquare-form" onSubmit={handleSubmit}>
                    <InputGroup>
                        <Form.Control
                            className='mb-3'
                            type={accessCodeVisible ? "text" : "AccessCode"}
                            value={accessCode}
                            onChange={handleAccessCodeChange}
                            placeholder="Enter your access code"
                            required
                        />
                        {accessCode && <InputGroup.Text className='mb-3 visibility' onClick={() => setAccessCodeVisible(!accessCodeVisible)}>
                            {accessCodeVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </InputGroup.Text>}
                    </InputGroup>
                </Form>
                <Button variant="primary" type="submit" className="login-button">
                Verify
                </Button>
            </Row>
        </Container>
      /* <div>
      <h2>Enter Your Access Code</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          placeholder="Enter your access code"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div> 

    </Container>
   */ 
  );
};


export default AccessCodeLogin;
