<template>
<div class="chat-text v-full-container">
    <div class="chat-action"><span class="el-icon-document"></span><span class="el-icon-picture-outline"></span></div>
    <textarea class="full-element" placeholder="按 Ctrl + Enter 发送" v-model="content" @keyup="onKeyup"></textarea>
    <div style="text-align: right;"><el-button type="primary" style="margin: 0px 20px 10px 0px;" size="mini">发送</el-button></div>
</div>
</template>
<script>
export default {
    data () {
        return {
            content: ''
        };
    },
    methods: {
        onKeyup (e) {
            if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                // this.sendMessage(this.content);
                this.content = '';
            }
        }
    }
};
</script>

<style scoped>
.chat-text {
    border-top: solid 1px #ddd;
}
.chat-action {
    text-align: left;
}
.chat-action span{
    display: inline-block;
    width: 20px;
    height: 20px;
    padding: 10px 0px 10px 15px;
    margin: 0 auto;
    font-size: 20px;
}
.chat-text textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
}
</style>