const db = require("./db_connection");


const getLowAmountsQuery = `
  SELECT
    ingredient_id, inci_name, trade_name, amt, expiration
  FROM 
    ingredient
  WHERE
    ingredient.low = 1 
    AND ingredient.active = 1
`

const getExpiredQuery = `
  SELECT
    ingredient_id, inci_name, trade_name, amt, expiration
  FROM 
    ingredient
  WHERE
    ingredient.expiration <= UTC_DATE()
    AND ingredient.active = 1
`

const read_inventory_search = `
  SELECT
    ingredient_id, trade_name, classifier_id, lot_num, shelf, inci_name, amt, expiration, date_received, tsca_approved, supplier, coa, msds, cost
  FROM
    ingredient
  WHERE 
    ingredient.inci_name LIKE ? AND ingredient.active = 1
`

function getLowAmounts(callback) {
  db.execute(getLowAmountsQuery, callback);
}

function getExpired(callback) {
  db.execute(getExpiredQuery, callback);
}

module.exports = { getLowAmounts, getExpired };