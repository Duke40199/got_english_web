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
import { CreateCoinBundleAPI } from '../../../api/coin-bundle';
import { GetCoinPricingInfoAPI } from '../../../api/pricing';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

const AddCoinBundleModal = ({ show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [addCoinBundleTitle, setAddCoinBundleTitle] = useState("");
    const [addCoinBundleDescription, setAddCoinBundleDescription] = useState("");
    const [addCoinBundleQuantity, setAddCoinBundleQuantity] = useState(1);
    const [coinPricing, setCoinPricing] = useState("");
    const [addMessage, setAddMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    //this useEffect will be executed every time the modal show
    useEffect(async () => {
        const coinPricing = await trackPromise(GetCoinPricingInfoAPI());
        if (coinPricing != null) {
            setCoinPricing(coinPricing.price);
        }
    }, []);

    const onSubmitAddForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "title": addCoinBundleTitle,
            "description": addCoinBundleDescription,
            "quantity": parseInt(addCoinBundleQuantity),
            "price": parseInt(addCoinBundleQuantity) * coinPricing,
            "price_unit": "VND"
        }

        const addCoinBundleResult = await trackPromise(CreateCoinBundleAPI(userInput));
        console.log(addCoinBundleResult, userInput);

        if (addCoinBundleResult === true) {
            setAddMessage(<CAlert color="success">Thêm mới thành công!</CAlert>);
            setRefreshDataFlag(!refreshDataFlag);
        } else {
            setAddMessage(<CAlert color="danger">Thêm mới thất bại!</CAlert>);
        }
    }

    return (
        <CModal
            show={show}
            onClose={handleClose()}
            closeOnBackdrop={false}
            color="primary">
            <CForm onSubmit={onSubmitAddForm} method="post" encType="multipart/form-data" className="form-horizontal">
                <CModalHeader closeButton>
                    <CModalTitle>Thêm mới Gói Coin</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel className="required" htmlFor="coin-bundle-title-input">Tên Gói:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput id="coin-bundle-title-input" name="coin-bundle-title-input" onChange={({ target }) => setAddCoinBundleTitle(target.value)} required />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="coin-bundle-description-input">Nội dung Gói:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput id="coin-bundle-description-input" name="coin-bundle-description-input" onChange={({ target }) => setAddCoinBundleDescription(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel className="required" htmlFor="coin-bundle-quantity-input">Số lượng Coin:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="number" min="1" max="1000" id="coin-bundle-quantity-input" name="coin-bundle-quantity-input" value={addCoinBundleQuantity} onChange={({ target }) => setAddCoinBundleQuantity(target.value)} required />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="coin-bundle-price-input">Giá Gói:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput
                                type="number"
                                id="coin-bundle-price-input"
                                name="coin-bundle-price-input"
                                min="0"
                                value={addCoinBundleQuantity * coinPricing}
                                readOnly />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="coin-bundle-price-unit-input">Đơn vị Giá:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput id="coin-bundle-price-unit-input" name="coin-bundle-price-unit-input"
                                value="VND"
                                readOnly />
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

export default AddCoinBundleModal