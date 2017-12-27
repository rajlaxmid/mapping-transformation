import React from 'react';

function Logo(){
    return (
        <div className="logo" contentEditable>
            Mapping Transformation
        </div>
    )
}

class Header extends React.Component {
  
   render() {

      return (
      	<div className="header-wrapper outer-wrapper">
          
          <div>
            <Logo />
          </div> 

        </div> 
      );

   }
}

export default Header;