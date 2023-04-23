export var checkAccount = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入用户名'))
    }
    if (!(/^[\u4e00-\u9fa5a-zA-Z0-9_]{3,6}$/.test(value))) {
        return callback(new Error('请输入正确的用户名'))
    }
    callback();
}

export var checkPwd = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入密码'))
    }
    if (!(/^\w{3,6}$/.test(value))) {
        return callback(new Error('请输入正确的密码'))
    }
    callback();
}