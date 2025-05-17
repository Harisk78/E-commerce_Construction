import { useState } from 'react';
import './Headerstyle.css';
function Header(){
    let arr = ["Hi","Hello","Welcome","Vanakkam"];
    const [value,setValue] = useState(arr[0]);
    return(
        <div>
            <p>{value} Hari</p>
            <button onClick={()=>{setValue(arr[Math.floor(Math.random() * arr.length)])}}>Click For Greeting</button>
        </div>
    )
}

export default Header;