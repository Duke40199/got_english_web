import { isEmpty, isNumeric } from 'validator';

const CoinBundleValidator = (userInput) => {
    const errors = {};

    //title
    if (userInput.title != null) {
        if (userInput.title.length > 30) {
            errors.title = "Tên Gói không được quá 30 ký tự!"
        } else if (isEmpty(userInput.title.toString())) {
            errors.title = "Tên Gói là bắt buộc!"
        }
    }
    //description
    if (userInput.description != null) {
        if (userInput.description.length > 55) {
            errors.description = "Nội dung Gói không được quá 55 ký tự!"
        }
    }
    //quantity
    if (userInput.quantity != null) {
        const unparsedQuantity = userInput.quantity.toString();
        const parsedQuantity = parseInt(userInput.quantity);
        if (isEmpty(unparsedQuantity)) {
            errors.quantity = "Số lượng Coin là bắt buộc!"
        } else if (!isNumeric(unparsedQuantity)) {
            errors.quantity = "Số lượng Coin chỉ nhận giá trị số!"
        } else if (parsedQuantity < 1 || parsedQuantity > 1000) {
            errors.quantity = "Số lượng Coin chỉ được nằm trong khoảng 1 đến 1000!"
        }
    }

    return errors;
}

export default CoinBundleValidator