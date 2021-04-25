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

import { DeletePricingByIdAPI } from '../../../api/pricing';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

const DeletePricingModal = ({ selectedPricingId, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [deleteMessage, setDeleteMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    const onSubmitDeleteForm = async (e) => {
        e.preventDefault();

        const deletePricingResult = await trackPromise(DeletePricingByIdAPI(selectedPricingId));

        if (deletePricingResult === true) {
            setDeleteMessage(<CAlert color="success">Xóa thành công!</CAlert>);
            setRefreshDataFlag(!refreshDataFlag);
        } else {
            setDeleteMessage(<CAlert color="danger">Xóa thất bại!</CAlert>);
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
                    <CModalTitle>Xóa Đơn Giá ( id: {selectedPricingId} )</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {deleteMessage ? deleteMessage : "Bạn chắc chắn muốn xóa Đơn Giá này chứ?"}
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

export default DeletePricingModal