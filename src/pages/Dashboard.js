import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { theUser,getTokenUser} from '../store/actions';
import {  hashHistory } from 'react-router';  

import Header from '../components/Header';
import MetaDataEditor from '../components/MetaDataEditor';




class Dashboard extends React.Component {
  
   render() {

      return (
      
        <div >
          
          <div>
            <Header />
          </div>

          <div>
            <MetaDataEditor />
          </div> 
          

        </div>
      );

   }

}


export default Dashboard;