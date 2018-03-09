//app.js
let timer;
let numChange=0;
Page({
  data: {
    clickState:true,
    winCount:0,
    resultWorld:'开始吧！',
    changeImgs:'',
    clickImgs:'../img/shitou.png',
    showImg:[
      '../img/bu.png',
      '../img/jiandao.png',
      '../img/shitou.png'
    ]
  },
  onLoad: function (options) {
    this.changeImg();
  },
  changeImg:function(){
    let thisPage=this;
    timer=setInterval(function(){
      if(numChange >= 3) {
        numChange = 0;
      }
      thisPage.setData({ changeImgs: thisPage.data.showImg[numChange] });
      numChange++;
    },300)
  },
  clickImg:function(e){
    if (!this.data.clickState) {
      return;
    }
    //console.log(e.currentTarget);
    this.setData({clickImgs: this.data.showImg[e.currentTarget.id]});
    clearInterval(timer);
    let bu = "../img/bu.png";
    let jiandao ="../img/jiandao.png";
    let shitou ="../img/shitou.png";
    let computerImg = this.data.changeImgs;
    let userImg = this.data.clickImgs;
    // console.log(this.data.winCount);
    if (computerImg == bu && userImg == jiandao) {
      this.resultWorld = '你赢了！'
      this.data.winCount++;
      wx.setStorageSync('winCount', this.data.winCount);
    }
    if (computerImg == bu && userImg == shitou) {
      this.resultWorld = '你输了！'
    }
    if (computerImg == jiandao && this.userImg == bu) {
      this.resultWorld = '你输了！'
    }
    if (computerImg == jiandao && userImg == shitou) {
      this.resultWorld = '你赢了！'
      this.data.winCount++;
      wx.setStorageSync('winCount', this.data.winCount);
    }
    if (computerImg == shitou && userImg == bu) {
      this.resultWorld = '你赢了！'
      this.data.winCount++;
      wx.setStorageSync('winCount',this.data.winCount);
    }
    if (computerImg == shitou && userImg == jiandao) {
      this.resultWorld = '你输了！'
    }
    if (computerImg == shitou) {
      this.resultWorld = '平局！'
    }
    this.setData({ 
      resultWorld: this.resultWorld, 
      winCount:this.data.winCount,
      clickState: false
    });
  },
  again:function(){
    if(this.data.clickState){
      return;
    }
    this.changeImg();
    this.setData({
      clickState:true,
      winCount: 0,
      changeImgs: '',
      clickImgs: '../img/shitou.png',
    })
  }
})