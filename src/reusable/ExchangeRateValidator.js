import { isEmpty, isNumeric, isDecimal } from 'validator';

const ExchangeRateValidator = (userInput) => {
    const errors = {};

    //rate
    if (userInput.rate != null) {
        const unparsedRate = userInput.rate.toString();
        const parsedRate = parseFloat(userInput.rate);
        if (isEmpty(unparsedRate)) {
            errors.rate = "Tỉ lệ Chiết Khấu là bắt buộc!"
        } else if (!isDecimal(unparsedRate) || !isNumeric(unparsedRate)) {
            errors.rate = "Tỉ lệ Chiết Khấu chỉ nhận giá trị số thập phân!"
        } else if (parsedRate < 0 || parsedRate > 1) {
            errors.rate = "Tỉ lệ Chiết Khấu chỉ nhận giá trị lớn hơn 0 và nhỏ hơn 1!"
        } else if (unparsedRate.length > 4) {
            errors.rate = "Tỉ lệ Chiết Khấu chỉ nhận đến giá trị thập phân thứ hai!"
        }

    }

    return errors;
}

export default ExchangeRateValidator