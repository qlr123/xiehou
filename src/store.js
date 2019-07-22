import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userID:'', //用户id
    email:'',//用户email
    title:'', //头部标题
    leftTitle:'',//左侧按钮名
    rightTitle:'',//右侧按钮名
    fcheck:'' ,//底部导航点击绑定的

    //zpy的state数据start
    selfInfo:null,// 发布自己的信息
    favoredType:null,//发布心意对象的信息
    //end
  },
  mutations: {
    adduserID(state,value)//修改id
    {
      state.userID=value
    },
    addEmail(state,value)//修改id
    {
      state.email=value
    },
    changeTitle(state,value)//改变标题
    {
      state.title = value
    },
    footercheck(state,value)//底部按钮确定
    {
      state.fcheck = value
    },
    lefttitle(state,value)//改左按钮名
    {
      state.leftTitle = value
    },
    righttitle(state,value)//改右按钮名
    {
      state.rightTitle = value
    }
  },
  actions: {

  }
})
