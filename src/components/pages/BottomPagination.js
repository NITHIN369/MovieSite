import Pagination from '@mui/material/Pagination';
function BottomPagination({countpage,pageset}){
    return <Pagination color="primary" count={countpage} onChange={(event,page)=>{
        window.scroll(0,0);
        pageset(page)}}/>
}
export default BottomPagination;