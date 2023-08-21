import { db } from "../db.js";

export const getPeriods = (req, res) => {
    const q = "SELECT * FROM periods";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
  };

  export const updatePeriods = (req, res) => {
    const q = "'UPDATE periods SET name = ? WHERE id = ?'";

    const values = [req.body.name, req.body.id];
  
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
};