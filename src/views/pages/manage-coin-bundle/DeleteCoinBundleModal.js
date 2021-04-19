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

import { DeleteCoinBundleByIdAPI } from '../../../api/coin-bundle';

const DeleteCoinBundleModal = ({ selectedCoinBundleId, show, handleClose }) => {
    const history = useHistory();

    const [deleteMessage, setDeleteMessage] = useState(null);

    const onSubmitDeleteForm = async (e) => {
        e.preventDefault();

        const deleteCoinBundleResult = await DeleteCoinBundleByIdAPI
            (selectedCoinBundleId)

        if (deleteCoinBundleResult === true) {
            setDeleteMessage(<CAlert color="success">Xóa thành công!</CAlert>);
            history.push("/manage-coin-bundle");
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
                    <CButton color="danger" type="submit">
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