import React, { useState, useEffect } from 'react'

import {
    CCol,
    CInput,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CLabel,
    CFormGroup,
    CForm,
    CAlert,
    CInvalidFeedback
} from '@coreui/react'
import { GetCoinBundleByIdAPI, UpdateCoinBundleByIdAPI } from '../../../api/coin-bundle'
import { GetCoinPricingInfoAPI } from '../../../api/pricing';

import CoinBundleValidator from '../../../reusable/CoinBundleValidator';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

const UpdateCoinBundleModal = ({ selectedCoinBundleId, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [updateCoinBundleId, setUpdateCoinBundleId] = useState("");
    const [updateCoinBundleTitle, setUpdateCoinBundleTitle] = useState("");
    const [updateCoinBundleDescription, setUpdateCoinBundleDescription] = useState("");
    const [updateCoinBundleQuantity, setUpdateCoinBundleQuantity] = useState("");
    const [coinPricing, setCoinPricing] = useState("");
    const [fieldErrorMessages, setFieldErrorMessages] = useState({});
    const [updateMessage, setUpdateMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    //this useEffect will be executed every time the modal show
    useEffect(() => {
        async function fetchData() {
            if (selectedCoinBundleId != null) {
                const selectedCoinBundleInfo = await trackPromise(GetCoinBundleByIdAPI(selectedCoinBundleId));
                if (selectedCoinBundleInfo != null) {
                    setUpdateCoinBundleId(selectedCoinBundleInfo.id);
                    setUpdateCoinBundleTitle(selectedCoinBundleInfo.title);
                    setUpdateCoinBundleDescription(selectedCoinBundleInfo.description);
                    setUpdateCoinBundleQuantity(selectedCoinBundleInfo.quantity);
                }
            }
            const coinPricing = await trackPromise(GetCoinPricingInfoAPI());
            if (coinPricing != null) {
                setCoinPricing(coinPricing.price);
            }
        }
        fetchData();
    }, [selectedCoinBundleId]);

    const onSubmitUpdateForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "title": updateCoinBundleTitle,
            "description": updateCoinBundleDescription,
            "quantity": updateCoinBundleQuantity
        }

        const formValidate = CoinBundleValidator(userInput);
        const noErrors = Object.keys(formValidate).length === 0;

        if (noErrors) {
            const updateCoinBundleData = {
                "title": updateCoinBundleTitle,
                "description": updateCoinBundleDescription,
                "quantity": parseInt(updateCoinBundleQuantity),
            }

            const updateCoinBundleResult = await trackPromise(UpdateCoinBundleByIdAPI(selectedCoinBundleId, updateCoinBundleData));

            if (updateCoinBundleResult === true) {
                setUpdateMessage(<CAlert color="success">Cập nhật thành công!</CAlert>);
                setRefreshDataFlag(!refreshDataFlag);
            } else {
                setUpdateMessage(<CAlert color="danger">{updateCoinBundleResult}</CAlert>);
            }
            //clear errors if any
            setFieldErrorMessages({});
        } else {
            setFieldErrorMessages(formValidate);
            setUpdateMessage(null);
        }
    }

    return (
        <CModal
            show={show}
            onClose={handleClose()}
            closeOnBackdrop={false}
            color="success"
        >
            <CForm onSubmit={onSubmitUpdateForm} method="post" encType="multipart/form-data" className="form-horizontal">
                <CModalHeader closeButton>
                    <CModalTitle>Cập nhật Gói Coin</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="coin-bundle-id-input">ID:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <p name="coin-bundle-id-static">{updateCoinBundleId}</p>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel className="required" htmlFor="update-coin-bundle-title-input">Tên Gói:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-coin-bundle-title-input" name="title" value={updateCoinBundleTitle} onChange={({ target }) => setUpdateCoinBundleTitle(target.value)} required />
                            {fieldErrorMessages.title != null ? <CInvalidFeedback
                                className="d-block"
                            >
                                {fieldErrorMessages.title}
                            </CInvalidFeedback>
                                : null}
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-coin-bundle-description-input">Nội dung Gói:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-coin-bundle-description-input" name="description" value={updateCoinBundleDescription} onChange={({ target }) => setUpdateCoinBundleDescription(target.value)} />
                            {fieldErrorMessages.description != null ? <CInvalidFeedback
                                className="d-block"
                            >
                                {fieldErrorMessages.description}
                            </CInvalidFeedback>
                                : null}
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel className="required" htmlFor="update-coin-bundle-quantity-input">Số lượng Coin:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="number" id="update-coin-bundle-quantity-input" min="1" max="1000" name="quantity" value={updateCoinBundleQuantity} onChange={({ target }) => setUpdateCoinBundleQuantity(target.value)} required />
                            {fieldErrorMessages.quantity != null ? <CInvalidFeedback
                                className="d-block"
                            >
                                {fieldErrorMessages.quantity}
                            </CInvalidFeedback>
                                : null}
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-coin-bundle-price-input">Giá Gói:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="number" id="update-coin-bundle-price-input" min="0" name="price" value={updateCoinBundleQuantity * coinPricing} readOnly />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-coin-bundle-price-unit-input">Đơn vị Giá:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-coin-bundle-price-unit-input" name="price-unit" value="VND" readOnly />
                        </CCol>
                    </CFormGroup>
                    {updateMessage}
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" type="submit" disabled={promiseInProgress}>
                        Cập nhật
                        </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Đóng
                        </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default UpdateCoinBundleModal