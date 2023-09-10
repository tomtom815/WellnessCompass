import React from 'react'
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Register.css'
// Regular expressions for validation
const NAME_REGEX = /^[A-Z][a-z]{2,15}$/
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%=]).{8,24}$/;


const Register = () => {
  // Refs for input fields
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userRef = useRef();
  const errRef = useRef();

  // State for first name input
  const [firstName, setFirstName] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  // State for last name input
  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  // State for username name input
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // State for password input
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [PasswordFocus, setPasswordFocus] = useState(false);

  // State for password confirmation input
  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // State for error message
  const [errMsg, setErrMsg] = useState('');

  // State for success message
  const [success, setSuccess] = useState(false);

  // Use Effect to Set Initial Focus on the "First Name" Input Field
  useEffect(() => {
      // This effect is triggered once when the component initially renders 
      // due to an empty dependency array.
    firstNameRef.current.focus();
  }, []);

  // Use Effect to Validate and Update the "First Name" Input
  useEffect(() => {
    // This effect runs whenever the "firstName" state changes, as indicated by the [firstName] dependency array.
  // It validates the "First Name" input against the NAME_REGEX pattern using .test().
  // The result is a boolean value indicating whether the input matches the pattern.
  // The validation result is logged for debugging purposes and then stored in the "validFirstName" state.
    const result = NAME_REGEX.test(firstName);
    console.log(result);
    console.log(user);
    setValidFirstName(result);
  }, [firstName]);

  // Use Effect to Validate and Update the "Last Name" Input
  useEffect(() => {
    // Similar to the previous effect
    const result = NAME_REGEX.test(lastName);
    console.log(result);
    console.log(user);
    setValidLastName(result);
  }, [lastName]);

  // Use Effect to Validate and Update the "Username" Input
  useEffect(() => {
    // Similar to the previous effect
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);

  }, [user]);

  // Use Effect to Validate and Update the "Password" Inputs
  useEffect(() => {
    // This effect is responsible for validating and updating the "Password" input fields.
    // It triggers on changes in the "password" and "matchPassword" states.
    // It first validates the "password" against the PASSWORD_REGEX pattern.
    // The validation result is logged, and "validPassword" is updated accordingly.
    // Additionally, it checks if the "password" matches the "matchPassword" input for password confirmation.
    const result = PASSWORD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  // Use Effect to Clear Error Message
  useEffect(() => {
    // This effect clears the error message whenever there are changes in the
    // "user," "password," or "matchPassword" states.
    setErrMsg('');
  }, [user, password, matchPassword]);

  const handleSubmit = async (e) => {
    // Prevent the default form submisttion behavior to handle validation and submissions manually.
    e.preventDefault();
    
    // Check if all validation conditions are met
    const isUsernameValid = USER_REGEX.test(user);
    const isPasswordValid = PASSWORD_REGEX.test(password);
    const isFirstNameValid = NAME_REGEX.test(firstName);
    const isLastNameValid = NAME_REGEX.test(lastName);

    if (!isUsernameValid || !isPasswordValid || isFirstNameValid || isLastNameValid) {
      // Set error message if any of the validation conditions fail
      setErrMsg("invalid Entry");
      // Exit early to prevent submission
      return;
    }

    // If all input fields are valid, log the username and password (for debugging).
    console.log(user, password);

    // Set the "Success" state to true, indicating successful registration.
    setSuccess(true);
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Success</h1>
          <p>
            <a href="#">Sign In!</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">
                First Name:
                <span className={validFirstName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validFirstName || !firstName ? "hide" :
                "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="firstName"
              ref={firstNameRef}
              autoComplete="off"
              onChange={(e) => setFirstName(e.target.value)}
              required
              aria-invalid={validFirstName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setFirstNameFocus(true)}
              onBlur={() => setFirstNameFocus(false)}
            />
            <p id="uidnote" className={firstNameFocus && firstName
              && !validFirstName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              3 to 15 characters.<br />
              Must begin with a  capital letter.<br />
              </p>
              
            <label htmlFor="lastName">
                Last Name:
                <span className={validLastName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validLastName || !lastName ? "hide" :
                "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="lastName"
              ref={lastNameRef}
              autoComplete="off"
              onChange={(e) => setLastName(e.target.value)}
              required
              aria-invalid={validLastName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setLastNameFocus(true)}
              onBlur={() => setLastNameFocus(false)}
            />
            <p id="uidnote" className={lastNameFocus && lastName
              && !validLastName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              3 to 15 characters.<br />
              Must begin with a  capital letter.<br />
            </p>

            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" :
                "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p id="uidnote" className={userFocus && user
              && !validName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password">
              Password:
              <span className={validPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPassword || !password ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="Passwordnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p id="Passwordnote" className={PasswordFocus && !validPassword ? "instructions" :
              "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and
              a special character. <br />
              Allowed special characters: <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
              <span aria-label="equal sign">=</span>
            </p>

            <label htmlFor="confirm_Password">
              Confirm Password:
              <span className={validMatch && matchPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confirm_Password"
              onChange={(e) => setMatchPassword(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" :
              "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
        
            <button disabled={!validName || !validPassword || !validMatch ? true : false}
            >Sign Up</button>
          </form>
          <p>
            Already registered?<br />
            <span className="line">
              {/* put router link here */}
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>
      )}
      </>
  )
}

export default Register