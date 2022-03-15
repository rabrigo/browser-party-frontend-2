import React from 'react';
// import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    API.getSingleUser(props.username).then(data => {
      console.log(data)
      setFriends(data.user.friends)
    })
  }, [])

  const styles = {
    logo: {
      margin: '10vh auto 5px auto',
    },
    component: {
      width: '500px',
      margin: '0 auto',
      padding: '28px'
    }
  }

  let navigate = useNavigate();

  const loginChange = () => {
    let path = `/login`;
    navigate(path);
  }

  return (
    <div>
      <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
      {props.username ? (
        <div style={styles.component} className="component">
          <div>
            <h1>{props.username}</h1>
            <div>
              <div className="card-body">
                <h2>Game history: </h2>
                <ul>
                  <li>insert game here</li>
                </ul>
              </div>
            </div>
            <div>
              <div className="card-body">
                <h2>Friends:</h2>
                <ul>
                  {friends.map(friend => (
                    <li>{friend}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div style={{width: '330px', height: '100px', margin: '0 auto', padding:'20px'}} className="component">
            You must login first!
            <button style={{marginLeft: '40px'}} className="button" type="submit" onClick={loginChange}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
}