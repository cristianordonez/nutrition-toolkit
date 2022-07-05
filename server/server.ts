import app from './app'; //split up app & server so tests dont start listening
const port = 8080;

//START SERVER
app.listen(port, () => {
   console.log(`App listening on port ${port}`);
});
