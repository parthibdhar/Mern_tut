import React, {useState, useEffect, useCallback} from 'react'
import axios  from 'axios'
import Modal from 'react-modal'
import { useUserData } from '../context/context'
import { getUserData } from '../helper/GetUserData'


export const GetCand = (props) => {

    const {userData, setUserData} = useUserData()

    const [post, setPosts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
     const [age, setAge] = useState('');

     const fetchHandler = useCallback(async () =>
     {
         const postData = await getUserData();
         setUserData(postData)       
         console.log("called Data")
     }, [setUserData])

     useEffect(() => {
        fetchHandler()
     }, [fetchHandler]);

    var uid;
   

    // frontend update
    const editHandler = (e) =>{
        // console.log(e.target.parent.parent)
        alert( e.name + ": re edit korba? ");
        
        alert(" or id kintu: " + e._id + " bara")
        // set deatils in form
        uid = e._id;
        setId(uid)
        console.log("id suna: " + uid);
        console.log("id suna: " + uid);
        console.log("Seted id suna: " + id);

        
        setName(e.name)
        setAge(e.age)
        alert(" or id kintu: " + uid + " bara")
        //modal change
        setIsModalOpen(true);
       // props.history.push('/Update', e.name );
    }

    // backend update
    const updateHandler = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/update/${id}`, { name, age })
          .then(response => {
        //    alert('update success');
          });

          setIsModalOpen(false);
          window.location.reload()

         
      };

      // front end delete 
      const deleteHandler = e => {
              alert(e.name + ' tumi chole jaba suna?');
              alert(e._id + ' tumar id suna');
              
            axios.delete(`http://localhost:5000/delete/${e._id}`).then(res =>{
                alert("successfully deleted")
            }).catch(err =>{console.log("err: ", err);})
      }


  return (
    <div>
       
        <hr />
        <h2>List of Post</h2>
        <hr />
        { userData?.length || userData != null?
            userData.map(post => <div key={post._id}>{post.name} -{'>'} {post.age} <button onClick={()=>editHandler(post)}>Edit</button>  <button onClick={()=>deleteHandler(post)}>Delete</button> </div>):
            <div>No Data</div>

        }
        <Modal isOpen={isModalOpen}>
            <div className="modal-header">header</div>
            <div className="modal-body">
            <form onSubmit={updateHandler}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Age:
                    <input type="text" value={age} onChange={e => setAge(e.target.value)} />
                </label>
                <br />
                <button type="submit">update user</button>
            </form>
            </div>
            <button onClick={()=> setIsModalOpen(false)}>❌</button>
            </Modal>
      

        
    </div>
  )
}