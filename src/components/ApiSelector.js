
import React from 'react';
import axios from 'axios';

 //sample JSON file
 var obj= {
	"prodname": "Sony TV",
	"dimention": {
		"height": 2,
		"width": 3,
		"length": 4
	},
	"type": "LED",
	"size": "42",
	"price": 43234,
	"feature": {
		"wireless": [{
				"title": "bluetooth",
				"available": true
			},
			{
				"title": "internet'",
				"available": true
			},
			{
				"title": "fm radio",
				"available": false
			}
		]
	}
};


var isSyncingLeftScroll = false;
      var isSyncingRightScroll = false;

class ApiSelector extends React.Component {
    
    constructor(props){
        
        super(props);
        this.state = {dealers: [], apis: [], versions:[],disableVersion:true};

        this.selectApiHandler=this.selectApiHandler.bind(this);
        this.checkVersions=this.checkVersions.bind(this);
        this.selectVerFileHandler=this.selectVerFileHandler.bind(this);
        this.printRightEditor = this.printRightEditor.bind(this);
        this.printLeftEditor = this.printLeftEditor.bind(this);

        this.finalArr = [];
       
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
      
      var formatted = JSON.stringify(userTreeViewList, null, 2);
                        document.getElementById('originalSource').value = formatted;
    }

    formatJson(obj){
      var arr = [];
      for (var key in obj) {
          if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
              this.formatJson(obj[key]);   
          } else {
            if(Array.isArray(obj[key])){
              arr.push({"key": key, "value": ''}); 
              this.formatJson(obj[key]);  
            }else{
              arr.push({"key": key, "value": obj[key]}); 
            }
          }
      }
      return arr;
    }


    destructureArray(){
      var arr =  JSON.stringify(obj);
      return arr.split('');
    } 

    formatJson1(){
      var myArr = this.destructureArray();

      
      var narr = [];
      var str = '';
      
      myArr.forEach( (item)=> {
      
        if(item === "{" || item === "}" || item === "[" || item === "]"  ){ //&&  item!=="," && str===''
            if(str===''){
               narr.push(item);
            }
            else{
          narr.push(str, item);
              str = '';	
            }
                
          }
          if( item!=="}" && item!=="]" &&  item!=="{" &&  item!=="[" && item!==','){
             str+=item;
          }
          if(  item===',' && str!==''){
             narr.push(str);
              str = '';
          }
          if(str.substr( str.length-1) === ":" && str.length > 1 && item==='{'){
          narr.push(str, item);
              str = '';
          }
          
      });

      return narr;
    }

    printLeftEditor(){
      
      var list = this.formatJson1();
      
      return(
        list.map( (item, i)=>{
          return <div className="editor-each-row"><span className="lineNumber"> {i}</span> {item}</div>
        })
      )
    }

    editableContent(str, i){
      var splittedStr = str.split(':');
      return(
        <div className="editor-each-row">
          <span className="lineNumber"> {i}</span> 
          <span contentEditable="true">{splittedStr[0]}</span> &nbsp;
          <span>{splittedStr[1]}</span>
        </div>
      )
    }

    printRightEditor(){

      var list = this.formatJson1();
      
      return(
        list.map( (item, i)=>{
          return item.length>2 ? this.editableContent(item, i) : <div className="editor-each-row"><span className="lineNumber"> {i}</span> {item}</div>
        })
      )
      
    }
  

    leftScroller(){
      //console.log(111);
      
      var leftDiv = document.getElementById('editor-left');
      var rightDiv = document.getElementById('editor-right');

        if (!isSyncingLeftScroll) {
          isSyncingRightScroll = true;
          rightDiv.scrollTop = this.scrollTop;
        }
        isSyncingLeftScroll = false;  
    }

    rightScroller(){
      //console.log(222);
      
      var leftDiv = document.getElementById('editor-left');
      var rightDiv = document.getElementById('editor-right');
      if (!isSyncingRightScroll) {
        isSyncingLeftScroll = true;
        leftDiv.scrollTop = this.scrollTop;
      }
      isSyncingRightScroll = false;
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
                this.state.dealers.Dealers.map( (item, i)=>{
                  return <option key={i}>{item.DealerName}</option>
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
                this.state.versions.map( (item, i)=>{
                  return <option key={i}>{item.VerName}</option>
                }):null
              }

              </select>
          </div>
          <div className="clearfix" />   
        </div> 

        <div className="editor-wrapper-main">
            <div>
                <div className="editor-header width50per">Original</div>
                <div className="editor-header  width50per">Target</div>
            </div>
            <div>
                  <div id="editor-left" className="editor editor-left bdr-rt" onScroll={this.leftScroller.bind(this)}>            
                      
                    {this.printLeftEditor()}
                      
                  </div>
                  <div id="editor-right" className="editor editor-right"  onScroll={this.rightScroller.bind(this)}>             
                      
                        {this.printRightEditor()}
                      
                  </div>
                  <div className="clearfix" />
            </div>
        </div>
      </div> 
        
      );

   }
}

export default ApiSelector;

/*

var isSyncingLeftScroll = false;
var isSyncingRightScroll = false;
var leftDiv = document.getElementById('left');
var rightDiv = document.getElementById('right');

leftDiv.onscroll = function() {
  if (!isSyncingLeftScroll) {
    isSyncingRightScroll = true;
    rightDiv.scrollTop = this.scrollTop;
  }
  isSyncingLeftScroll = false;
}

rightDiv.onscroll = function() {
  if (!isSyncingRightScroll) {
    isSyncingLeftScroll = true;
    leftDiv.scrollTop = this.scrollTop;
  }
  isSyncingRightScroll = false;
}


*/