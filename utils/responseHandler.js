const responseCreator=(msg,data)=>{
    const response = {msg,success:true};
    if(data){
        response.data=data;
    }
    return response;
}

const errorCreator=(msg,status=500)=>{
const err = new Error(msg);
err.status=status;
throw(err)
};

export default {responseCreator,errorCreator}