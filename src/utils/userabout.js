import { v4 as uuidv4 } from 'uuid';
export function getUserTempId(){
    let userTempId=localStorage.getItem('USERTEMPID_KEY')
    if(!userTempId){
        userTempId = uuidv4();
        localStorage.setItem('USERTEMPID_KEY',userTempId)
    }
    return userTempId
}