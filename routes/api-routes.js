const router = require('express').Router();
const { v4: uuidv4 } = require('uuid'); //Importing uuidv4 from uuid package
const fs = require('fs');


//Route for GET request
router.get('/api/notes', async (req, res) => {
  const dbJson = await JSON.parse(fs.readFileSync("db/db.json", "utf8"));
  res.json(dbJson);
});

//Route for POST request
router.post('/api/notes', (req, res) => {
  const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8"));
  const newFeedback = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  //Adding new note to end of array
  dbJson.push(newFeedback);
  fs.writeFileSync("db/db.json",JSON.stringify(dbJson));
  res.json(dbJson);
});

//Route for ability to delete notes
router.delete('/api/notes/:id', (req, res) => {
  let data = fs.readFileSync("db/db.json", "utf8");
  const dataJSON =  JSON.parse(data);
  const newNotes = dataJSON.filter((note) => { 
    return note.id !== req.params.id;
  });

  fs.writeFileSync("db/db.json",JSON.stringify(newNotes)); //Converting new notes into a string
  res.json("Note deleted.");
});

module.exports= router;
