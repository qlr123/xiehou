<template>
  <div id="app">
    <router-view />
  </div>
</template>


<style>
body,ul,li,dl,dt,dd,p,ol,h1,h2,h3,h4,h5,h6,form,img,table,fieldset,legend,header,main,footer{margin:0; padding:0;}
ul,li,ol{list-style:none;}
img,fieldset{border:0;} 
img{display:block;}
a{text-decoration:none;color:#333;}
h1,h2,h3,h4,h5,h6{font-weight:100;}
body{ font-family:"微软雅黑";}
input,a{outline:none;}
.clean:after{content: "."; display: block; clear: both; height: 0; overflow: hidden; visibility: hidden;}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
