const { fetchData } = require("../../utils/postgres");

const ALL_TEACHERS = `
select teacher_id, teacher_name, teacher_surname, teacher_experince, teacher_subjects, teacher_about, teacher_img from teachers ORDER BY created_at DESC
`;

const PAGINATION_TEACHERS = `
select teacher_id, teacher_name, teacher_surname, teacher_experince, teacher_subjects, teacher_about, teacher_img from teachers ORDER BY created_at DESC LIMIT $1 OFFSET $2
`;

const SELECTED_TEACHER = `
select teacher_id, teacher_name, teacher_surname, teacher_experince, teacher_subjects, teacher_about, teacher_img from teachers where teacher_id = $1 
`;

const POST_TEACHERS = `
Insert into teachers(teacher_name,teacher_surname, teacher_experince , teacher_subjects ,teacher_about, teacher_img) values($1,$2,$3,$4,$5,$6)
`;

const POST_ARCHIVETEACHERS = `
Insert into archive_teachers(teacher_name,teacher_surname, teacher_experince , teacher_subjects ,teacher_about, teacher_img, archive_id) values($1,$2,$3,$4,$5,$6,$7)
`;

const UPDATE_TEACHER = `
Update teachers set updated_at = NOW(), teacher_name = $1 ,teacher_surname = $2, teacher_experince = $3, teacher_subjects = $4, teacher_about = $5, teacher_img = $6 where teacher_id = $7
`;

const DELETE_TEACHER = `
Delete from teachers where teacher_id = $1
`;

const allTeachers = () => fetchData(ALL_TEACHERS);
const paginationTeachers = (limit, offset) => fetchData(PAGINATION_TEACHERS, limit, offset);
const selectedTeacher = (id) => fetchData(SELECTED_TEACHER, id);

const addTeacher = async (name, surname, experince, subjects, about, imgUrl) => {
    const created = await fetchData(
        `Select * from teachers where teacher_name = $1 and teacher_surname = $2 and teacher_experince = $3 and teacher_subjects = $4 and teacher_about = $5`,
        name, surname, experince, subjects, about
      );
      if (created.length > 0) {
        return null;
      } else {
        return  fetchData(POST_TEACHERS, name, surname, experince , subjects, about, imgUrl);
      }
}

const addArchiveTeacher = async (name, surname, experince, subjects, about, imgUrl, archiveId) => {
    return  fetchData(POST_ARCHIVETEACHERS, name, surname, experince , subjects, about, imgUrl, archiveId);
}

const updateTeacher = (name, surname, experince , subjects, about, imgUrl, id) =>
  fetchData(UPDATE_TEACHER, name, surname, experince , subjects, about, imgUrl, id);

const deleteTeacher = (id) => fetchData(DELETE_TEACHER, id);

module.exports = {
  addTeacher,
  allTeachers,
  paginationTeachers,
  selectedTeacher,
  updateTeacher,
  addArchiveTeacher,
  deleteTeacher
};
