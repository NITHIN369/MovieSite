import axios from "axios";
import DisplayItems from "../displayItems/DisplayItems.js";
import {useEffect,useState} from "react";
import BottomPagination from "./BottomPagination.js";
import Chip from '@mui/material/Chip';
function Movies(){
    const [page,setPage]=useState(1);
    const [data,setdata]=useState([]);
    const [pageCount,setpageCount]=useState(10);
    const [generes,setgeneres]=useState([]);
    const [selectedgeneres,setselectedgeneres]=useState([]);
    function urlGenere(selectedgen){
        if(selectedgen.length>0){
        const Ids=selectedgen.map(item=>item.id);
        return Ids.reduce((acc,curr)=>acc+","+curr);
        }
        else return "";
    }
    function fetchmovie(){
        axios.get(process.env.REACT_APP_URL+"discover/movie?api_key="+process.env.REACT_APP_KEY+"&page="+page+"&with_genres="+urlGenere(selectedgeneres))
        .then(res=>{setdata(res.data.results);
                    setpageCount(res.data.total_pages)})
        .catch(err=>console.log(err))
    }
    function fetchGeneres(){
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_KEY}&`)
        .then(res=>{
            setgeneres(res.data.genres);            
        })
        .catch(err=>console.log("Error+ "+err))
    }
    function handlechipClick(gene){        
        setgeneres(generes.filter(item=>item.id!==gene.id));
        setselectedgeneres([...selectedgeneres,gene]);        
    }
    function handlechipdelete(gene){
        setselectedgeneres(selectedgeneres.filter(item=>item.id!==gene.id));
        setgeneres([...generes,gene]);
    }
    useEffect(()=>{
        fetchmovie();
        if(pageCount===10){
            fetchGeneres();
        }
    },[page,selectedgeneres]);
    return <div>
    <div className="titleAfterHeader"> <h1>Movies</h1></div>
    <div className="genresBox">
    {selectedgeneres && selectedgeneres.map(item=>
        <Chip  key={item.id} clickable color="info" onDelete={()=>handlechipdelete(item)} label={item.name} />
    )}
    {generes && generes.map(item=><Chip  key={item.id} clickable onClick={()=>handlechipClick(item)} label={item.name} />)}
     </div>
     <div className="container">
     {data.length>0 ? data.map(item=><DisplayItems key={item.id}
      id={item.id}
      poster={item.poster_path} 
      title={item.title || item.name} 
      date={item.release_date || item.first_air_date}
      media_type={item.media_type}
      vote_average={item.vote_average}
      />)
      :
      <h1>Sorry No Movies Found</h1>
      }
      </div>
      {data.length>0 && <BottomPagination countpage={pageCount} pageset={setPage}/>}
 </div>
}
export default Movies;