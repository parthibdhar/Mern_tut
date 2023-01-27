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
  //Get details of post
  const [userData, setUserData] = useState([])
  //token store
  const token = localStorage.getItem('token');


  useEffect(() => {
    getUserData();
  }, []);

  function getUserData() {
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
    axios.post('http://localhost:5000/post', { fname, email, age, image })
      .then(response => {
        window.alert('Data saved');
        setImage("")
      });
  }

  //use effect for post
  useEffect(() => {
    if (email) {
      fetchUserPost();

    }

  }, [email]);
  //ftech user post
  const fetchUserPost = async (req, res) => {

    await axios.get(`http://localhost:5000/getByEmail/${email}`).then(resp => {
      // const user = req.data.result
      console.log("data: " + resp.data.user[0].name);

      setUserData(resp.data.user)

    }).catch(err => {
      console.log("error: " + err);

    })

  }

  const editHandler = (req, res) => {
    alert("edit korba suna? 😞")
  }

  const deleteHandler = (req, res) => {
    alert("tumi chole jaba suna? Disappointed Face on Microsoft Teams 1.0  ")
  }


  return (
    <>
      {/* USER GREETING */}
      <div>
        {
          isLoading ? <div>loading...</div> :
            <h1>kigo suna {name ? name + " & your mail is " + email : 'painai'}
            </h1>


        }
      </div>

      {/* USER  POSTING PLACE */}
      <div>
        <form onSubmit={postHandler}>

          <label>
            Name:
            <input type="text" value={fname} onChange={e => setFname(e.target.value)} />
          </label>
          <label>
            Age:
            <input type="text" value={age} onChange={e => setAge(e.target.value)} />
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
                  setImage(data)
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
      {/* <hr /> */}
      {/* Displaying users posts */}
      {userData?.length || userData != null ?
       
          userData.map(post => 


            <div key={post._id}>{post.name} -{'>'} {post.age} <img src={post.image.url} alt="" height={150} width={150}/>
            <button onClick={()=>editHandler(post)}>Edit</button>  <button onClick={()=>deleteHandler(post)}>Delete</button>
            </div>
          

          ):
          
        <div>No Data</div>

      }

    </>
  )
}
