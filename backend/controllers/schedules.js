import { db } from "../db.js";

export const getSchedules = (req, res) => {
    const q = "SELECT * FROM schedules";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
};

export const updateSchedules = (req, res) => {
    const q = "'UPDATE schedules SET title = ? WHERE id = ?'";

    const values = [req.body.title, req.body.desc];
  
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
};