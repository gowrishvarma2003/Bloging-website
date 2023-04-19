import { useRouter } from "next/router";
import styles from "../styles/app.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function home() {
const router = useRouter();
const [alldata, setdata] = useState(null);
// const [body , setbody]=useState([]);
function upload() {
    router.push("/new_blog");
}

// useEffect(() => {
//     const getdata = async () => {
//         const res = await axios.get("http://localhost:8000/home");
//         const data = res.data;
//         setdata(data);
//         console.log(data);
//     };
//     getdata();
// }, []);

// if (!alldata) {
//     return <div>Loading</div>;
// }

return (
//     <div>
//         <button className={styles.upload} type="submit" onClick={upload}>
//             upload
//         </button>
//         {/* <dev>{alldata}</dev> */}
//         {alldata.map((value) => {
// console.log(value)
//         return <div>{value.title}</div>;
//     })}
//     </div>

    <div>
        <div>
            <div>
                <h1>Blogs</h1>
                <button className={styles.upload} type="submit" onClick={upload}>New Blog</button>
            </div>
            <div>
                <h1>X Blogs</h1>
                <div><button>recent</button><button>liked</button></div>
            </div>
        </div>
    </div>

);
}