import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
import styles from "../styles/app.module.css";
import axios from "axios";
// import { useRouter } from 'next/router'

export default function(){
    const [email,setEmail]=useState("");
    const [password , setPassword]=useState("");
    const router = useRouter();

    async function send(e) {
      const res= await axios.post("http://localhost:8000/login",{
        email:email,
        password:password,
      })
      .then(console.log("success"))
      .catch(err=>console.log(err))

      if(res.status==200){
        router.push("/home");
      }
    }

    return(
        <div className={styles.signup_page}>
            <div className={styles.signup}>
              <div className={styles.signup_background}>
                <h1>Log In</h1>
                <p>To interact with your account</p>
                <div><input className={styles.input} type="mail" placeholder="Mail" value={email} onChange={e=>setEmail(e.target.value)}></input></div>
                <div><input className={styles.input} type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}></input></div>
                <div> <input className={styles.button} type="submit" placeholder="SignUp" onClick={send}></input> </div>
                <h2 className={styles.password}><a href="/forgetpassword">forget password</a></h2>
              <h2>if you already had an account <span> <a href="/">Sign Up</a></span></h2>
              </div>
            </div>
    </div>  
    );
}