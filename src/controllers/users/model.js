const { fetchData } = require("../../utils/postgres");


const ALL_USERS = `
select user_id, user_fullname, user_phone, user_status from users ORDER BY created_at DESC
`;

const PAGINATION_USERS = `
select user_id, user_fullname, user_phone, user_status from users ORDER BY created_at DESC LIMIT $1 OFFSET $2
`;

const SELECTED_USER_BY_ID = `
  select * from users where user_id = $1
`

const SELECTED_USER = `
select user_id, user_fullname, user_phone, user_status from users where user_id = $1
`;

const POST_USER = `
Insert into users(user_fullname, user_status, user_phone) values($1,$2,$3)
`;

const POST_ARCHIVEUSERS = `
Insert into archive_users(user_fullname, user_status, user_phone, archive_id) values($1,$2,$3,$4)
`;

const UPDATE_USER = `
Update users set updated_at = NOW(), user_fullname = $1 , user_status = $2, user_phone = $3 where user_id = $4
`;

const DELETE_USER = `
Delete from users where user_id = $1
`;

const allUsers = () => fetchData(ALL_USERS);
const paginationUsers = (limit, offset) => fetchData(PAGINATION_USERS, limit, offset);
const selectedUser = (id) => fetchData(SELECTED_USER, id);
const selectedUserById = (id) => fetchData(SELECTED_USER_BY_ID, id);

const addUser = async (name, status, phone) => fetchData(POST_USER, name, status, phone);

const addArchiveUser = async (name, status, phone, archiveId) => {
    return  fetchData(POST_ARCHIVEUSERS, name, status, phone, archiveId);
}

const updateUser = (name, status, phone, id) =>
  fetchData(UPDATE_USER , name, status, phone, id);

const deleteUser = (id) => fetchData(DELETE_USER, id);

module.exports = {
  addUser,
  allUsers,
  paginationUsers,
  selectedUser,
  selectedUserById,
  updateUser,
  addArchiveUser,
  deleteUser
};
