import React, {useState} from "react";
import styles from "../styles/app.module.css";
import axios from "axios";
import { useRouter } from 'next/router'
// import { render } from "express/lib/response";

// import { config } from '@fortawesome/fontawesome-svg-core'
// import '@fortawesome/fontawesome-svg-core/styles.css'
// config.autoAddCss = false
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFaceRelieved } from '@fortawesome/pro-solid-svg-icons'

export default function index(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password , setPassword]=useState("");
    const router = useRouter();
    
    async function send(e) {
      const res = await axios.post("http://localhost:8000",{
        name:name,
        email:email,
        password:password
      })
      .then(console.log("Sent to server succesfully"))
      .catch((err)=>console.log(err));

      if(res.status==200){
        router.push("/login");
      }
    }

    return(
        <div className={styles.signup_page}>
            <div className={styles.signup}>
              <div className={styles.signup_background}>
                <h1>Sign Up</h1>
                <p>To interact with your account</p>
                <div><input className={styles.input} type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}></input></div>
                <div><input className={styles.input} type="mail" placeholder="Mail" value={email} onChange={e=>setEmail(e.target.value)}></input></div>
                <div><input className={styles.input} type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}></input></div>
                <div> <input className={styles.button} type="submit" placeholder="SignUp" onClick={send}></input> </div>
                <h2>if you already had an account <span> <a href="/login">Log In</a></span></h2>
                <div><button href="/auth/google" className={styles.oauth}>sign up with google</button></div>
                {/* <FontAwesomeIcon icon={faFaceRelieved} /> */}
              </div>
            </div>
    </div>
    );
}