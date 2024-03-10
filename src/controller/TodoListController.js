const TodoListModel= require("../model/TodoListModel")


exports.createTodo = async (req, res) => {
    let Username = req.headers['Username'];
    let{TodoSubject,TodoDescription}=req.body

    let postBody={
        Username:Username,
    TodoSubject:TodoSubject,
    TodoDescription:TodoDescription

    }
    try {
        const profile = await TodoListModel.create(postBody); // Use req.body instead of req.reqBody
        res.status(200).json({ status: "success", data: profile });
    } catch (error) {
        res.status(400).json({ status: "failed", data: error });
    }
};
 

exports.readTodo = async (req, res) => {
    let Username = req.headers['Username'];
    
    try {
        let data = await TodoListModel.findOne({ 'Username': Username });
        if (!data) {
            return res.status(401).json({ status: 'failed', message: 'Invalid username or password' });
        } else {
            res.status(200).json({ status: 'success', message: 'Access successful', data: data });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}


exports.updateTodo =  async (req, res) => {
    
    let{TodoSubject,TodoDescription,_id}=req.body
    let TodoUpdateDate = Date.now()

    let postBody={
        
    TodoSubject:TodoSubject,
    TodoDescription:TodoDescription,
    TodoUpdateDate: TodoUpdateDate 

    }
    try {
        const profile = await TodoListModel.updateOne({ '_id': _id},{$set:postBody},{w:1}); // Use req.body instead of req.reqBody
        res.status(200).json({ status: "success", data: profile });
    } catch (error) {
        res.status(400).json({ status: "failed", data: error });
    }
};



exports.updateStatusTodo =  async (req, res) => {
    
    let{TodoStatus,_id}=req.body
    let TodoUpdateDate = Date.now()

    let postBody={
        
        TodoStatus:TodoStatus,
    TodoUpdateDate: TodoUpdateDate 

    }
    try {
        const profile = await TodoListModel.updateOne({ '_id': _id},{$set:postBody},{w:1}); // Use req.body instead of req.reqBody
        res.status(200).json({ status: "success", data: profile });
    } catch (error) {
        res.status(400).json({ status: "failed", data: error });
    }
};



exports.deleteTodo =  async (req, res) => {
    
    let{_id}=req.body
    
  
    try {
        const profile = await TodoListModel.deleteOne({ '_id': _id}); // Use req.body instead of req.reqBody
        res.status(200).json({ status: "success", data: profile });
    } catch (error) {
        res.status(400).json({ status: "failed", data: error });
    }
};