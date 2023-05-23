const todos = ["gras afrijden", "tv kijken", "blbalbalabl"];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.json(todos);
  }
  if (req.method === "POST") {
    todos.push(JSON.parse(req.body).todo);
    res.json(todos);
  }
}
