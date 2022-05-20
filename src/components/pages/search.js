import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from 'react';
import axios from "axios";
import DisplayItems from "../displayItems/DisplayItems.js";
import BottomPagination from "./BottomPagination.js";
function Search(){
    const [value,setvalue]=useState(0);
    const [text,setText]=useState("");
    const [data,setData]=useState([]);
    const [pagecount,setPagecount]=useState(10);
    const [page,setPage]=useState(1);
    function getQuery(){
        if(text.length>0){
            return '&query='+text;
        }else return "";
    }
    function fetchMovies(){
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}${getQuery()}&page=${page}`)
        .then(res=>{
            setPagecount(res.data.total_pages);
            setData(res.data.results);
        })
        .catch(err=>console.log(err));
    }
    function fetchSeries(){
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_KEY}${getQuery()}&page=${page}`)
        .then(res=>{
            setPagecount(res.data.total_pages);
            setData(res.data.results);
        })
        .catch(err=>console.log(err));
    }
    function onChangeHandler(e){
        setText(e.target.value);
    }
    function clickHandler(){
        if(value==0){
            fetchMovies();
        }else{
            fetchSeries();
        }
    }
    function handleChange(event,newvalue){
        setvalue(newvalue);
        setData([])
    }
    useEffect(()=>{
        if(value==0 && text.length>0){
            fetchMovies();
        }else if(value==1 && text.length>0){
            fetchSeries();
        }
    },[value,page])
    return <div>
    <div className="searchBox">
    <TextField  variant="filled" onChange={onChangeHandler} label="Search" />
    <Button variant="contained" onClick={clickHandler}><SearchIcon /></Button>
    </div>
    <Tabs value={value} onChange={handleChange} centered>
        <Tab style={{width:"50%"}} label="Movies" />
        <Tab style={{width:"50%"}} label="TV Series" />
    </Tabs>
    <div className="container searchContainer">
     {data.length>0 ? data.map(item=><DisplayItems key={item.id}
      id={item.id}
      poster={item.poster_path} 
      title={item.title || item.name} 
      date={item.release_date || item.first_air_date}
      media_type={value===0?"Movies":"tv"}
      vote_average={item.vote_average}
      />)
      :
      <h1>Sorry No Movies Found</h1>
      }
      </div>
      {data.length>0 && <BottomPagination countpage={pagecount} pageset={setPage}/>}
    </div>
}
export default Search;