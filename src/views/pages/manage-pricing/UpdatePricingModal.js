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
    CRow,
    CInvalidFeedback
} from '@coreui/react'
import { GetPricingInfoByIdAPI, UpdatePricingInfoByIdAPI } from '../../../api/pricing'

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import PricingValidator from '../../../reusable/PricingValidator';

const definePricingName = pricingName => {
    if (pricingName.includes("coin_value")) {
        return "Coin";
    }
    else if (pricingName.includes("messaging_session")) {
        return "Dịch vụ Phiên nhắn tin";
    } else if (pricingName.includes("live_call_session")) {
        return "Dịch vụ Phiên gọi trực tuyến";
    } else if (pricingName.includes("translation_call_session")) {
        return "Dịch vụ Phòng phiên dịch trực tuyến";
    } else {
        return "Không xác định";
    }
}

const UpdatePricingModal = ({ selectedPricingId, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [updatePricingId, setUpdatePricingId] = useState("");
    const [updatePricingName, setUpdatePricingName] = useState("");
    const [updatePricingQuantity, setUpdatePricingQuantity] = useState("");
    const [updatePricingQuantityUnit, setUpdatePricingQuantityUnit] = useState("");
    const [updatePricingPrice, setUpdatePricingPrice] = useState("");
    const [updatePricingPriceUnit, setUpdatePricingPriceUnit] = useState("");
    const [fieldErrorMessages, setFieldErrorMessages] = useState({});
    const [updateMessage, setUpdateMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    //this useEffect will be executed every time the modal show
    useEffect(() => {
        async function fetchData() {
            if (selectedPricingId != null) {
                const selectedPricingInfo = await trackPromise(GetPricingInfoByIdAPI(selectedPricingId));
                if (selectedPricingInfo != null) {
                    setUpdatePricingId(selectedPricingInfo.id);
                    setUpdatePricingName(selectedPricingInfo.pricing_name);
                    setUpdatePricingQuantity(selectedPricingInfo.quantity);
                    setUpdatePricingQuantityUnit(selectedPricingInfo.quantity_unit)
                    setUpdatePricingPrice(selectedPricingInfo.price);
                    setUpdatePricingPriceUnit(selectedPricingInfo.price_unit);
                }
            }
        }
        fetchData();
    }, [selectedPricingId]);

    const onSubmitUpdateForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "price": updatePricingPrice,
        }

        const formValidate = PricingValidator(userInput);
        const noErrors = Object.keys(formValidate).length === 0;

        if (noErrors) {
            const updatePricingData = {
                "price": parseInt(updatePricingPrice)
            }

            const updatePricingResult = await trackPromise(UpdatePricingInfoByIdAPI(selectedPricingId, updatePricingData));

            if (updatePricingResult === true) {
                setUpdateMessage(<CAlert color="success">Cập nhật thành công!</CAlert>);
                setRefreshDataFlag(!refreshDataFlag);
            } else {
                setUpdateMessage(<CAlert color="danger">{updatePricingResult}</CAlert>);
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
                    <CModalTitle>Cập nhật Đơn Giá</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="pricing-id-input">ID:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <p name="pricing-id-static">{updatePricingId}</p>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-pricing-name-input">Tên Đơn giá:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-pricing-name-input" name="service-name" value={definePricingName(updatePricingName)} readOnly />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-pricing-price-input">Đơn giá:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CRow className="m-0 align-items-center">
                                <CInput className="w-25 mr-2" type="number" id="update-pricing-price-input" name="price" value={updatePricingPrice} onChange={({ target }) => setUpdatePricingPrice(target.value)} required /> {updatePricingPriceUnit} = {updatePricingQuantity} {updatePricingQuantityUnit}
                                {fieldErrorMessages.price != null ? <CInvalidFeedback
                                    className="d-block"
                                >
                                    {fieldErrorMessages.price}
                                </CInvalidFeedback>
                                    : null}
                            </CRow>
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

export default UpdatePricingModal