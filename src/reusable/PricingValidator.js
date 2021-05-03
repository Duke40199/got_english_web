import { isEmpty, isNumeric, isInt } from 'validator';

const PricingValidator = (userInput) => {
    const errors = {};

    //quantity
    if (userInput.quantity != null) {
        const unparsedQuantity = userInput.quantity.toString();
        const parsedQuantity = parseInt(userInput.quantity);
        if (isEmpty(unparsedQuantity)) {
            errors.quantity = "Thời lượng là bắt buộc!"
        } else if (!isInt(unparsedQuantity) || !isNumeric(unparsedQuantity)) {
            errors.quantity = "Thời lượng chỉ nhận giá trị số nguyên!"
        } else if (parsedQuantity < 0 || parsedQuantity > 1000000) {
            errors.quantity = "Thời lượng chỉ nhận giá trị lớn hơn 0 và nhỏ hơn 1000000!"
        }
    }
    //price
    if (userInput.price != null) {
        const unparsedPrice = userInput.price.toString();
        const parsedPrice = parseInt(userInput.price);
        if (isEmpty(unparsedPrice)) {
            errors.price = "Đơn giá là bắt buộc!"
        } else if (!isInt(unparsedPrice) || !isNumeric(unparsedPrice)) {
            errors.price = "Đơn giá chỉ nhận giá trị số nguyên!"
        } else if (parsedPrice < 0 || parsedPrice > 1000000) {
            errors.price = "Đơn giá chỉ nhận giá trị lớn hơn 0 và nhỏ hơn 1000000!"
        }
    }

    return errors;
}

export default PricingValidator