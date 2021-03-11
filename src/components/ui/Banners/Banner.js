import React from 'react';
import PropTypes from 'prop-types';

export const Banner = ({color, children, sm="12", md="12", css="", icon, type = "rectangle"}) => {
    return (
        <div className={`banner-border ${color && 'banner-border-'+color} col-${md} col-sm-${sm} ${css && css}`}>
            <div className={"banner banner-"+color}>
            
                <div className={`${type} ${color && type+'-'+color}`}></div>
                <div className={`${type} ${color && type+'-'+color}`}></div>
                <div className={`${type} ${color && type+'-'+color}`}></div>

                <div className={`banner-content`}>
                    {children}
                </div>

                <div className={`banner-icon ${color && 'banner-icon-'+color}`}>
                    <i className={icon}></i>
                </div>
            </div>
        </div>
    )
}

Banner.propTypes = {
    sm: PropTypes.oneOf(['1','2','3','4','5','6','7','8','9','10','11','12']).isRequired, 
    md: PropTypes.oneOf(['1','2','3','4','5','6','7','8','9','10','11','12']).isRequired,
    color: PropTypes.oneOf([
        'success', 
        'danger', 
        'warning', 
        'default', 
        'blue',
    ]).isRequired,
    icon: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['circle', 'rectangle', 'square'])
  };
