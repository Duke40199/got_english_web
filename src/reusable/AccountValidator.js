import { isEmail, isEmpty, isMobilePhone } from 'validator';

const AccountValidator = (userInput) => {
    const errors = {};

    //fullname
    if (userInput.fullname != null) {
        if (userInput.fullname.length > 30) {
            errors.fullname = "Họ và tên không được quá 30 ký tự!"
        }
    }
    //username
    if (userInput.username != null) {
        if (isEmpty(userInput.username.toString())) {
            errors.username = "Tên tài khoản là bắt buộc!"
        } else if (userInput.username.length > 30 || userInput.username.length < 6) {
            errors.username = "Tên tài khoản phải có từ 6 - 30 ký tự!"
        }
    }
    //password
    if (userInput.password != null) {
        if (isEmpty(userInput.password.toString())) {
            errors.password = "Mật khẩu là bắt buộc!"
        } else if (userInput.password.length > 12 || userInput.password.length < 6) {
            errors.password = "Mật khẩu phải có từ 6 - 12 ký tự!"
        }
    }
    //email
    if (userInput.email != null) {
        if (isEmpty(userInput.email.toString())) {
            errors.email = "Email là bắt buộc!"
        } else if (!isEmail(userInput.email.toString())) {
            errors.email = "Sai định dạng Email!"
        }
    }
    //birthday
    //address
    if (userInput.address != null) {
        if (userInput.address.length > 55) {
            errors.address = "Địa chỉ không được quá 55 ký tự!"
        }
    }
    //phone
    if (userInput.phone_number != null) {
        if (!isMobilePhone(userInput.phone_number.toString(), 'vi-VN') && !isEmpty(userInput.phone_number.toString())) {
            errors.phone_number = "Sai định dạng số điện thoại hoặc có đầu số lạ!"
        }
    }

    return errors;
}

export default AccountValidator