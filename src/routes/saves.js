const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

router.get("/saved_search", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_saves.modified, user_saves.save_name, user_saves.fips, user_saves.state_names FROM users LEFT JOIN user_saves ON users.user_id = user_saves.user_id WHERE users.user_id = $1",
      [req.user.id]
    );

    res.status(200).json(user.rows);
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
      type: "DANGER",
    });
  }
});

router.get("/saved_search/:save", authorization, async (req, res) => {
  try {
    const { save } = req.params;
    const saves = await pool.query(
      "SELECT * FROM user_saves WHERE user_id = $1 AND save_name = $2",
      [req.user.id, save]
    );
    res.status(200).json(saves.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//create a save

router.post("/saved_search", authorization, async (req, res) => {
  try {
    const { save_name, fips, state_names } = req.body;

    save_name.length > 30 &&
      res.json({
        msg: "Please choose a shorter name for your save.",
        type: "WARNING",
      });

    state_names.sort();
    fips.sort((a, b) => {
      return a - b;
    });

    const checkIfSaveExists = await pool.query(
      "SELECT save_name from user_saves WHERE save_name = $1 AND user_id = $2",
      [save_name, req.user.id]
    );

    if (checkIfSaveExists.rows.length > 0) {
      return res.json({
        msg:
          "You already have a saved search with that name. Please select a different name.",
        type: "INFO",
      });
    }

    const newSave = await pool.query(
      "INSERT INTO user_saves (user_id, save_name, fips, state_names) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.user.id, save_name, fips, JSON.stringify(state_names)]
    );

    const userSaves = await pool.query(
      "SELECT users.user_name, user_saves.save_name, user_saves.fips, user_saves.state_names FROM users LEFT JOIN user_saves ON users.user_id = user_saves.user_id WHERE users.user_id = $1",
      [req.user.id]
    );

    res.status(201).json(userSaves.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//update a save

router.put("/saved_search/:save_name", authorization, async (req, res) => {
  try {
    const { save_name } = req.params;
    const { new_save_name } = req.body;
    const user = req.user.id;

    const existingSave = await pool.query(
      "SELECT save_name FROM user_saves WHERE save_name = $1 AND user_id = $2",
      [new_save_name, user]
    );

    if (existingSave.rows.length > 0) {
      existingSaveName = existingSave.rows[0].save_name;
      if (existingSaveName) {
        return res.json({
          msg:
            "You already have a save with that name! Please choose a different name.",
          type: "INFO",
        });
      }
    }

    const updateSave = await pool.query(
      "UPDATE user_saves SET save_name = $1 WHERE save_name = $2 AND user_id = $3 RETURNING *",
      [new_save_name, save_name, user]
    );

    if (updateSave.rows.length === 0) {
      return res.json({
        msg: "This save is not yours.",
        type: "DANGER",
      });
    }

    res.status(200).json(updateSave.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//delete save

router.delete("/saved_search/:save_name", authorization, async (req, res) => {
  try {
    const { save_name } = req.params;

    const deleteSave = await pool.query(
      "DELETE from user_saves WHERE save_name = $1 AND user_id = $2 RETURNING *",
      [save_name, req.user.id]
    );

    if (deleteSave.rows.length === 0) {
      return res
        .json({
          msg: "This save is not yours or does not exist.",
          type: "DANGER",
        })
        .status(401);
    }

    res
      .json({
        msg: "Save successfully deleted.",
        type: "SUCCESS",
      })
      .status(204);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
