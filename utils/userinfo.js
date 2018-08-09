
function getuserinfo(){
  var info = wx.getStorageSync('info')
    if(null==info){
      wx.getUserInfo({
        
      })
    }else{

    }
}