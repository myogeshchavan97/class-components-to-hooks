import React, { useState, useEffect, useCallback, useRef } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { initiateGetProfile, initiateUpdateProfile } from '../actions/profile';

const Profile = (props) => {
  const [state, setState] = useState({
    first_name: '',
    last_name: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const propsRef = useRef(false);

  const processOnMount = useCallback(() => {
    if (!propsRef.current) {
      props.dispatch(initiateGetProfile());
      propsRef.current = true;
    }
  }, [props]);

  useEffect(() => {
    processOnMount();
  }, [processOnMount]);

  useEffect(() => {
    setState(props.profile);
  }, [props, props.profile]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { first_name, last_name } = state;
    const profileData = {
      first_name,
      last_name
    };

    if (first_name.trim() === '' && last_name.trim() === '') {
      setErrorMsg('Please enter all the fields.');
    } else {
      setIsSubmitted(true);
      setErrorMsg('');
      props.dispatch(initiateUpdateProfile(profileData));
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    });
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h1>Profile Page</h1>
      <Form onSubmit={handleSubmit} className="profile-form">
        {errorMsg ? (
          <p className="errorMsg centered-message">{errorMsg}</p>
        ) : (
          isSubmitted && (
            <p className="successMsg centered-message">
              Profile updated successfully.
            </p>
          )
        )}
        <Form.Group controlId="first_name">
          <Form.Label>First name:</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Enter your first name"
            value={state.first_name || ''}
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group controlId="last_name">
          <Form.Label>Last name:</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Enter your last name"
            value={state.last_name || ''}
            onChange={handleOnChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps)(Profile);
