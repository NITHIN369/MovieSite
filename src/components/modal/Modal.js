import {img_300} from "../config/config.js";
import {unavailable} from "../config/config.js";
import axios from "axios";
import {useEffect,useState} from "react"
function Modal({setopenclick,dat}){
    return <div className="modalBackground">
            <div className="modalcontianer">
                <button className="modalclose" onClick={()=>setopenclick("closed")}>X</button>
                <img src={dat.poster_path ? `${img_300}/${dat.poster_path}` : `${unavailable}`} alt={dat.original_title}/>
                <h1>{dat['original_title'] || dat['name']}</h1>
               {dat['genres'] &&  <h3>Genres: {dat['genres'].map(it=>it['name']+"   ")}</h3> }
            </div>
           </div>
}
export default Modal;