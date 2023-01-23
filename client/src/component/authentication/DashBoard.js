import React, { useEffect, useState } from 'react'
// import { useJwt } from "react-jwt";
import { decodeToken } from "react-jwt";
// import * as jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//camera icon
import { BsCameraFill } from "react-icons/bs";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";



export const DashBoard = () => {
  const history = useNavigate();
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  // FORM CONSTANT 
  const [fname, setFname] = useState("")
  const [age, setAge] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState({})
  // const [file, setFile] = useState("")


  useEffect(() => {
    getUserData();
  }, []);

  function getUserData() {
    const token = localStorage.getItem('token');
    // console.log("token: " + token);

    if (token) {
      // console.log("token: " + token);

      const userToken = JSON.stringify(decodeToken(token));
      const user = JSON.parse(userToken);

      // console.log("user in dashboard: " + user.name);
      if (!user) {
        localStorage.removeItem('token');
        history('/login');
      }

      setName(user.name)
      setEmail(user.email)
      setIsLoading(false)

    } else {
      history('/login');
    }

  }

  const postHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/post', { name, email, age,image })
      .then(response => {
        window.alert('Data saved');
      });
  }

  return (
    <>
      {/* USER GREETING */}
      {
        isLoading ? <div>loading...</div> :
          <h1>kigo suna {name ? name : 'painai'}
          </h1>


      }

      {/* USER  POSTING PLACE */}
      <div>
        <form onSubmit={postHandler}>

          <label>
            Name:
            <input type="text" value={fname} onChange={e => setFname(e.target.value)} />
          </label>
          <label>
            Age:
            <input type="text" value={age}  onChange={e => setAge(e.target.value)} />
          </label>
          <br />
          <label htmlFor="img" >
            {
              image && image.url ?
                (<img src={image.url} height={190} width={190} alt='minato' />)
                : uploading ?
                  (
                    <>
                      <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>

                    </>
                  ) : (<BsCameraFill size={40} style={{ cursor: 'pointer' }} />)
            }

            <input
              onChange={async (e) => {
                const file = e.target.files[0]
                let formData = new FormData()
                formData.append("iamge", file)
                console.log([...formData]);
                setUploading(true)
                try {
                  const { data } = await axios.post("http://localhost:5000/auth/upload_image", formData);

                  console.log("image uploaded: " + data.public_id);
                  setUploading(false)
                  setImage({
                    url: data.url,
                    public_id: data.public_id
                  })
                }
                catch (error) {
                  console.log(error);
                }

              }}
              type="file"
              accept='image/*'
              name="img"
              id="img"
              hidden />
          </label><br />
          <button type="submit" value="post" > post</button>
        </form>
      </div>


    </>
  )
}
