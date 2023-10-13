const express = require('express');
const router = express.Router();
const Notes = require('../models/notes');
const passport = require('passport');
const mongoose = require('mongoose');

router.get('/dashboard', passport.checkAuthentication, async function(req, res, next) {
    try {
        const perPage = 12;
        const page = parseInt(req.query.page) || 1;

        const notes = await Notes.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id)  // Fixed this line
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $project: {
                    title: { $substr: ['$title', 0, 30] },
                    body: { $substr: ['$body', 0, 50] }
                }
            },
            {
                $skip: (page - 1) * perPage
            },
            {
                $limit: perPage
            }
        ]).exec();

        const count = await Notes.countDocuments({ user: new mongoose.Types.ObjectId(req.user.id) });

        res.render('dashboard_index', {
            title: 'NodeJs Notes App Dashboard',
            layout: '../views/dashboard',
            notes,
            current: page,
            pages: Math.ceil(count / perPage)
        });
    } catch (error) {
        next(error);
    }
});

router.get('/dashboard/item/:id',passport.checkAuthentication,async function(req,res){
    const note = await Notes.findById(req.params.id);4
    if(note){
        return res.render('view_notes',{
            title:'Your Notes',
            noteID:req.params.id,
            note,
            layout:'../views/dashboard',
        })
    }else{
        res.send("error")
    }
})
router.post('/dashboard/item/update/:id', passport.checkAuthentication, async function (req, res) {
    try {
      const updatedNote = await Notes.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          body: req.body.body
        },
        { new: true } // Set { new: true } to return the updated document
      );
  
      if (updatedNote) {
        return res.redirect('back');
      } else {
        return res.send('Note not found.');
      }
    } catch (error) {
      console.error('Error updating note:', error);
      return res.status(500).send('An error occurred while updating the note.');
    }
  });

  router.post('/dashboard/item-delete/:id', passport.checkAuthentication, async function(req, res) {
    try {
      let id = req.params.id;
      let note = await Notes.findByIdAndDelete({ _id: id }); // Corrected: pass an object with _id property
      return res.redirect('/dashboard');
    } catch (err) {
      console.log("error", err);
    }
  });
  router.get('/dashboard/add',passport.checkAuthentication,function(req,res){
    return res.render('add_notes',{
        title:'Your Notes',
        layout:'../views/dashboard',
    })
  })
  router.post('/dashboard/item/create',passport.checkAuthentication, async (req, res) => {
    const { title, body } = req.body;
  
    try {
      const newNote = new Notes({
        title,
        body,
        user: req.user._id
      });
      console.log(newNote);
      await newNote.save();
      return res.redirect('/dashboard');
    } catch (error) {
      console.error('Error creating note:', error);
      return res.status(500).json({ error: 'An error occurred while creating the note' });
    }
  });

module.exports = router;
