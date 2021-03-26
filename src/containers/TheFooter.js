import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="/" rel="noopener noreferrer">Quản trị Phần Mềm GotEnglish</a>
        <span className="ml-1">&copy; 2021 Team SP21SE16.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://fpt.edu.vn/" target="_blank" rel="noopener noreferrer">FPT University</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
