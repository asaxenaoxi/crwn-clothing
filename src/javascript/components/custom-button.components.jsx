import React from 'react';
import '../../styles/custom-button.styles.scss';

/*We had a wapping <div></div> around the button and what that was doing was making all buttons go in new line
which we didnt want. And the reason for that was this div was inside the div of sing-in component div where we 
has set the rendering to flex in column form which means that each div inside of outter div would fall vertically */

/*You can not add comments in between javascript without old style C comments with *s and also when you try and comment
inside of normal return statement as below without {} you will get react minified error*/

const CustomButton = ({children, buttonStyle, ...otherCustomButtonProps}) =>
(
    <button className={`${buttonStyle} custom-button`} {...otherCustomButtonProps}>
        {children}
    </button>
)

export default CustomButton;
