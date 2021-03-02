import React from 'react';
import PropTypes from 'prop-types';

export const BtnFloat = ({color, children, css}) => {
    return (
        <button className={"btn-float btn-"+color +" "+css}>
            {children}
        </button>
    )
}

BtnFloat.propTypes = {
    color: PropTypes.oneOf(['create', 'create-full','edit','delete',]).isRequired,
};
