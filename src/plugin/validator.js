const validatePassword = [
    {required: true, min: 10, max: 20, message: "密码在10-20位", trigger: "blur"},
    {
        required: true,
        pattern: /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{10,16}/,
        message: "密码必须由数字、字母、特殊字符组合",
        trigger: "blur"
    }]
const validateUsername = [
    {required: true, pattern: /[0-9A-Za-z]$/, message: "用户名只能由数字字母构成", trigger: "blur"},
    {required: true, trigger: 'blur', message: "请输入用户名"},
    {min: 4, max: 20, trigger: "blur", message: "用户名必须在4-20位"}
]

const validateEmail = [
    {
        required: true,
        pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        trigger: "blur",
        message: "邮箱格式不合法"
    }
]
export {validatePassword, validateUsername, validateEmail}
