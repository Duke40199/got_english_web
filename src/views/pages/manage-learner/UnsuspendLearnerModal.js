import React, { useState, useEffect } from 'react'

import {
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CAlert,
    CForm
} from '@coreui/react'

import { GetUserInfoAPI, UnsuspendUserByIdAPI } from '../../../api/user';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

const UnsuspendLearnerModal = ({ selectedLearnerUsername, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [unsuspendLearnerUUID, setUnsuspendLearnerUUID] = useState("");
    const [unsuspendLearnerUsername, setUnsuspendLearnerUsername] = useState("");
    const [unsuspendMessage, setUnsuspendMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    //this useEffect will be executed every time the modal show
    useEffect(async () => {
        if (selectedLearnerUsername != null) {
            const selectedLearnerInfo = await trackPromise(GetUserInfoAPI(selectedLearnerUsername));
            if (selectedLearnerInfo != null) {
                setUnsuspendLearnerUUID(selectedLearnerInfo.id);
                setUnsuspendLearnerUsername(selectedLearnerInfo.username);
            }
        }
    }, [selectedLearnerUsername]);

    const onSubmitUnsuspendForm = async (e) => {
        e.preventDefault();

        const unsuspendResult = await trackPromise(UnsuspendUserByIdAPI(unsuspendLearnerUUID));
        if (unsuspendResult === true) {
            setUnsuspendMessage(<CAlert color="success">Mở khóa tài khoản thành công!</CAlert>);
            setRefreshDataFlag(!refreshDataFlag);
        } else {
            setUnsuspendMessage(<CAlert color="danger">{unsuspendResult}</CAlert>);
        }
    }

    return (
        <CModal
            show={show}
            onClose={handleClose()}
            closeOnBackdrop={false}
            color="warning"
        >
            <CForm onSubmit={onSubmitUnsuspendForm} method="post" encType="multipart/form-data" className="form-horizontal">
                <CModalHeader closeButton>
                    <CModalTitle>Mở Khóa Học Viên ({unsuspendLearnerUsername})</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {unsuspendMessage ? unsuspendMessage : "Bạn chắc chắn muốn mở khóa cho Học Viên này chứ?"}
                </CModalBody>
                <CModalFooter>
                    <CButton color="warning" type="submit" disabled={promiseInProgress}>
                        Mở khóa
                </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Đóng
                </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default UnsuspendLearnerModal