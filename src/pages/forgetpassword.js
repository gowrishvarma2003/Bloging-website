import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
import styles from "../styles/app.module.css";
import axios from "axios";
// import { useRouter } from 'next/router'

export default function(){
    const [email,setEmail]=useState("");
    // const [otp , setotp]=useState("");
    const router = useRouter();

    async function send(e) {
      const res= await axios.post("http://localhost:8000/password",{
        email:email,
        // otp:otp
      })
      .then(console.log("success"))
      .catch(err=>console.log("we got error"))

      // console.log(res.data.otpgenerated);
      const generatedotp=res.data.otpgenerated;
      const femail = res.data.useremail;
      console.log(generatedotp,femail);
      if(res.status==200){
        router.push({
          pathname:'/otpverify',
          query:{
            generatedotp,
            email
          }
        })
      }
    }

    return(
        <div className={styles.signup_page}>
            <div className={styles.signup}>
              <div className={styles.signup_background}>
                <h1 className={styles.forgetpassword}>Forget password</h1>
                <div><input className={styles.input}  type="mail" placeholder="Mail" value={email} onChange={e=>setEmail(e.target.value)}></input></div>
                <div> <input className={styles.button} type="submit" placeholder="SignUp" onClick={send}></input> </div>
              </div>
            </div>
    </div>  
    );
}