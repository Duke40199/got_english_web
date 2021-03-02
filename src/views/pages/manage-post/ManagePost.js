import React from 'react'
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CInput,
    CInputGroup,
    CInputGroupAppend,
    CButton,
} from '@coreui/react'

import postData from '../manage-post/PostData'

const fields = [
    { key: 'postId', label: 'ID Bài Viết' },
    { key: 'userId', label: 'ID Người Viết' },
    { key: 'title', label: 'Tựa đề Bài Viết', },
    { key: 'upvoteCount', label: 'Lượt Upvote' },
    { key: 'createdAt', label: 'Thời gian tạo' },
    { key: 'updatedAt', label: 'Thời gian cập nhật' },
    { key: 'action', label: '' }
]

const ManagePost = () => {
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader align="right">
                        <CInputGroup>
                            <CInput type="text" name="searchPostTitle" placeholder="Nhập tựa đề: v.d Cách để phát âm,..." />
                            <CInputGroupAppend>
                                <CButton type="button" color="primary">Tìm kiếm</CButton>
                            </CInputGroupAppend>
                        </CInputGroup>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={postData}
                            fields={fields}
                            hover
                            striped
                            bordered
                            size="sm"
                            itemsPerPage={10}
                            pagination
                            clickableRows
                            onRowClick={() => {
                                window.location.href = '/manage-post/view-post-detail';
                            }}
                            scopedSlots={
                                {
                                    'action':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">
                                                    <CButton
                                                        color="danger"
                                                        size="sm"
                                                        className="mr-1"
                                                    >Xóa</CButton>
                                                </td>
                                            )
                                        },
                                }
                            }
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ManagePost