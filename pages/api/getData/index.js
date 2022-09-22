// import { Ref } from "faunadb"
// import faunadb from "faunadb"
const { Ref } = require("faunadb");
const faunadb = require("faunadb");

const secret = 'fnAExBeQilACTP9efVKrf-LxETfesHppCCb1FYf7'
const query = faunadb.query;
const client = new faunadb.Client({
  secret,
  domain: "db.fauna.com",
});
module.exports = async (req, res) => {
  try {
    const dbs = await client.query(
      query.Map(
        query.Paginate(query.Documents(query.Collection("todos"))),
        query.Lambda("doc", query.Get(query.Var("doc")))
      )
    );
    res.status(200).json(dbs.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};