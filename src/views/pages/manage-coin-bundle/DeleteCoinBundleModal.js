import React, { useState } from 'react'

import {
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CForm,
    CAlert
} from '@coreui/react'

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { DeleteCoinBundleByIdAPI } from '../../../api/coin-bundle';

const DeleteCoinBundleModal = ({ selectedCoinBundleId, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [deleteMessage, setDeleteMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    const onSubmitDeleteForm = async (e) => {
        e.preventDefault();

        const deleteCoinBundleResult = await trackPromise(DeleteCoinBundleByIdAPI
            (selectedCoinBundleId));

        if (deleteCoinBundleResult === true) {
            setDeleteMessage(<CAlert color="success">Xóa thành công!</CAlert>);
            setRefreshDataFlag(!refreshDataFlag);
        } else {
            setDeleteMessage(<CAlert color="danger">{deleteCoinBundleResult}</CAlert>);
        }
    }

    return (
        <CModal
            show={show}
            onClose={handleClose()}
            closeOnBackdrop={false}
            color="danger"
        >
            <CForm onSubmit={onSubmitDeleteForm} method="post" encType="multipart/form-data" className="form-horizontal">
                <CModalHeader closeButton>
                    <CModalTitle>Xóa Gói Coin ( id: {selectedCoinBundleId} )</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {deleteMessage ? deleteMessage : "Bạn chắc chắn muốn xóa Gói Coin này chứ?"}
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" type="submit" disabled={promiseInProgress}>
                        Xóa
                </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Đóng
                </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default DeleteCoinBundleModal