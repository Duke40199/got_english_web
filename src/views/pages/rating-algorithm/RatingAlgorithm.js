import React, { useState, useEffect } from 'react'

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CCardHeader,
    CButton,
    CForm,
    CLabel,
    CInput,
    CCardFooter,
    CModal,
    CModalFooter,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CAlert,
    CInvalidFeedback
} from '@coreui/react'

import { GetRatingAlgorithmAPI, UpdateRatingAlgorithmAPI } from '../../../api/rating-algorithm'

import RatingAlgorithmValidator from '../../../reusable/RatingAlgorithmValidator'

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

const RatingAlgorithm = () => {
    const [averageAllExpertsRating, setAverageAllExpertsRating] = useState("");
    const [updateMinimumRatingCount, setUpdateMinimumRatingCount] = useState("");
    const [fieldErrorMessages, setFieldErrorMessages] = useState({});
    const [updateSubmitModalShow, setUpdateSubmitModalShow] = useState(false);
    const [updateMessage, setUpdateMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    //this useEffect will be executed every time the modal show
    useEffect(() => {
        async function fetchData() {
            const ratingAlgorithmInfo = await trackPromise(GetRatingAlgorithmAPI());
            if (ratingAlgorithmInfo != null) {
                setUpdateMinimumRatingCount(ratingAlgorithmInfo.minimum_rating_count);
                setAverageAllExpertsRating(ratingAlgorithmInfo.average_all_experts_rating);
            }
        }
        fetchData();
    }, []);

    const onSubmitUpdateForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "minimum_rating_count": updateMinimumRatingCount,
        }

        const formValidate = RatingAlgorithmValidator(userInput);
        const noErrors = Object.keys(formValidate).length === 0;

        if (noErrors) {
            const updateRatingAlgorithmData = {
                "minimum_rating_count": parseInt(updateMinimumRatingCount)
            }

            const updateRatingAlgorithmResult = await trackPromise(UpdateRatingAlgorithmAPI(updateRatingAlgorithmData));

            if (updateRatingAlgorithmResult === true) {
                setUpdateMessage(<CAlert color="success">Cập nhật thành công!</CAlert>);
            } else {
                setUpdateMessage(<CAlert color="danger">{updateRatingAlgorithmResult}</CAlert>);
            }
            //clear errors if any
            setUpdateSubmitModalShow(false);
            setFieldErrorMessages({});
        } else {
            setUpdateSubmitModalShow(false);
            setFieldErrorMessages(formValidate);
            setUpdateMessage(null);
        }
    }

    //check permission
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const canManageRatingAlgorithm = userInfo.moderator_details.can_manage_rating_algorithm;
    if (canManageRatingAlgorithm) {
        return (
            <CCol>
                {updateMessage}
                <CCard>
                    <CCardHeader>
                        <strong>Công thức:</strong>
                        <p>W = v * 1 / (v + m) * R + m * 1 / (v + m) * C</p>
                        <i>Trong đó:</i><br />
                        <i>W = Đánh giá Chuyên Gia có trọng số</i><br />
                        <i>v = Số lượt được Đánh giá của Chuyên Gia</i><br />
                        <i>R = Trung bình Đánh giá của Chuyên Gia</i><br />
                    </CCardHeader>
                    <CCardBody>
                        <CForm onSubmit={onSubmitUpdateForm} method="post" encType="multipart/form-data" className="form-horizontal">
                            <CRow>
                                <CCol md="4">
                                    <CLabel htmlFor="update-minimum-rating-count">Trung bình Đánh Giá của Chuyên Gia trên toàn hệ thống (C):</CLabel>
                                </CCol>
                                <CCol xs="12" md="8">
                                    <p>{averageAllExpertsRating}</p>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md="4">
                                    <CLabel htmlFor="update-minimum-rating-count">Số lượt Đánh Giá nhỏ nhất mà Chuyên Gia cần đạt (m):</CLabel>
                                </CCol>
                                <CCol xs="12" md="8">
                                    <CInput
                                        className="w-25"
                                        type="number"
                                        id="update-minimum-rating-count" name="minimum-rating-count" value={updateMinimumRatingCount} onChange={({ target }) => setUpdateMinimumRatingCount(target.value)} />
                                    {fieldErrorMessages.minimum_rating_count != null ? <CInvalidFeedback
                                        className="d-block"
                                    >
                                        {fieldErrorMessages.minimum_rating_count}
                                    </CInvalidFeedback>
                                        : null}
                                </CCol>
                            </CRow>
                            <CModal
                                show={updateSubmitModalShow}
                                onClose={() => setUpdateSubmitModalShow(false)}
                                closeOnBackdrop={false}
                                color="success"
                            >
                                <CModalHeader closeButton>
                                    <CModalTitle>Xác nhận</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    Thay đổi này sẽ ảnh hưởng lên toàn bộ hệ thống. Bạn có đồng ý không?
                                </CModalBody>
                                <CModalFooter>
                                    <CButton color="success" type="submit" disabled={promiseInProgress}>
                                        Đồng ý
                            </CButton>
                                    <CButton color="secondary" onClick={() => setUpdateSubmitModalShow(false)}>
                                        Đóng
                            </CButton>
                                </CModalFooter>
                            </CModal>
                        </CForm>
                    </CCardBody>
                    <CCardFooter>
                        <CButton className="mr-2" color="success" disabled={promiseInProgress} onClick={() => setUpdateSubmitModalShow(true)}>Cập nhật</CButton>
                    </CCardFooter>
                </CCard>

            </CCol>
        );
    } else {
        return (
            <CAlert color="danger">Bạn không có quyền sử dụng chức năng này!</CAlert>
        );
    }
}

export default RatingAlgorithm