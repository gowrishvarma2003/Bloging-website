import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import styles from "../styles/app.module.css";
import axios from "axios";

export default function () {
    const router=useRouter();
    const [newpassword, setPassword] = useState("");
    const {query:{wegetemail}}=router;
    const props = {
        wegetemail
    }

    const email = props.wegetemail;

    async function send(e) {
        const res = await axios.post("http://localhost:8000/resetpassword", {
            newpassword,
            email
        })
        .then(console.log("success"))
        .catch(err => console.log("we got error"))
        
        if(res.status==200){
            router.push("/login");
        }
    }

    return (
        <div className={styles.signup_page}>
            <div className={styles.signup}>
                <div className={styles.signup_background}>
                    <h1 className={styles.forgetpassword}>enter new password</h1>
                    <div><input className={styles.inputotp} id="otp" type="text" placeholder="enter new password" onChange={e => setPassword(e.target.value)}></input></div>
                    <div> <input className={styles.button} type="submit" placeholder="SignUp" onClick={send}></input> </div>
                </div>
            </div>
        </div>
    );
}