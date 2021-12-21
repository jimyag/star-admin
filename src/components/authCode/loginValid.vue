<template>
  <div class="s-canvas">
    <canvas
      id="s-canvas"
      :width="contentWidth"
      :height="contentHeight"
    ></canvas>
  </div>
</template>
<script>
import { drawCaptcha } from "./captcha_generator";

export default {
  name: "SIdentify",
  props: {
    identifyCode: {
      // 默认注册码
      type: String,
      default: "1234",
    },
    fontSizeMin: {
      // 字体最小值
      type: Number,
      default: 25,
    },
    fontSizeMax: {
      // 字体最大值
      type: Number,
      default: 35,
    },
    backgroundColorMin: {
      // 验证码图片背景色最小值
      type: Number,
      default: 200,
    },
    backgroundColorMax: {
      // 验证码图片背景色最大值
      type: Number,
      default: 220,
    },
    dotColorMin: {
      // 背景干扰点最小值
      type: Number,
      default: 60,
    },
    dotColorMax: {
      // 背景干扰点最大值
      type: Number,
      default: 120,
    },
    contentWidth: {
      // 容器宽度
      type: Number,
      default: 90,
    },
    contentHeight: {
      // 容器高度
      type: Number,
      default: 38,
    },
  },
  methods: {
    drawPic() {
      let canvas = document.getElementById("s-canvas");
      let ctx = canvas.getContext("2d");
      drawCaptcha(ctx, {
        identifyCode: this.identifyCode,
        fontSizeMin: this.fontSizeMin,
        fontSizeMax: this.fontSizeMax,
        backgroundColorMin: this.backgroundColorMin,
        backgroundColorMax: this.backgroundColorMax,
        dotColorMin: this.dotColorMin,
        dotColorMax: this.dotColorMax,
        contentWidth: this.contentWidth,
        contentHeight: this.contentHeight,
      });
    },
  },
  watch: {
    identifyCode() {
      this.drawPic();
    },
  },
  mounted() {
    this.drawPic();
  },
};
</script>
