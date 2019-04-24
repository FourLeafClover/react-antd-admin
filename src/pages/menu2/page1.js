import React, { Component } from 'react'
import { connect } from 'dva'

class Page1 extends Component {
  render () {
    return (
      <div>1234</div>
    )
  }
}

export default connect(({ app }) => ({ app }))(Page1)