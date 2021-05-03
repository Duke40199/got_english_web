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

const SuspendAdminModal = ({ selectedAdminUsername, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [suspendAdminUUID, setSuspendAdminUUID] = useState("");
    const [suspendAdminUsername, setSuspendAdminUsername] = useState("");
    const [suspendMessage, setSuspendMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    //this useEffect will be executed every time the modal show
    useEffect(() => {
        async function fetchData() {
            if (selectedAdminUsername != null) {
                const selectedAdminInfo = await trackPromise(GetUserInfoAPI(selectedAdminUsername, 'Admin'));
                if (selectedAdminInfo != null) {
                    setSuspendAdminUUID(selectedAdminInfo.id);
                    setSuspendAdminUsername(selectedAdminInfo.username);
                }
            }
        }
        fetchData();
    }, [selectedAdminUsername]);

    const onSubmitSuspendForm = async (e) => {
        e.preventDefault();

        const suspendResult = await trackPromise(SuspendUserByIdAPI(suspendAdminUUID));
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
                    <CModalTitle>Khóa Quản Trị Viên ({suspendAdminUsername})</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {suspendMessage ? suspendMessage : "Bạn chắc chắn muốn khóa Quản Trị Viên này chứ?"}
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" type="submit" disabled={promiseInProgress}>
                        Khóa
                </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default SuspendAdminModal