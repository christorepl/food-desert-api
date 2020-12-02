const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");


// user_saves.user_id, user_saves.save_name, user_saves.state_name, user_saves.state_abbrev, user_saves.fips, user_saves.pop, user_saves.covid_infections, user_saves.covid_deaths, user_saves.food_insecurity_rate, user_saves.ranking_fi, user_saves.poverty_rate, user_saves.ranking_pov, user_saves.trump, user_saves.biden, user_saves.ranking_repub, user_saves.ranking_dem, user_saves.white, user_saves.black, user_saves.hispanic, user_saves.asian, user_saves.other, user_saves.mixed_race, user_saves.ranking_mixed, user_saves.ranking_black, user_saves.ranking_white, user_saves.ranking_asian, user_saves.ranking_hispanic, user_saves.ranking_other

router.get("/user_save", authorization, async (req, res) => {
  try {  
    
    const user = await pool.query("SELECT users.user_name, user_saves.save_name, user_saves.state_name, user_saves.state_abbrev, user_saves.fips, user_saves.pop, user_saves.covid_infections, user_saves.covid_deaths, user_saves.food_insecurity_rate, user_saves.ranking_fi, user_saves.poverty_rate, user_saves.ranking_pov, user_saves.trump, user_saves.biden, user_saves.ranking_repub, user_saves.ranking_dem, user_saves.white, user_saves.black, user_saves.hispanic, user_saves.asian, user_saves.other, user_saves.mixed_race, user_saves.ranking_mixed, user_saves.ranking_black, user_saves.ranking_white, user_saves.ranking_asian, user_saves.ranking_hispanic, user_saves.ranking_other FROM users LEFT JOIN user_saves ON users.user_id = user_saves.user_id WHERE users.user_id = $1", [req.user.id])
    const userName = user.rows[0].user_name
    res.json(user.rows);

  } catch (error) {
    ('saves line 20', error.message);
    res.status(500).send("Server error");
  }
});

router.get("/user_save/:save", authorization, async (req, res) => {
  try {
    const { save } = req.params 
    const saves = await pool.query("SELECT * FROM user_saves WHERE user_id = $1 AND save_name = $2", [req.user.id, save])
    res.json(saves.rows)

  } catch (error) {
    console.error(error.message)
  }
})

//create a save

router.post("/user_save", authorization, async (req, res) => {
  try {
    const { save_name, state_name, state_abbrev, fips, pop, covid_infections, covid_deaths, food_insecurity_rate, ranking_fi, poverty_rate, ranking_pov, trump, biden, ranking_repub, ranking_dem, white, black, hispanic, asian, other, mixed_race, ranking_mixed, ranking_black, ranking_white, ranking_asian, ranking_hispanic, ranking_other } = req.body;
    const newSave = await pool.query(
      "INSERT INTO user_saves (user_id, save_name, state_name, state_abbrev, fips, pop, covid_infections, covid_deaths, food_insecurity_rate, ranking_fi, poverty_rate, ranking_pov, trump, biden, ranking_repub, ranking_dem, white, black, hispanic, asian, other, mixed_race, ranking_mixed, ranking_black, ranking_white, ranking_asian, ranking_hispanic, ranking_other) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28) RETURNING *",
      [req.user.id, save_name, state_name, state_abbrev, fips, pop, covid_infections, covid_deaths, food_insecurity_rate, ranking_fi, poverty_rate, ranking_pov, trump, biden, ranking_repub, ranking_dem, white, black, hispanic, asian, other, mixed_race, ranking_mixed, ranking_black, ranking_white, ranking_asian, ranking_hispanic, ranking_other]
    );
    res.json(newSave.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});



//update a save

router.put("/user_save/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { new_save_name, save_name } = req.body;
    const user = req.user.id
    
    // const checkIfSaveExists = await pool.query("SELECT save_name from user_saves WHERE save_name = $1 AND user_id = $2", [save_name, req.user.id])

    // if (checkIfSaveExists.rows.length === 0) {
    //   return res.json('something')
    // }

    // const existingSave = await pool.query("SELECT save_name FROM user_saves WHERE save_name = $1 AND user_id = $2", [new_save_name, user])

    const existingSave = await pool.query("SELECT save_name FROM user_saves WHERE save_name = $1 AND user_id = $2", [new_save_name, user])
    
    if (existingSave.rows.length > 0){
      existingSaveName = existingSave.rows[0].save_name
      if (existingSaveName){
        return res.json("New save name must differ from your current save names.")
      }
    }

    const updateSave = await pool.query(
      "UPDATE user_saves SET save_name = $1 WHERE save_name = $2 AND user_id = $3 RETURNING *",
      [new_save_name, save_name, user]
      );

    if (updateSave.rows.length === 0) {
      return res.json("This save is not yours.");
    }

    res.json("Save was updated.");

  } catch (error) {
    console.error(error.message);
  }
});


//delete one state from a save

router.delete("/user_save/state/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteState = await pool.query(
      "DELETE FROM user_saves WHERE save_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteState.rows.length === 0) {
      return res.json("This save is not yours or does not exist.");
    }

    res.json("State entry was deleted from your save.");
  } catch (error) {
    console.error(error.message);
  }
});

//delete entire save

router.delete("/user_save/save/:save", authorization, async (req, res) => {
  try {
  const { save } = req.params

  const deleteSave = await pool.query("DELETE from user_saves WHERE save_name = $1 AND user_id = $2 RETURNING *", [save, req.user.id])

  if (deleteSave.rows.length === 0) {
    return res.json("This save is not yours or does not exist.");
  }

  res.json("Save entry was deleted.");
  } catch (error) {
    console.error(error.message)
  }

})

module.exports = router;