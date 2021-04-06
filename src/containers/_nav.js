import React from 'react'
import CIcon from '@coreui/icons-react'
import jwt_decode from 'jwt-decode'

const token = (JSON.parse(localStorage.getItem("user"))).token;
const role = (jwt_decode(token)).claims.role_name;

let _nav = []

//role check
if (role === "Admin") {
  _nav = [
    {
      _tag: 'CSidebarNavItem',
      name: 'Bảng tin',
      to: '/dashboard',
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Quản lý Học Viên',
      to: '/manage-learner',
      icon: 'cil-book'
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Quản lý Chuyên Gia',
      to: '/manage-expert',
      icon: 'cil-education'
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Quản lý Điều Hành Viên',
      to: '/manage-moderator',
      icon: 'cil-people'
    },
  ]
} else if (role === "Moderator") {
  _nav = [
    {
      _tag: 'CSidebarNavItem',
      name: 'Bảng tin',
      to: '/dashboard',
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Xem hồ sơ Ứng Viên',
      icon: 'cil-address-book',
      to: '/view-candidate-certification',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Quản lý Gói Coin',
      to: '/manage-coin-bundle',
      icon: 'cil-dollar'
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Quản lý Đơn Giá',
      to: '/manage-pricing',
      icon: 'cil-cash',
    },
  ]
}

export default _nav
