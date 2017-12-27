//MetaDataEditor.js

import React from 'react';

import ApiSelector from './ApiSelector';


class MetaDataEditor extends React.Component {
  
   render() {

      return (
      	<div className="outer-wrapper">
          
          <div>
            <ApiSelector />
            <div className="clearfix" ></div>
          </div>

        </div> 
      );

   }
}

export default MetaDataEditor;