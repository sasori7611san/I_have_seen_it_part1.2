<template>
    <div class="choice">
        <button id="buttonRed" v-on:click="choiceColor(2);"></button>
        <button id="buttonGreen" v-on:click="choiceColor(3);"></button>
        <button id="buttonWhite" v-on:click="choiceColor(4);"></button>
        <button id="buttonBlue" v-on:click="choiceColor(5);"></button><br />
        <button id="buttonYellow" v-on:click="choiceColor(1);"></button>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },
})
</script>
