function Header(){
    return <div className="header" onClick={()=>{
        console.log("clicked")
        window.scroll(0,0);
    }}>
        🎬Movies Hub🎥
    </div>
}   
export default Header;