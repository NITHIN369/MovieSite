import axios from "axios";
import DisplayItems from "../displayItems/DisplayItems.js";
import {useEffect,useState} from "react";
import BottomPagination from "./BottomPagination.js";
import Modal from "../modal/Modal.js";
function HomePage(){
    const [page,setPage]=useState(1);
    const [data,setdata]=useState([]);
    const [pageCount,setpageCount]=useState(10);
    const [modalOpen,setmodalOpen]=useState("closed");  
    const [moddata,setmoddata]=useState({});  
    function getMoviedata(id,media_type){
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_KEY}`)
        .then(da=>{setmoddata(da.data);console.log(da)})
        .catch(err=>{
            if(err){
                setmoddata(err)
                console.log(err)
            }
        })
    }
    useEffect(()=>{
        function fetchtrend(){
            axios.get(process.env.REACT_APP_URL+"trending/all/week?api_key="+process.env.REACT_APP_KEY+"&page="+page)
            .then(res=>{setdata(res.data.results);
                        setpageCount(res.data.total_pages)})
            .catch(err=>console.log("Some error: "+err))
        }
        fetchtrend();        
    },[page])
    return <div>
               <div className="titleAfterHeader"> <h1>Trending</h1></div>
               
                <div className="container">
                {data && data.map(item=>{
                    return (
                <DisplayItems key={item.id}
                 id={item.id} onClick={()=>{
                     setmodalOpen("opened");
                     getMoviedata(item.id,item.media_type)
                     }}
                 poster={item.poster_path} 
                 title={item.title || item.name} 
                 date={item.release_date || item.first_air_date}
                 media_type={item.media_type}
                 vote_average={item.vote_average}
                 />
                 
                )
                 })}
                 </div>
                 <BottomPagination countpage={pageCount} pageset={setPage}/>
                 {moddata && (modalOpen=='opened') && <Modal dat={moddata} setopenclick={setmodalOpen} />}
            </div>
}
export default HomePage;