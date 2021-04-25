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
    CAlert
} from '@coreui/react'
import { GetCoinBundleByIdAPI, UpdateCoinBundleByIdAPI } from '../../../api/coin-bundle'

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

const UpdateCoinBundleModal = ({ selectedCoinBundleId, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [updateCoinBundleId, setUpdateCoinBundleId] = useState("");
    const [updateCoinBundleTitle, setUpdateCoinBundleTitle] = useState("");
    const [updateCoinBundleDescription, setUpdateCoinBundleDescription] = useState("");
    const [updateCoinBundleQuantity, setUpdateCoinBundleQuantity] = useState("");
    const [updateCoinBundlePrice, setUpdateCoinBundlePrice] = useState("");
    const [updateMessage, setUpdateMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    //this useEffect will be executed every time the modal show
    useEffect(async () => {
        if (selectedCoinBundleId != null) {
            const selectedCoinBundleInfo = await trackPromise(GetCoinBundleByIdAPI(selectedCoinBundleId));
            if (selectedCoinBundleInfo != null) {
                setUpdateCoinBundleId(selectedCoinBundleInfo.id);
                setUpdateCoinBundleTitle(selectedCoinBundleInfo.title);
                setUpdateCoinBundleDescription(selectedCoinBundleInfo.description);
                setUpdateCoinBundleQuantity(selectedCoinBundleInfo.quantity);
                setUpdateCoinBundlePrice(selectedCoinBundleInfo.price);
            }
        }
    }, [selectedCoinBundleId]);

    const onSubmitUpdateForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "title": updateCoinBundleTitle,
            "description": updateCoinBundleDescription,
            "quantity": parseInt(updateCoinBundleQuantity),
            "price": parseInt(updateCoinBundlePrice)
        }

        const updateCoinBundleResult = await trackPromise(UpdateCoinBundleByIdAPI(selectedCoinBundleId, userInput));
        console.log(updateCoinBundleResult, userInput);

        if (updateCoinBundleResult === true) {
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
                            <CLabel htmlFor="update-coin-bundle-title-input">Tên Gói:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-coin-bundle-title-input" name="title" value={updateCoinBundleTitle} onChange={({ target }) => setUpdateCoinBundleTitle(target.value)} required />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-coin-bundle-description-input">Nội dung Gói:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-coin-bundle-description-input" name="description" value={updateCoinBundleDescription} onChange={({ target }) => setUpdateCoinBundleDescription(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-coin-bundle-quantity-input">Số lượng Coin:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="number" id="update-coin-bundle-quantity-input" min="0" name="quantity" value={updateCoinBundleQuantity} onChange={({ target }) => setUpdateCoinBundleQuantity(target.value)} required />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-coin-bundle-price-input">Giá:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="number" id="update-coin-bundle-price-input" min="0" name="price" value={updateCoinBundlePrice} onChange={({ target }) => setUpdateCoinBundlePrice(target.value)} required />
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