const { fetchData } = require("../../utils/postgres");
const { PostAdmin } = require("../admins/admins");


const SELECTED_ADMIN = `
select admin_id, admin_name, admin_password, admin_role from admins where admin_name = $1 and admin_password = $2
`;

const POST_SESSION = `
Insert into admin_sessions( admin_id, admin_name, admin_password, session_remoteip, session_device) values($1,$2,$3,$4,$5)
`;


const selectedAdmin = (adminName, password) => fetchData(SELECTED_ADMIN, adminName, password);
const postSession = (adminId, name, password, ip, device) => fetchData(POST_SESSION, adminId, name, password, ip, device);

module.exports = {
  selectedAdmin,
  postSession
};
