<template>
    <div id="myself-box">
        123
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        
    },
    beforeCreate(){
        this.$store.commit('lefttitle','返回')//定义导航左侧名字
        this.$store.commit('righttitle','')//定义导航右侧按钮名字，没功能可以为空
        this.$store.commit('changeTitle','个人中心')//定义导航中间名字
        this.$store.commit('footercheck','myself')//底部按钮锁定，名字为路由跳转名字
    }
}
</script>
<style scoped>

</style>
