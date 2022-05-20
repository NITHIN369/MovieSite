import {img_300} from "../config/config.js";
import Badge from '@mui/material/Badge';
import {unavailable} from "../config/config.js";
import {useEffect, useState} from "react";
function DisplayItems({id,poster,title,date,media_type,onClick,vote_average}){
    return <div onClick={onClick} className="item" key={id}>
        <Badge badgeContent={vote_average} color="secondary">
        <img src={poster ? `${img_300}/${poster}` : `${unavailable}`} alt={title}/> </Badge>
        <b>{title}</b>
      <div className="dateType"> <p className="type">{media_type==="tv"?"TV Series":"Movies"}</p>
        <p className="date">{date}</p></div>
    </div>
}
export default DisplayItems;