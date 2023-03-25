const express = require ('express');
const router= express.Router();
const Task= require ('../models/task')

//metodo get usando find();
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
       
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});


//metodo get por id
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
  });

//metodo post usando save()
router.post('/', async(req, res)=>{
    try{
        const {title, description }=req.body;
    const task=new Task({
        title:title,
        description: description
    })
    await task.save();
    res.json({status:'Task Saved'});
    }
    catch(err){
        console.error(err);
        res.status(500).send(err);
    }
} )



//metodo update usando put() pero usando el id
router.put('/:id', async (req, res)=>{
try{    
    const {title, description}=req.body;
    const newTask= {title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status:'Task Updated'});
}catch(err){
    console.error(err);
    res.status(404).send(err);
    console.log("este es el pinche error"+err);
}
})

//metodo delete
router.delete('/:id', async (req, res)=>{
    try{
        await Task.findByIdAndRemove(req.params.id);
    res.json({status:'Task has been deleted'})
    }
    catch(err){
        console.error(err);
        res.status(404).send(err);
    }
})

module.exports=router;

