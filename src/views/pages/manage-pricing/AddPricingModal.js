import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

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

const defineServiceName = serviceName => {
    if (serviceName.includes("messaging_session")) {
        return "Phiên nhắn tin";
    } else if (serviceName.includes("live_call_session")) {
        return "Phiên gọi trực tuyến";
    } else if (serviceName.includes("translation_call_session")) {
        return "Phòng phiên dịch trực tuyến";
    } else {
        return "Không xác định";
    }
}

const AddPricingModal = ({ selectedPricingServiceName, show, handleClose }) => {
    const history = useHistory();

    const [addPricingServiceName] = useState(selectedPricingServiceName);
    const [addPricingQuantity, setAddPricingQuantity] = useState("");
    const [addPricingQuantityUnit] = useState("phút");
    const [addPricingPrice, setAddPricingPrice] = useState("");
    const [addPricingPriceUnit] = useState("coin(s)");
    const [addMessage, setAddMessage] = useState(null);

    const onSubmitAddForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "service_name": addPricingServiceName,
            "quantity": parseInt(addPricingQuantity),
            "quantity_unit": addPricingQuantityUnit,
            "price": parseInt(addPricingPrice),
            "price_unit": addPricingPriceUnit
        }

        const addPricingResult = await AddPricingInfoAPI(userInput);
        console.log(addPricingResult, userInput);

        if (addPricingResult === true) {
            setAddMessage(<CAlert color="success">Thêm mới thành công!</CAlert>);
            history.push("/manage-pricing");
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
                            <CLabel htmlFor="add-pricing-service-name-input">Tên Dịch vụ:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="add-pricing-service-name-input" name="service-name" value={defineServiceName(addPricingServiceName)} readOnly />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="add-pricing-quantity-input">Thời lượng:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CRow className="m-0">
                                <CInput type="number" id="add-pricing-quantity-input" className="w-25 mr-2" name="quantity" onChange={({ target }) => setAddPricingQuantity(target.value)} required />
                                {addPricingQuantityUnit}
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
                    <CButton color="primary" type="submit">
                        Thêm
                        </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Hủy
                        </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default AddPricingModal