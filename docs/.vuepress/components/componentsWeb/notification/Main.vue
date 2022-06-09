<template>
<div class="notification-container" :style="`width:${width}px;height:${height}px;background:${backgroundColor}`">
    <div ref="information" class="notification-information" :style="`transform:translateX(${translateX}px);`">{{information}}</div>
</div>
</template>

<script>
export default {
    name: "yyNotification",
    props: {
        width: {
            type: Number,
            default: 376
        },
        height: {
            type: Number,
            default: 30
        },
        backgroundColor: {
            type: String,
            default: "#02173D"
        },
        informations:{
            type: Array,
            default(){
                return []
            }
        }
    },
    computed: {

    },
    data() {
        return {
            timer: 0,
            translateX:376,
            information: "",
        }
    },
    watch: {
        width:{
            handler(){
                this.translateX = this.width
            },
            immediate:true
        },
        informations:{
            handler(){
                if(!this.informations.length) return
                if(this.timer) {
                    clearInterval(this.timer)
                    this.timer = 0
                }
                this.translateX = this.width
                let i = -1;
                this.information = this.informations[++i]
                this.$nextTick(() => {
                    this.offsetWidth = this.$refs['information'].offsetWidth
                })
                this.timer = setInterval(() => {
                    if (this.translateX < -this.offsetWidth) {
                        if (i >= this.informations.length - 1) {
                            i = -1
                        }
                        this.information = this.informations[++i]
                        this.translateX = this.width
                        this.$nextTick(() => {
                            this.offsetWidth = this.$refs['information'].offsetWidth
                        })
                    }
                    this.translateX -= 2
                }, 100)
            },
            immediate:true
        }
    },
    beforeDestroy(){
        if(this.timer) {
            clearInterval(this.timer)
            this.timer = 0
        }
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
.notification-container {
    display: flex;
    align-items: center;
    overflow: hidden;

    .notification-information {
        color: #ffffff;
        white-space: nowrap;
    }
}
</style>
