// 生成一个随机数
const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

// 生成一个随机的颜色
const randomColor = (min, max) => {
    let r = randomNum(min, max)
    let g = randomNum(min, max)
    let b = randomNum(min, max)
    return 'rgb(' + r + ',' + g + ',' + b + ')'
}

export const drawCaptcha = (ctx,params) => {
    
    const drawText = (txt, i) => {
        ctx.fillStyle = randomColor(50, 160) // 随机生成字体颜色
        ctx.font = randomNum(params.fontSizeMin, params.fontSizeMax) + 'px SimHei' // 随机生成字体大小
        let x = (i + 1) * (params.contentWidth / (params.identifyCode.length + 1))
        let y = randomNum(params.fontSizeMax, params.contentHeight - 5)
        var deg = randomNum(-30, 30)
        // 修改坐标原点和旋转角度
        ctx.translate(x, y)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(txt, 0, 0)
        // 恢复坐标原点和旋转角度
        ctx.rotate(-deg * Math.PI / 180)
        ctx.translate(-x, -y)
    }

    const drawLine = () => {
        // 绘制干扰线
        for (let i = 0; i < 4; i++) {
            ctx.strokeStyle = randomColor(100, 200)
            ctx.beginPath()
            ctx.moveTo(randomNum(0, params.contentWidth), randomNum(0, params.contentHeight))
            ctx.lineTo(randomNum(0, params.contentWidth), randomNum(0, params.contentHeight))
            ctx.stroke()
        }
    }

    const drawDot = () => {
        // 绘制干扰点
        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = randomColor(0, 255)
            ctx.beginPath()
            ctx.arc(randomNum(0, params.contentWidth), randomNum(0, params.contentHeight), 1, 0, 2 * Math.PI)
            ctx.fill()
        }
    }

    ctx.textBaseline = 'bottom'
    // 绘制背景
    ctx.fillStyle = '#e6ecfd'
    ctx.fillRect(0, 0, params.contentWidth, params.contentHeight)
    // 绘制文字
    for (let i = 0; i < params.identifyCode.length; i++) {
        drawText(params.identifyCode[i], i)
    }
    drawLine()
    drawDot()
}