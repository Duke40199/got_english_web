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

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { GetUserInfoAPI, SuspendUserByIdAPI } from '../../../api/user';

const SuspendLearnerModal = ({ selectedLearnerUsername, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [suspendLearnerUUID, setSuspendLearnerUUID] = useState("");
    const [suspendLearnerUsername, setSuspendLearnerUsername] = useState("");
    const [suspendMessage, setSuspendMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    //this useEffect will be executed every time the modal show
    useEffect(async () => {
        if (selectedLearnerUsername != null) {
            const selectedLearnerInfo = await trackPromise(GetUserInfoAPI(selectedLearnerUsername, 'Learner'));
            if (selectedLearnerInfo != null) {
                setSuspendLearnerUUID(selectedLearnerInfo.id);
                setSuspendLearnerUsername(selectedLearnerInfo.username);
            }
        }
    }, [selectedLearnerUsername]);

    const onSubmitSuspendForm = async (e) => {
        e.preventDefault();

        const suspendResult = await trackPromise(SuspendUserByIdAPI(suspendLearnerUUID));
        if (suspendResult === true) {
            setSuspendMessage(<CAlert color="success">Khóa tài khoản thành công!</CAlert>);
            setRefreshDataFlag(!refreshDataFlag);
        } else {
            setSuspendMessage(<CAlert color="danger">{suspendResult}</CAlert>);
        }
    }

    return (
        <CModal
            show={show}
            onClose={handleClose()}
            closeOnBackdrop={false}
            color="danger"
        >
            <CForm onSubmit={onSubmitSuspendForm} method="post" encType="multipart/form-data" className="form-horizontal">
                <CModalHeader closeButton>
                    <CModalTitle>Khóa Học Viên ({suspendLearnerUsername})</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {suspendMessage ? suspendMessage : "Bạn chắc chắn muốn khóa Học Viên này chứ?"}
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" type="submit" disabled={promiseInProgress}>
                        Khóa
                </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Đóng
                </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default SuspendLearnerModal