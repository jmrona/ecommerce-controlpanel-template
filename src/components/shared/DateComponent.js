import React from 'react'
import * as dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

export const DateComponent = () => {
    dayjs.extend(advancedFormat)
    let now = dayjs().format("dddd, MMMM Do YYYY");

    return (
        <p className="dateComponent">
            {now}
        </p>
    )
}
