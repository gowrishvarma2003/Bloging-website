import styles from "../styles/app.module.css";
import React, {useState} from "react";
import axios from "axios";

export default function home(){
    const [title , ubdatetitle] = useState("");
    const [body , ubdatebody] = useState("");

    async function upload(){
        const res = await axios.post("http://localhost:8000/newblog",{
            title,
            body
        })
        .then(console.log("send to server"))
        .catch(err=>console.log(err))
    }

    return(
        <div className={styles.newblog}>
            <div className={styles.blogcontent}>
                <div className={styles.blogtitle}>
                    <h1>Title :</h1>
                    <input type="text" placeholder="Enter the title of the Blog" onChange={e=>ubdatetitle(e.target.value)} value={title} />
                </div>
                <div className={styles.blogbody}>
                    <h1>body :</h1>
                    <textarea onChange={e=>ubdatebody(e.target.value)} value={body}></textarea>
                </div>
                <button onClick={upload} type="submit">upload</button>
            </div>
        </div>
    )
}