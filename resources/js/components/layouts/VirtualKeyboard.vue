<template>
    <div>
        <input v-model="input" />
        <div ref="keyboard"></div>
    </div>
</template>
  
<script>
import Keyboard from "simple-keyboard";

export default {
    data() {
        return {
            input: ""
        };
    },
    mounted() {
        this.keyboard = new Keyboard(this.$refs.keyboard, {
            layout: {
                default: [
                    "1 2 3 4 5 6 7 8 9 0 {bksp}",
                    "q w e r t y u i o p",
                    "a s d f g h j k l",
                    "{shift} z x c v b n m , . {shift}",
                    "{numbers} {lang} {space} {enter}"
                ],
                chinese: [
                    "， 。 、 · ！ ？ ： ； “ ” ‘ ’ （ ） 【 】 {bksp}",
                    "1 2 3 4 5 6 7 8 9 0",
                    "我 你 他 她 它 们 那 些",
                    "啊 哦 哇 呢 呀 呦 吧",
                    "{shift} 了 吗 的 得 还 不 在 就",
                    "{numbers} {lang} {space} {enter}"
                ]
            },
            display: {
                "{bksp}": "⌫",
                "{enter}": "Enter",
                "{shift}": "Shift",
                "{space}": " ",
                "{numbers}": "123"
            },
            theme: "hg-theme-default hg-layout-default",
            onChange: input => {
                this.input = input;
            }
        });
    }
};
</script>
  