import React, { lazy, useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CRow,
  CButton
} from '@coreui/react'

import { format } from 'date-fns'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";

import { GetMonthlyAccountSummaryByYearMonthAPI, GetMonthlyServiceSummaryByYearMonthAPI } from "../../api/summary";

import UserChart from '../charts/UserChart';
import ServiceChart from '../charts/ServiceChart';

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const Dashboard = () => {
  const [userSummaryMonthYear, setUserSummaryMonthYear] = useState(new Date());
  const [userMonthlySummary, setUserMonthlySummary] = useState(null);
  const [sumMonthlyExpert, setSumMonthlyExpert] = useState(0);
  const [sumMonthlyLearner, setSumMonthlyLearner] = useState(0);
  const [serviceSummaryMonthYear, setServiceSummaryMonthYear] = useState(new Date());
  const [serviceMonthlySummary, setServiceMonthlySummary] = useState(null);
  const [sumMonthlyMessagingSession, setSumMonthlyMessagingSession] = useState(0);
  const [sumMonthlyLiveCallSession, setSumMonthlyLiveCallSession] = useState(0);
  const [sumMonthlyTranslationSession, setSumMonthlyTranslationSession] = useState(0);

  useEffect(async () => {
    const month = format(new Date(), "MM");
    const year = format(new Date(), "yyyy");
    //-----------USER SUMMARY-----------
    const userMonthYearSummary = await GetMonthlyAccountSummaryByYearMonthAPI(year, month);
    let newExpertMonthlyData = [];
    let newLearnerMonthlyData = [];
    if (userMonthYearSummary != null) {
      const expertDataCount = Object.keys(userMonthYearSummary.new_expert_monthly_count).length;
      const learnerDataCount = Object.keys(userMonthYearSummary.new_learner_monthly_count).length;
      for (let i = expertDataCount - 1; i >= 0; i--) {
        let key = i + "_day_ago";
        newExpertMonthlyData.push(userMonthYearSummary.new_expert_monthly_count[key]);
      }
      for (let i = learnerDataCount - 1; i >= 0; i--) {
        let key = i + "_day_ago";
        newLearnerMonthlyData.push(userMonthYearSummary.new_learner_monthly_count[key]);
      }
      setSumMonthlyExpert(newExpertMonthlyData.reduce((a, b) => a + b, 0));
      setSumMonthlyLearner(newLearnerMonthlyData.reduce((a, b) => a + b, 0));
      setUserMonthlySummary(userMonthYearSummary);
      //-----------SERVICE SUMMARY-----------
      const serviceMonthYearSummary = await GetMonthlyServiceSummaryByYearMonthAPI(year, month);
      let messagingSessionMonthlyData = [];
      let liveCallSessionMonthlyData = [];
      let translationSessionMonthlyData = [];
      if (serviceMonthYearSummary != null) {
        const messagingSessionDataCount = Object.keys(serviceMonthYearSummary.new_messaging_session_monthly_count).length;
        const liveCallSessionDataCount = Object.keys(serviceMonthYearSummary.new_live_call_session_monthly_count).length;
        const translationSessionDataCount = Object.keys(serviceMonthYearSummary.new_translation_session_monthly_count).length;
        for (let i = messagingSessionDataCount - 1; i >= 0; i--) {
          let key = i + "_day_ago";
          messagingSessionMonthlyData.push(serviceMonthYearSummary.new_messaging_session_monthly_count[key]);
        }
        for (let i = liveCallSessionDataCount - 1; i >= 0; i--) {
          let key = i + "_day_ago";
          liveCallSessionMonthlyData.push(serviceMonthYearSummary.new_live_call_session_monthly_count[key]);
        }
        for (let i = translationSessionDataCount - 1; i >= 0; i--) {
          let key = i + "_day_ago";
          translationSessionMonthlyData.push(serviceMonthYearSummary.new_translation_session_monthly_count[key]);
        }
        setSumMonthlyMessagingSession(messagingSessionMonthlyData.reduce((a, b) => a + b, 0));
        setSumMonthlyLiveCallSession(liveCallSessionMonthlyData.reduce((a, b) => a + b, 0));
        setSumMonthlyTranslationSession(translationSessionMonthlyData.reduce((a, b) => a + b, 0));
        setServiceMonthlySummary(serviceMonthYearSummary);
      }
    }
  }, []);

  const UserSummaryMonthYearInput = ({ value, onClick }) => (
    <CButton className="dashboard-month-year-input" onClick={onClick}>
      {value}
    </CButton>
  );

  const ServiceSummaryMonthYearInput = ({ value, onClick }) => (
    <CButton className="dashboard-month-year-input" onClick={onClick}>
      {value}
    </CButton>
  );

  const userSummaryMonthYearButtonOnchange = async (monthYear) => {
    setUserSummaryMonthYear(monthYear);
    const month = format(monthYear, "MM");
    const year = format(monthYear, "yyyy");
    const userMonthYearSummary = await GetMonthlyAccountSummaryByYearMonthAPI(year, month);
    let newExpertMonthlyData = [];
    let newLearnerMonthlyData = [];
    if (userMonthYearSummary != null) {
      const expertDataCount = Object.keys(userMonthYearSummary.new_expert_monthly_count).length;
      const learnerDataCount = Object.keys(userMonthYearSummary.new_learner_monthly_count).length;
      for (let i = expertDataCount - 1; i >= 0; i--) {
        let key = i + "_day_ago";
        newExpertMonthlyData.push(userMonthYearSummary.new_expert_monthly_count[key]);
      }
      for (let i = learnerDataCount - 1; i >= 0; i--) {
        let key = i + "_day_ago";
        newLearnerMonthlyData.push(userMonthYearSummary.new_learner_monthly_count[key]);
      }
      setSumMonthlyExpert(newExpertMonthlyData.reduce((a, b) => a + b, 0));
      setSumMonthlyLearner(newLearnerMonthlyData.reduce((a, b) => a + b, 0));
      setUserMonthlySummary(userMonthYearSummary);
    }
  }

  const serviceSummaryMonthYearButtonOnchange = async (monthYear) => {
    setServiceSummaryMonthYear(monthYear);
    const month = format(monthYear, "MM");
    const year = format(monthYear, "yyyy");
    const serviceMonthYearSummary = await GetMonthlyServiceSummaryByYearMonthAPI(year, month);
    let messagingSessionMonthlyData = [];
    let liveCallSessionMonthlyData = [];
    let translationSessionMonthlyData = [];
    if (serviceMonthYearSummary != null) {
      const messagingSessionDataCount = Object.keys(serviceMonthYearSummary.new_messaging_session_monthly_count).length;
      const liveCallSessionDataCount = Object.keys(serviceMonthYearSummary.new_live_call_session_monthly_count).length;
      const translationSessionDataCount = Object.keys(serviceMonthYearSummary.new_translation_session_monthly_count).length;
      for (let i = messagingSessionDataCount - 1; i >= 0; i--) {
        let key = i + "_day_ago";
        messagingSessionMonthlyData.push(serviceMonthYearSummary.new_messaging_session_monthly_count[key]);
      }
      for (let i = liveCallSessionDataCount - 1; i >= 0; i--) {
        let key = i + "_day_ago";
        liveCallSessionMonthlyData.push(serviceMonthYearSummary.new_live_call_session_monthly_count[key]);
      }
      for (let i = translationSessionDataCount - 1; i >= 0; i--) {
        let key = i + "_day_ago";
        translationSessionMonthlyData.push(serviceMonthYearSummary.new_translation_session_monthly_count[key]);
      }
      setSumMonthlyMessagingSession(messagingSessionMonthlyData.reduce((a, b) => a + b, 0));
      setSumMonthlyLiveCallSession(liveCallSessionMonthlyData.reduce((a, b) => a + b, 0));
      setSumMonthlyTranslationSession(translationSessionMonthlyData.reduce((a, b) => a + b, 0));
      setServiceMonthlySummary(serviceMonthYearSummary);
    }
  }

  registerLocale("vi", vi);

  return (
    <>
      <h3 className="mb-3">Bảng tin ngày {format(new Date(), 'dd-MM-yyyy')}:</h3>
      <WidgetsDropdown />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Thống kê lượng Người Dùng theo Tháng</h4>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <DatePicker
                selected={userSummaryMonthYear}
                onChange={date => userSummaryMonthYearButtonOnchange(date)}
                locale="vi"
                showMonthYearPicker
                dateFormat="MM/yyyy"
                maxDate={new Date()}
                value={userSummaryMonthYear}
                customInput={<UserSummaryMonthYearInput />}
                customInputRef={instance => DatePicker = instance}
              />
            </CCol>
          </CRow>
          {/* <MainChartExample
            style={{ height: '300px', marginTop: '40px' }}
            data={userMonthlySummary}
          /> */}
          <UserChart
            style={{ height: '300px', marginTop: '40px' }}
            data={userMonthlySummary}
          />
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Tổng Chuyên Gia mới trong tháng</div>
              <strong>{sumMonthlyExpert}</strong>
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Tổng Học Viên mới trong tháng</div>
              <strong>{sumMonthlyLearner}</strong>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>

      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Thống kê lượng Dịch Vụ tiêu hao theo Tháng</h4>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <DatePicker
                selected={serviceSummaryMonthYear}
                onChange={date => serviceSummaryMonthYearButtonOnchange(date)}
                locale="vi"
                showMonthYearPicker
                dateFormat="MM/yyyy"
                maxDate={new Date()}
                value={serviceSummaryMonthYear}
                customInput={<ServiceSummaryMonthYearInput />}
                customInputRef={instance => DatePicker = instance}
              />
            </CCol>
          </CRow>
          <ServiceChart
            style={{ height: '300px', marginTop: '40px' }}
            data={serviceMonthlySummary}
          />
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Phiên nhắn tin</div>
              <strong>{sumMonthlyMessagingSession}</strong>
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Phiên gọi trực tuyến</div>
              <strong>{sumMonthlyLiveCallSession}</strong>
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Phòng phiên dịch</div>
              <strong>{sumMonthlyTranslationSession}</strong>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default Dashboard
