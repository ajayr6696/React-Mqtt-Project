import { db } from "../db.js";

export const getStaffs = (req, res) => {
    const q = "SELECT * FROM staffs";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
};

export const updateStaffs = (req, res) => {
    const q = "'UPDATE staffs SET name = ? WHERE id = ?'";

    const values = [req.body.name, req.body.id];
  
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
};

export const deleteStaffs = (req, res) => {
    const q = "'DELETE FROM staffs WHERE id = ?'";

    const values = [ req.body.id];
  
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
};

export const addStaffs = (req, res) => {
    const q = "'INSERT INTO posts(`id`, `name`) VALUES (?)'";

    const values = [ req.body.id, req.body.name];
  
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
};