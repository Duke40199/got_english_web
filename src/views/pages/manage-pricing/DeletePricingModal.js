import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

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

const DeletePricingModal = ({ selectedPricingId, show, handleClose }) => {
    const history = useHistory();

    const [deleteMessage, setDeleteMessage] = useState(null);

    const onSubmitDeleteForm = async (e) => {
        e.preventDefault();

        const deletePricingResult = await DeletePricingByIdAPI(selectedPricingId);

        if (deletePricingResult === true) {
            setDeleteMessage(<CAlert color="success">Xóa thành công!</CAlert>);
            history.push("/manage-pricing");
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
                    <CModalTitle>Xóa Đơn Giá</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {deleteMessage ? deleteMessage : "Bạn chắc chắn muốn xóa Đơn Giá ( id: " + selectedPricingId + " ) này chứ?"}
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" type="submit">
                        Xóa
                </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default DeletePricingModal