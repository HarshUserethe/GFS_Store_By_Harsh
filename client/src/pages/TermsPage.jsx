import React from 'react'
import Header from '../components/Header'
import TermsAndConditions from './TermsAndCondition'
import Underlay from '../components/Underlay'

const TermsPage = () => {
  return (
    <div>
      <Underlay />
      <Header />
      <TermsAndConditions />
    </div>
  )
}

export default TermsPage
