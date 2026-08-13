import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactDatePicker  from 'react-date-picker'
import classnames from 'classnames'
import { DateTime } from 'luxon'

import { withConfig } from '../containers'

class DatePicker extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    isDefault: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }

  onChange(date) {
    if (date) {
      this.props.onChange(DateTime.fromJSDate(date).toISODate())
    } else {
      this.props.onChange(null)
    }
  }

  render() {
    const { festivalDateStart, festivalDateEnd } = this.props.config
    // festivalDateEnd is kept one day after the festival because slots use an
    // exclusive end date. Do not offer that technical buffer day in calendars.
    const lastFestivalDate = DateTime
      .fromISO(festivalDateEnd)
      .minus({ days: 1 })
      .toJSDate()

    return (
      <ReactDatePicker
        className={classnames({
          'react-date-picker--user-selected': !this.props.isDefault,
        })}
        format="dd.MM.y"
        maxDate={lastFestivalDate}
        minDate={new Date(festivalDateStart)}
        value={new Date(this.props.value)}
        onChange={this.onChange}
      />
    )
  }

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }
}

export default withConfig(DatePicker)
