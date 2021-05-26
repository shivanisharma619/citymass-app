import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { AccessibilityPage } from './AccessibilityPage';
import './App.scss';

function App() {

  const [url, setUrl] = useState('');
  const [accessResult, setAccessResult] = useState({});
  const [gotResult, setResult] = useState(false);

  const validateUrl = () => {
    let isValid = false;
    const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (regex.test(url)) {
      isValid = true;
    } else {
      alert('Enter valid url');
    }

    return isValid;
  }

  const handleChange = (event) => {
    setUrl(event.target.value);
  }

  const handleSubmit = () => {
    const validUrl = validateUrl();
    console.log(validUrl);
    if (validUrl) {
      const data = new FormData();
      data.append('domain', url);
      data.append('source', 'requests');
      data.append('country', 'Australia');
      console.log('data', data);
      axios({
        method: 'post',
        url: 'https://audit-check-api-server-development.azurewebsites.net/job/execute/businessdev',
        headers: { "Content-Type": "multipart/form-data" },
        data,
      })
        .then(result => {
          console.log('result', result);
          if (result.status === 200) {
            setAccessResult(result);
            setResult(true);
          }
      })
        .catch(error => {
          console.log('error', error);
        });
    }
  }

  return (
    <>
      {gotResult ?
         <AccessibilityPage 
           url={url}
           accessResult={accessResult}
         /> :
          <Modal
            show
            dialogClassName="modal-width"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header>
              <Modal.Title id="example-custom-modal-styling-title text-center">
                CHECK YOUR WEBSITE ACCESSIBILITY
              </Modal.Title>
            </Modal.Header>
            <span className="details-title">Enter your details below for a WCAG 2.1 compliance report</span>
    	      <Modal.Body className="show-grid">
    	        <Container>
    	          <div className="aware-heading font-weight-bold text-center pt-5 pb-5">
    	            AWARE website checker
    	          </div>

    	          <div className="url-div mt-5 p-3">
    	            <p className="font-weight-bold">Website URL *</p>
                  <div>
                    <InputGroup className="mb-3">
    							    <FormControl
    							      placeholder="https://"
    							      aria-label="URL"
    							      aria-describedby="basic-addon1"
                        onChange={handleChange}
    							    />
                    </InputGroup>
    							  <Button onClick={handleSubmit} className="btn-color" size="md" block>
    							    Check my website!
    							  </Button>
    							  <p className="mt-1 spam-message">And don't worry, we hate span too! You can unsubscribe anytime</p>
                  </div>
    	          </div>
    	        </Container>
    	      </Modal.Body>
          </Modal>
      }
    </>
  );
}

export default App;
