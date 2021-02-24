import React from 'react'
import ReactStars from 'react-rating-stars-component'
import expertFeedbackData from '../view-expert-feedback/ExpertFeedbackData'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
} from '@coreui/react'

const fields = [
    { key: 'expertId', label: 'ID Chuyên Gia' },
    { key: 'conversationId', label: 'ID Cuộc trò chuyện' },
    { key: 'point', label: 'Đánh Giá của Người Dùng' },
    { key: 'content', label: 'Nội dung Đánh Giá' },
    { key: 'sendTime', label: 'Thời Gian gửi Đánh Giá' }]

const ViewExpertFeedback = () => {
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        <h3 className="mb-0">Chi tiết Đánh Giá của Chuyên Gia John Doe ( id: expert01 )</h3>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={expertFeedbackData}
                            fields={fields}
                            hover
                            striped
                            bordered
                            size="sm"
                            itemsPerPage={10}
                            pagination
                            scopedSlots={
                                {
                                    'point':
                                        (item) => (
                                            <td>
                                                <ReactStars
                                                    value={item.point}
                                                    size={24}
                                                    activeColor="#FFD700"
                                                    edit={false}
                                                />
                                            </td>
                                        ),
                                }
                            }
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ViewExpertFeedback