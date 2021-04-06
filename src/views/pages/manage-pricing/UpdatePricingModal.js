import React, { useState, useEffect } from 'react'
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
    CAlert
} from '@coreui/react'
import { GetPricingInfoByIdAPI, updatePricingInfoByIdAPI } from '../../../api/pricing'

const getServiceName = serviceType => {
    switch (serviceType) {
        case 'messaging_session': return 'Phiên nhắn tin'
        case 'translation_session': return 'Phòng phiên dịch'
        case 'private_call_session': return 'Phiên gọi trực tuyến'
        default: return ''
    }
}

const UpdatePricingModal = ({ selectedPricingId, show, handleClose }) => {
    const history = useHistory();

    const [updatePricingId, setUpdatePricingId] = useState("");
    const [updatePricingServiceName, setUpdatePricingServiceName] = useState("");
    const [updatePricingPrice, setUpdatePricingPrice] = useState("");
    const [updatePricingPriceUnit, setUpdatePricingPriceUnit] = useState("");
    const [updateMessage, setUpdateMessage] = useState(null);


    //this useEffect will be executed every time the modal show
    useEffect(async () => {
        if (selectedPricingId != null) {
            const selectedPricingInfo = await GetPricingInfoByIdAPI(selectedPricingId);
            setUpdatePricingId(selectedPricingInfo.id);
            setUpdatePricingServiceName(getServiceName(selectedPricingInfo.service_name));
            setUpdatePricingPrice(selectedPricingInfo.price);
            setUpdatePricingPriceUnit(selectedPricingInfo.price_unit);
        }
    }, [selectedPricingId]);

    const onSubmitUpdateForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "price": parseInt(updatePricingPrice)
        }

        const updatePricingResult = await updatePricingInfoByIdAPI(selectedPricingId, userInput);
        console.log(updatePricingResult, userInput);

        if (updatePricingResult === true) {
            setUpdateMessage(<CAlert color="success">Cập nhật thành công!</CAlert>);
            history.push("/manage-pricing");
        } else {
            setUpdateMessage(<CAlert color="danger">Cập nhật thất bại!</CAlert>);
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
                            <CLabel htmlFor="pricing-id-input">ID:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <p name="pricing-id-static">{updatePricingId}</p>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-pricing-service-name-input">Tên Dịch vụ:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-pricing-service-name-input" name="service-name" value={updatePricingServiceName} readOnly />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-pricing-price-input">Đơn giá:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="number" step="10" id="update-pricing-price-input" name="price" value={updatePricingPrice} onChange={({ target }) => setUpdatePricingPrice(target.value)} required />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-pricing-price-unit-input">Đơn vị:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput id="update-pricing-price-unit-input" name="price-unit" value={updatePricingPriceUnit} readOnly />
                        </CCol>
                    </CFormGroup>
                    {updateMessage}
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" type="submit">
                        Cập nhật
                        </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Hủy
                        </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default UpdatePricingModal