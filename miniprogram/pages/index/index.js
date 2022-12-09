Page({
  data: {
    //开场动画属性
    text: "你好！我是小圆,很高兴认识你！",
    canvas: "",
    ctx: "",
    width: "",
    height: "",
    rpx2px: "",
    list: [],
    intervalCancel: "",
    showLogo: true,
    logo: "",
    count: 0,
    logoCount: 0,
    state: "paused",
    end: "",
    // 导航属性
    nbTitle: "元岛",
    nbLoading: false,
    nbFrontColor: "#ffffff",
    nbBackgroundColor: "#000000",
    // 消息属性
    msgList: [
      {
        title: "章节1已经批改章节1已经批改章节1已经批改章节1已经批改",
        time: "12-02 11:22",
      },
      {
        title: "章节1已经批改章节1已经批改章节1已经批改章节1已经批改",
        time: "12-02 11:22",
      },
      {
        title: "章节1已经批改章节1已经批改章节1已经批改章节1已经批改",
        time: "12-02 11:22",
      },
    ],
    showRemind: true,
    //课程
    course: {
      title: "一期学会写小程序",
      content:
        "编程是非常看重实践的编程是非常看重实践的编程是非常看重实践的编程是非常看重实践的编程是非常看重实践的",
      award: { level: "1", gold: "1", score: "500" },
    },
    groupList: [
      { title: "社区支持", url: "" },
      { title: "路线进程", url: "" },
      { title: "总排行版", url: "" },
      { title: "申请学金", url: "" },
      { title: "事物讨论", url: "" },
      { title: "招聘就业", url: "" },
      { title: "创建小组", url: "/pages/form/form" },
      { title: "加入小组", url: "" },
      { title: "我的小组", url: "" },
    ],
  },
  onReady() {
    const that = this.data;
    const query = wx.createSelectorQuery();
    query
      .select("#myCanvas")
      .fields({ node: true, size: true })
      .exec(res => {
        const canvas = res[0].node;
        const ctx = canvas.getContext("2d");
        that.ctx = ctx;
        that.canvas = canvas;
        const dpr = wx.getSystemInfoSync().pixelRatio;
        this.setData({
          width: wx.getSystemInfoSync().windowWidth,
          height: wx.getSystemInfoSync().windowHeight,
          rpx2px: wx.getSystemInfoSync().windowWidth / 750,
        });
        canvas.width = that.width * dpr;
        canvas.height = that.height * dpr;
        ctx.scale(dpr, dpr);
        //加载图片
        const logo = canvas.createImage();
        logo.src = "/images/midlogo.png";
        that.logo = logo;
        that.list = new Array(Math.floor(that.width / (that.rpx2px * 35))).fill(
          0
        );
        // that.intervalCancel = setInterval(() => this.animation(), 60);
      });
  },
  animation() {
    const that = this.data;
    const canvas = that.canvas;
    const ctx = that.ctx;
    that.count += 1;
    if (that.count >= 60) {
      if (that.logoCount <= 80) {
        this.drawLogo(canvas);
        if (this.data.nbBackgroundColor == "#000000") {
          this.setData({
            nbBackgroundColor: "#8ba3c7",
          });
        }
        this.data.logoCount++;
      } else {
        setTimeout(() => {
          this.setData({
            showLogo: true,
          });
          clearInterval(that.intervalCancel);
        });
      }
    } else {
      this.drawCodeRain(canvas, 35 * this.data.rpx2px);
    }
  },

  //logo
  drawLogo(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const scaleSize = this.data.logoCount / 80;
    const imgW = 5 * 35 * this.data.rpx2px;
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.data.width / 2, this.data.height / 2);
    ctx.scale(scaleSize, scaleSize);
    ctx.arc(0, 0, imgW / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(this.data.logo, -imgW / 2, -imgW / 2, imgW, imgW);
    ctx.restore();
  },
  //代码雨
  drawCodeRain(canvas, fontSize) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(0,0,0,0.03)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px arial";
    this.data.list.forEach((value, index, array) => {
      if (value * fontSize >= this.data.height || Math.random() > 0.95) {
        array[index] = 0;
      } else {
        array[index]++;
      }
      ctx.fillText(
        Math.floor(Math.random() * 10),
        fontSize * index,
        fontSize * value
      );
    });
  },
  logoBackTop() {
    this.setData({
      state: "running",
      text: "",
    });
  },
  turnEnd() {
    this.setData({
      text: "",
      end: "end",
    });
  },
  overEnd() {
    if (this.data.state == "running") return;
    this.setData({
      text: "点我,进入新世界",
    });
  },
  closeRemind() {
    this.setData({
      showRemind: false,
    });
  },
});
