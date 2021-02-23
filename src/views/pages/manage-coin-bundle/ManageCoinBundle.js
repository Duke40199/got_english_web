import React from 'react'
import CoinBundleData from '../manage-coin-bundle/CoinBundleData'
import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CCardHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const fields = [
    { key: 'name', label: 'Tên Gói' },
    { key: 'price', label: 'Giá Gói' },
    { key: 'coinCount', label: 'Số lượng Coin' },
    { key: 'action', label: '' }
]

const ManageCoinBundle = () => {
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader align="right">
                        <CButton color="primary" className="mt-2 d-flex align-items-center">
                            <CIcon name="cilPlus" size="sm" className="mr-1"></CIcon>Thêm mới Gói Coin</CButton>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={CoinBundleData}
                            fields={fields}
                            hover
                            striped
                            bordered
                            size="sm"
                            itemsPerPage={10}
                            pagination
                            scopedSlots={
                                {
                                    'action':
                                        (item, index) => (
                                            <td className="py-1"><CButton
                                                color="success"
                                                size="sm"
                                                className="mr-2"
                                            >Cập nhật</CButton>
                                                <CButton
                                                    color="danger"
                                                    size="sm"
                                                >Xóa</CButton>
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

export default ManageCoinBundle