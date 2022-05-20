// import {useEffect,useState} from "react";
// import Chip from '@mui/material/Chip';
// import axios from "axios";
// function Generes({
//     selectedGenres,
//     setSelectedGenres,
//     genres,
//     setGenres,
//     type,
//     setPage
// }){
//     function fetchGeneres(){
//         axios.get(`https:api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
//         .then(res=>setGenres(res.data.genres))
//         .catch(err=>console.log("Error: "+err));
//     }
//     function handlechipClick(gene){
//         setselectedgeneres([...selectedgeneres,gene]);
//         setgeneres(generes.filter(item=>item.id!==gene.id));
//     }
//     function handlechipdelete(gene){
//         setselectedgeneres(selectedgeneres.filter(item=>item.id!==gene.id));
//         setgeneres([...generes,gene]);
//     }
// }
// export default Generes;