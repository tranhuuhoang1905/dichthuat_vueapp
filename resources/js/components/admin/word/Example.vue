<template>
  <vue3-simple-typeahead id="typeahead_id" placeholder="Start writing..." :items="suggestions" :minInputLength="3"
    :itemProjection="itemProjectionFunction" @selectItem="selectItemEventHandler" @onInput="onInputEventHandler"
    @onFocus="onFocusEventHandler" @onBlur="onBlurEventHandler">
    <template #list-header>
      LIST HEADER
    </template>
    <template #list-item-text="slot" :class="{ 'hidden': true }"><span
        v-html="slot.boldMatchText(slot.itemProjection(slot.item))"></span></template>
    <template #list-footer :class="{ 'hidden': true }">
      LIST FOOTER
    </template>
  </vue3-simple-typeahead>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userInput: '',
      suggestedKeywords: [],
      FormData: {},
      itemProjectionFunction: item => item.word.toUpperCase()
    }
  },
  computed: {
    suggestions() {
      console.log("Check xử lý suggestions", this.userInput);
      return this.suggestedKeywords.filter(keyword =>
        keyword.word.toLowerCase().startsWith(this.userInput.toLowerCase())
      );
    }
  },
  methods: {
    getWord(keyword) {
      console.log("userInput", this.FormData);
      return new Promise((resolve, reject) => {
        axios.post("/api/word/suggestions", { keyword: keyword })
          .then(response => {
            if (response.data.status === 200) {
              console.log("Check suggestions", response.data.data.words);
              this.suggestedKeywords = response.data.data.words;
            }
            resolve();
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
      });
    },
    selectItemEventHandler(item) {
      console.log('Selected item:', item);
      this.FormData.id = item.id;
      this.FormData.word = item.word;
    },
    onInput(value) {
      this.userInput = value
      console.log('onInput Input value:', value)
    },
    onInputEventHandler(value) {
      if (value.input !== this.FormData.word) {
        this.FormData.word = value.input;
      }
      if (value.input.length >= 3) {
        console.log("check value.input.length", value.input.length)
        this.getWord(value.input);
      }
      console.log('onInputEventHandler Input value:', value);
    },
    onFocusEventHandler(value) {
      console.log('onFocusEventHandler Input value:', value)
      // Tiếp tục xử lý tại đây
    },
    onBlurEventHandler(value) {
      console.log('onBlurEventHandler Input value:', value)
    },
  },
}
</script>
