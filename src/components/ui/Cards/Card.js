import React from 'react'

export const Card = ({id, color, children, options, sm, md, css}) => {
    return (
        <div className={"card-border-"+color+" col-" + md + " col-sm-" + sm + " " + css}>
            <div className={"card card-"+color}>
                {children}
            </div>
        </div>
    )
}
