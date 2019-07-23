<template>
    <div>
        <van-tabs v-model="active">
        <van-tab title="我看过的">

        </van-tab>
        <van-tab title="看过我的">

        </van-tab>
        </van-tabs>

    </div>
</template>
<script>
export default {
    data() {
        return {
            active: 2
        };
    },
    beforeCreate(){
        this.$store.commit('lefttitle','返回')//定义导航左侧名字a
        this.$store.commit('righttitle','')//定义导航右侧按钮名字，没功能可以为空
        this.$store.commit('changeTitle','我的缘分')//定义导航中间名字
        this.$store.commit('footercheck','myself')//底部按钮锁定，名字为路由跳转名字
    }
}
</script>
<style scoped>

</style>
