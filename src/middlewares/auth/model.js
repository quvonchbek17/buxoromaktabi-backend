const { fetchData } = require("../../utils/postgres");


const SELECTED_ADMIN = `
select admin_id, admin_name, admin_password, admin_role from admins where admin_name = $1 and admin_password = $2
`;

const ADMIN_BY_ID = `
 select admin_id, admin_name, admin_password, admin_role  from admins where admin_id = $1
`

const selectedAdmin = (adminName, password) => fetchData(SELECTED_ADMIN, adminName, password);
const adminById = (id) => fetchData(ADMIN_BY_ID, id);



module.exports = {
  selectedAdmin,
  adminById
};
