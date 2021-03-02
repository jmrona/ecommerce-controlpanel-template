import React from 'react'
import PropTypes from 'prop-types';

export const Btn = ({href, outline, block, color, children, sm, md, css}) => {
    return (
        <a href={href} className={"btn-flex col-"+md+" col-sm-"+sm}>
            {
                (!outline)
                ?
                <button className={"btn btn-"+color +" "+css}>
                    {children}
                </button>
                :
                <button className={"btn btn-outline-"+color +" "+css}>
                    {children}
                </button>
            }
            
        </a>
    )
}

Btn.propTypes = {
    href: PropTypes.string,
    outline: PropTypes.bool,
    sm: PropTypes.oneOf(['1','2','3','4','5','6','7','8','9','10','11','12']).isRequired, 
    md: PropTypes.oneOf(['1','2','3','4','5','6','7','8','9','10','11','12']).isRequired,
    color: PropTypes.oneOf([
        'success', 
        'danger', 
        'warning', 
        'default', 
        'blue', 
        'create',
        'edit',
        'delete',
    ]).isRequired,
  };
