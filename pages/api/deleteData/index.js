const { Ref } = require("faunadb");
const faunadb = require("faunadb");
const secret = "fnAExBeQilACTP9efVKrf-LxETfesHppCCb1FYf7";
const q = faunadb.query;
const client = new faunadb.Client({ secret });

module.exports = async (req, res) => {
  const id = req.body.id;
  try {
    const dbs = await client.query(
      q.Delete(q.Ref(q.Collection("todos"), id))
    );
    res.status(200).json(dbs.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};