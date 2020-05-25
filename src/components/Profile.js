import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { initiateGetProfile, initiateUpdateProfile } from '../actions/profile';

class Profile extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    errorMsg: '',
    isSubmitted: false
  };

  componentDidMount() {
    this.props.dispatch(initiateGetProfile());
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.profile, this.props.profile)) {
      const { first_name, last_name } = this.props.profile;
      this.setState({ first_name, last_name });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { first_name, last_name } = this.state;
    const profileData = {
      first_name,
      last_name
    };

    if (first_name.trim() === '' && last_name.trim() === '') {
      this.setState({
        errorMsg: 'All the fields are required.'
      });
    } else {
      this.setState({ isSubmitted: true, errorMsg: '' });
      this.props.dispatch(initiateUpdateProfile(profileData));
    }
  };

  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { errorMsg, first_name, last_name, isSubmitted } = this.state;
    return (
      <div className="col-md-6 offset-md-3">
        <h1>Profile Page</h1>
        <Form onSubmit={this.handleSubmit} className="profile-form">
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
              value={first_name}
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Form.Group controlId="last_name">
            <Form.Label>Last name:</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              placeholder="Enter your last name"
              value={last_name}
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps)(Profile);
