
import axios from 'axios';
import http from 'http';
//import fetch from 'fetch';

export const THE_USER ='THE_USER';
export const theUser = (user) => dispatch => {
    dispatch({
        type: THE_USER,
        user: {user: user }
    });
}
/*axios.post('http://localhost:3000/login', values, {
    headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }).then((res)=>{
    console.log(res);
  });*/
export const GET_TOKEN = 'GET_TOKEN';
export const getTokenUser = () => dispatch => {
    debugger;
    var user =  {userid: 'rajlaxmi', pwd: 'handsome@1'};
    
    axios.get('http://localhost:3000/login?user'
        ).then(function(result){
        console.log('the result is');
        console.log(result);
        dispatch({
            type: GET_TOKEN,
            userId: {userId: result }
        });
    })
   
}