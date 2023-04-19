import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'
import styles from "../styles/app.module.css";
import axios from "axios";
// import { useRouter } from 'next/router'

export default function(){
    const [otp , setotp]=useState("");
    const router = useRouter();
    const {query:{generatedotp , email},}=router;
    const props = {
      generatedotp,
      email
    }
    const wegetotp = props.generatedotp;
    const wegetemail = props.email;

    async function send(e) {
      const res= await axios.post("http://localhost:8000/otpverify",{
        otp:otp,
        wegetotp
      })
      .then(console.log("success"))
      .catch(err=>console.log("we got error"))
      
      if(otp == wegetotp){
        router.push({
          pathname:"/resetpassword",
          query:{
            wegetemail
          }
        });

      }
    }

    return(
        <div className={styles.signup_page}>
            <div className={styles.signup}>
              <div className={styles.signup_background}>
                <h1 className={styles.forgetpassword}>Forget password</h1>
                <div><input className={styles.inputotp} id="otp"  type="text" placeholder="enter otp" value={otp} onChange={e=>setotp(e.target.value)}></input></div>
                <div> <input className={styles.button} type="submit" placeholder="SignUp" onClick={send}></input> </div>
              </div>
            </div>
    </div>  
    );
}