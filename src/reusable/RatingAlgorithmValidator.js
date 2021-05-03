import { isEmpty, isNumeric, isInt } from 'validator';

const RatingAlgorithmValidator = (userInput) => {
    const errors = {};

    //minimum rating count
    if (userInput.minimum_rating_count != null) {
        const unparsedMinimumRatingCount = userInput.minimum_rating_count.toString();
        const parsedMinimumRatingCount = parseInt(userInput.minimum_rating_count);
        if (isEmpty(unparsedMinimumRatingCount)) {
            errors.minimum_rating_count = "Giá trị (m) là bắt buộc!"
        } else if (!isNumeric(unparsedMinimumRatingCount) || !isInt(unparsedMinimumRatingCount)) {
            errors.minimum_rating_count = "Giá trị (m) phải là số nguyên!"
        } else if (parsedMinimumRatingCount < 1 || parsedMinimumRatingCount > 1000) {
            errors.minimum_rating_count = "Giá trị (m) chỉ chấp nhận giá trị từ 1 - 1000!"
        }
    }

    return errors;
}

export default RatingAlgorithmValidator