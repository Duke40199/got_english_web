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
    CRow
} from '@coreui/react'
import { GetExchangeRateInfoByIdAPI, UpdateExchangeRateInfoByIdAPI } from '../../../api/exchange-rate';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

const defineServiceName = (serviceName) => {
    if (serviceName.includes("messaging_session")) {
        return "Phiên nhắn tin";
    } else if (serviceName.includes("live_call_session")) {
        return "Phiên gọi trực tuyến";
    } else if (serviceName.includes("translation_session")) {
        return "Phòng phiên dịch trực tuyến";
    } else {
        return "Không xác định";
    }
}

const UpdateExchangeRateModal = ({ selectedExchangeRateId, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [updateExchangeRateId, setUpdateExchangeRateId] = useState("");
    const [updateExchangeRateServiceName, setUpdateExchangeRateServiceName] = useState("");
    const [updateExchangeRateRate, setUpdateExchangeRateRate] = useState("");
    const [updateMessage, setUpdateMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    //this useEffect will be executed every time the modal show
    useEffect(async () => {
        if (selectedExchangeRateId != null) {
            const selectedExchangeRateInfo = await trackPromise(GetExchangeRateInfoByIdAPI(selectedExchangeRateId));
            if (selectedExchangeRateInfo != null) {
                setUpdateExchangeRateId(selectedExchangeRateInfo.id);
                setUpdateExchangeRateServiceName(selectedExchangeRateInfo.service_name);
                setUpdateExchangeRateRate(selectedExchangeRateInfo.rate);
            }
        }
    }, [selectedExchangeRateId]);

    const onSubmitUpdateForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "rate": parseFloat(updateExchangeRateRate)
        }

        const updateExchangeRateResult = await trackPromise(UpdateExchangeRateInfoByIdAPI(selectedExchangeRateId, userInput));
        console.log(updateExchangeRateResult, userInput);

        if (updateExchangeRateResult === true) {
            setUpdateMessage(<CAlert color="success">Cập nhật thành công!</CAlert>);
            setRefreshDataFlag(!refreshDataFlag);
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
                    <CModalTitle>Cập nhật Chiết Khấu</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="exchange-rate-id-input">ID:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <p name="exchange-rate-id-static">{updateExchangeRateId}</p>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-exchange-rate-service-name-input">Tên dịch vụ Chiết Khấu:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-exchange-rate-service-name-input" min="0" name="service-name" value={defineServiceName(updateExchangeRateServiceName)} readOnly />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel className="required" htmlFor="update-exchange-rate-rate-input">Tỉ lệ Chiết Khấu:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CRow className="m-0 align-items-center">
                                <CInput type="number" className="w-25 mr-2" id="update-exchange-rate-rate-input" min="0.01" max="1" step="0.01" name="quantity" value={updateExchangeRateRate} onChange={({ target }) => setUpdateExchangeRateRate(target.value)} required />
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

export default UpdateExchangeRateModal