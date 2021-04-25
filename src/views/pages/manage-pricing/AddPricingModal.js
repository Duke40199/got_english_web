import React, { useState } from 'react'

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
    CRow
} from '@coreui/react'

import { AddPricingInfoAPI } from '../../../api/pricing';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

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

const defineQuantityUnitName = quantityUnitName => {
    if (quantityUnitName.includes("minutes")) {
        return 'phút';
    } else {
        return 'Không xác định';
    }
}

const AddPricingModal = ({ selectedPricingServiceName, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [addPricingName] = useState(selectedPricingServiceName);
    const [addPricingQuantity, setAddPricingQuantity] = useState("");
    const [addPricingQuantityUnit] = useState("minutes");
    const [addPricingPrice, setAddPricingPrice] = useState("");
    const [addPricingPriceUnit] = useState("coin(s)");
    const [addMessage, setAddMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    const onSubmitAddForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "pricing_name": addPricingName,
            "quantity": parseInt(addPricingQuantity),
            "quantity_unit": addPricingQuantityUnit,
            "price": parseInt(addPricingPrice),
            "price_unit": addPricingPriceUnit
        }

        const addPricingResult = await trackPromise(AddPricingInfoAPI(userInput));
        console.log(addPricingResult, userInput);

        if (addPricingResult === true) {
            setAddMessage(<CAlert color="success">Thêm mới thành công!</CAlert>);
            setRefreshDataFlag(!refreshDataFlag);
        } else {
            setAddMessage(<CAlert color="danger">Thêm mới thất bại!</CAlert>)
        }
    }

    return (
        <CModal
            show={show}
            onClose={handleClose()}
            closeOnBackdrop={false}
            color="primary"
        >
            <CForm onSubmit={onSubmitAddForm} method="post" encType="multipart/form-data" className="form-horizontal">
                <CModalHeader closeButton>
                    <CModalTitle>Thêm mới Đơn Giá</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="add-pricing-service-name-input">Tên Đơn giá:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="add-pricing-service-name-input" name="service-name" value={definePricingName(addPricingName)} readOnly />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="add-pricing-quantity-input">Thời lượng:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CRow className="m-0">
                                <CInput type="number" id="add-pricing-quantity-input" className="w-25 mr-2" name="quantity" onChange={({ target }) => setAddPricingQuantity(target.value)} required />
                                {defineQuantityUnitName(addPricingQuantityUnit)}
                            </CRow>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="add-pricing-price-input">Đơn giá:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CRow className="m-0">
                                <CInput type="number" className="w-25 mr-2" id="add-pricing-price-input" name="price" onChange={({ target }) => setAddPricingPrice(target.value)} required />
                                {addPricingPriceUnit}
                            </CRow>
                        </CCol>
                    </CFormGroup>
                    {addMessage}
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" type="submit" disabled={promiseInProgress}>
                        Thêm
                        </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Đóng
                        </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default AddPricingModal