const express = require("express");
const { PORT } = require("./src/config");
const app = express();
const bodyParser = require('body-parser');

app.use(
  express.static("static", {
    index: "hello.html",
  })
);
app.use(bodyParser.json());

const issues = [
  {
    id: 1,
    status: "Open",
    owner: "Ravan",
    created: new Date("2016-08-15"),
    effort: 5,
    completionDate: undefined,
    title: "Error in console when clicking Add",
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    created: new Date("2016-08-16"),
    effort: 14,
    completionDate: new Date("2016-08-30"),
    title: "Missing bottom border on panel",
  },
];

app.get("/api/issues", (req, res) => {
  const metadata = { total_count: issues.length };
  console.log(req.headers.accept);
  res.set('Content-Type','application/json');
  res.send(JSON.stringify({ _metadata: metadata, records: issues }))
  // res.status(200).json({ _metadata: metadata, records: issues });
});

app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.id = issues.length + 1;
  newIssue.created = new Date();
  if(!newIssue.status){
    newIssue.status = 'New';
  }

  issues.push(newIssue);
  res.json(newIssue);
})

app.listen(PORT, function () {
  console.log(`Listening on PORT: ${PORT}`);
});
