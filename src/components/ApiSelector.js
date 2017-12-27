
import React from 'react';
import axios from 'axios';

 //sample JSON file
 var userTreeViewList = {
  tree: [
    {
      "node": {
        "id": "1",
        "description": "test1",
        "children": [
            {
             "node": {
                  "id": "1_1",
                  "description": "test1_1",
                  "children": [
                      {
                       "node": {
                            "id": "1_1_1",
                            "description": "test1_1_1",
                            "children": [
                                {
                                 "node": {
                                      "id": "1_1_1_1",
                                      "description": "test1_1_1_1",
                                      "children": [
                                      
                                      ]
                                  }
                                }
                            ]
                        }
                      }
                  ]
              }
            },
            {
              "node": {
                "id": "1_2",
                "description": "test1_2",
                  "children": []
              }
            }
        ]
      }
    },
    {
      "node": {
        "id": "2",
        "description": "test2",
        "children": [
            {
             "node": {
                  "id": "2_1",
                  "description": "test2_1",
                  "children": [
                    {
                     "node": {
                          "id": "2_1_1",
                          "description": "test2_1_1",
                          "children": [
                          
                          ]
                      }
                    }
                ]
              }
            },
            {
              "node": {
                   "id": "2_2",
                   "description": "test2_2",
                   "children": [
                     {
                      "node": {
                           "id": "2_2_1",
                           "description": "test2_2_1",
                           "children": [
                           
                           ]
                       }
                     }
                 ]
               }
             }
        ]
      }
    }
  ]
};
class ApiSelector extends React.Component {
    
    constructor(props){
        super(props);
        this.selectApiHandler=this.selectApiHandler.bind(this);
        this.checkVersions=this.checkVersions.bind(this);
        this.selectVerFileHandler=this.selectVerFileHandler.bind(this);
        this.state = {dealers: [], apis: [], versions:[],disableVersion:true};
       
    }

    componentDidMount(){
      axios.get('Dealer.json').then( (result)=>{ this.setState({dealers: result.data});   }  );  
      axios.get('Api.json').then( (result)=>{ this.setState({apis: result.data});  }  );  
    } 
     checkVersions(ver) {
      //"DealerName":"Amazon",
      //"ApiName": "Api-1",
      var selectedDealerName=this.refs.dealerName.value;
      var selectedApiName=this.refs.apiName.value;
      return ver.DealerName === selectedDealerName  && ver.ApiName===selectedApiName;
  }
    selectApiHandler(event){
      console.log("selectApiHandler called", event.target.value);
      if(event.target.value!=='Select Api'){
        this.setState({disableVersion: false});
        //get the versions
      axios.get('Version.json').then( (result)=>{ 
        
        //this.setState({versions: result.Versions});
        //debugger;
    var versionsObj=result.data.Versions.filter(this.checkVersions);
    var versios = [];
    versionsObj.forEach( (item)=> {
      var arr = item.Version;
      arr.forEach( (a)=>{
        versios.push(a);
      })
    })
        this.setState({versions: versios});
        console.log(versios);
    
    }  );  
      }else{
        this.setState({disableVersion: true});
      }
    }
    //select the JSON file based on version selection
    selectVerFileHandler(event){
      console.log("selectVerFileHandler called", event.target.value);
      debugger;
      var formatted = JSON.stringify(userTreeViewList, null, 2);
                        document.getElementById('originalSource').value = formatted;
    }
      
   render() {
      return (
        <div>
      	<div className="api-selector-wrapper">
          <div className="col-md-2">
              Dealer Name:
              <select ref="dealerName" className="form-control"> 
              {
                this.state.dealers.Dealers !== undefined ?
                this.state.dealers.Dealers.map( (item)=>{
                  return <option>{item.DealerName}</option>
                }):null
              }
              </select>
          </div>

          <div className="col-md-6">
              Api Name: 
              <select ref="apiName" className="form-control" onChange={this.selectApiHandler}>
              <option>Select Api</option>
                  
                  {
                this.state.apis.Apis !== undefined ?
                this.state.apis.Apis.map( (item)=>{
                  return <option>{item.ApiName}</option>
                }):null
              }
              </select>
          </div>

          <div className="col-md-4">
              Api Version: 
              <select ref="verName" className="form-control" onChange={this.selectVerFileHandler} disabled={this.state.disableVersion}  className="form-control" >
                  <option>Select Version</option>
                  {
                this.state.versions !== undefined ?
                this.state.versions.map( (item)=>{
                  return <option>{item.VerName}</option>
                }):null
              }

              </select>
          </div>

        </div> 
          <textarea id="originalSource" ></textarea>
        </div> 
        
      );

   }
}

export default ApiSelector;

/*
{
              this.state.dealers.map( (item)=>{
                return <option>{item.DealerName}</option>
              })
            }
*/