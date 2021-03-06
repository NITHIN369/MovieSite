import axios from "axios";
import DisplayItems from "../displayItems/DisplayItems.js";
import {useEffect,useState} from "react";
import BottomPagination from "./BottomPagination.js";
import Chip from '@mui/material/Chip';
import {Helmet} from "react-helmet"
function Series(){
    const [page,setPage]=useState(1);
    const [data,setdata]=useState([]);
    const [pageCount,setpageCount]=useState(10);
    const [generes,setgeneres]=useState([]);
    const [selectedgeneres,setselectedgeneres]=useState([]);     
    const [video,setVideo]=useState("")
    function urlGenere(selectedgen){
        if(selectedgen.length>0){
        const Ids=selectedgen.map(item=>item.id);
        return Ids.reduce((acc,curr)=>acc+","+curr);
        }
        else return "";
    }
    function fetchseries(){
        axios.get(process.env.REACT_APP_URL+"discover/tv?api_key="+process.env.REACT_APP_KEY+"&page="+page+"&with_genres="+urlGenere(selectedgeneres))
        .then(res=>{setdata(res.data.results);
                    setpageCount(res.data.total_pages)})
        .catch(err=>console.log(err))
    }
    function fetchGeneres(){
        axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_KEY}&`)
        .then(res=>{
            setgeneres(res.data.genres);            
        })
        .catch(err=>console.log("Error+ "+err))
    }
    async function fetchVideo(id,media_type){
        const {data}=await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_KEY}`)
        setVideo(data['results'][0]['key'])
        console.log("video: ",data['results'][0]['key'])
        window.location.href="https://www.youtube.com/watch?v="+data['results'][0]['key']
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
        fetchseries();
        if(pageCount===10){
            fetchGeneres();
        }
    },[page,selectedgeneres])
    return <div><Helmet><title>???????Series</title></Helmet>
    <div className="titleAfterHeader"> <h1>Series</h1></div>
    <div className="genresBox">
    {selectedgeneres && selectedgeneres.map(item=>
        <Chip  key={item.id} clickable color="info" onDelete={()=>handlechipdelete(item)} label={item.name} />
    )}
    {generes && generes.map(item=><Chip key={item.id} clickable onClick={()=>handlechipClick(item)} label={item.name} />)}
     </div>
     <div className="container">
     {data.length>0 ? data.map(item=><DisplayItems key={item.id}
      onClick={()=>{
                     fetchVideo(item.id,"tv")
                     }}
      id={item.id}
      poster={item.poster_path} 
      title={item.title || item.name} 
      date={item.release_date || item.first_air_date}
      media_type={"tv"}
      vote_average={item.vote_average}
      />)
      :
      <h1>Sorry No Movies Found</h1>
      }
      </div>
      {data.length>0 && <BottomPagination countpage={pageCount} pageset={setPage}/>}
 </div>
}
export default Series;