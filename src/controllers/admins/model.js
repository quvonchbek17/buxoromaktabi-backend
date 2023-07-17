const { fetchData } = require("../../utils/postgres");

const ALL_ADMINS = `
select admin_id, admin_name, admin_password, admin_role from admins ORDER BY created_at DESC
`;

const PAGINATION_ADMINS = `
select admin_id, admin_name, admin_password, admin_role from admins ORDER BY created_at DESC LIMIT $1 OFFSET $2
`;

const SELECTED_ADMINBYNAME = `
select admin_id, admin_name, admin_password from admins where admin_name = $1
`;

const SELECTED_ADMINBYID = `
select admin_id, admin_name, admin_password, admin_role, created_at, updated_at from admins where admin_id = $1
`;

const SELECTED_ADMIN = `
select admin_id, admin_name, admin_password from admins where admin_name = $1 and admin_password = $2
`;

const POST_ADMIN = `
Insert into admins(admin_name, admin_password, admin_role) values($1,$2,$3)
`;

const POST_ARCHIVEADMINS = `
Insert into archive_admins(admin_name, admin_password, admin_role, archive_id , archive_created, archive_updated) values($1,$2,$3,$4,$5,$6)
`;

const UPDATE_ADMIN = `
Update admins set updated_at = NOW(), admin_name = $1 ,admin_password = $2 where admin_id = $3
`;

const DELETE_ADMIN = `
Delete from admins where admin_id = $1
`;

const allAdmins = () => fetchData(ALL_ADMINS);
const paginationAdmins = (limit, offset) => fetchData(PAGINATION_ADMINS, limit, offset);
const selectedAdminByName = (name) => fetchData(SELECTED_ADMINBYNAME, name);
const selectedAdminById = (id) => fetchData(SELECTED_ADMINBYID, id);
const selectedAdmin = (name,password) => fetchData(SELECTED_ADMIN, name, password);

const addAdmin = async (name, password, role) => {
    const created = await fetchData(
        `Select * from admins where admin_name = $1 `,
        name
      );
      if (created.length > 0) {
        return null;
      } else {
        return  fetchData(POST_ADMIN, name, password, role);
      }
}

const addArchiveAdmin = async (name, password, adminRole, archiveId, archiveCreated, archiveUpdated) => {
    return  fetchData(POST_ARCHIVEADMINS, name, password, adminRole, archiveId, archiveCreated, archiveUpdated);
}

const updateAdmin = (name, password, id) =>
  fetchData(UPDATE_ADMIN, name, password, id);

const deleteAdmin = (id) => fetchData(DELETE_ADMIN, id);

module.exports = {
  allAdmins,
  paginationAdmins,
  addAdmin,
  selectedAdmin,
  selectedAdminByName,
  selectedAdminById,
  updateAdmin,
  addArchiveAdmin,
  deleteAdmin
};
