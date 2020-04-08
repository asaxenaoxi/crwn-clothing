import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({children, buttonStyle, ...otherCustomButtonProps}) =>
(
    /*We had a wapping <div></div> around the button and what that was doing was making all buttons go in new line
    which we didnt want. And the reason for that was this div was inside the div of sing-in component div where we 
    has set the rendering to flex in column form which means that each div inside of outter div would fall vertically */
    <button className={`${buttonStyle} custom-button`} {...otherCustomButtonProps}>
        {children}
    </button>
)

export default CustomButton;