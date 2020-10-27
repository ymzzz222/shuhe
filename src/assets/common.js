const baseurl = (url)=>{
  if(url != undefined && url.indexOf('http') != 0){
    return JSON.parse(localStorage.getItem("userInfo")).baseImgUrl + url
  }else{
    return url
  }
}
export default baseurl