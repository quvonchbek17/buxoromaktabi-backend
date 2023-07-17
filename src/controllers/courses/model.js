const { fetchData } = require("../../utils/postgres");

const ALL_COURSES = `
select c.course_id, c.course_name, c.course_status, c.course_price, c.course_like, c.course_desc, c.course_img, t.teacher_id, t.teacher_name, t.teacher_surname, t.teacher_experince, t.teacher_subjects, t.teacher_about, t.teacher_img from courses c inner join teachers t on  t.teacher_id = c.teacher_id ORDER BY c.created_at DESC
`;

const PAGINATION_COURSES = `
select c.course_id, c.course_name, c.course_status, c.course_price, c.course_like, c.course_desc, c.course_img, t.teacher_id, t.teacher_name, t.teacher_surname, t.teacher_experince, t.teacher_subjects, t.teacher_about, t.teacher_img from courses c inner join teachers t on  t.teacher_id = c.teacher_id ORDER BY c.created_at DESC LIMIT $1 OFFSET $2
`;



const SELECTED_COURSE = `
select c.course_id, c.course_name, c.course_status, c.course_price, c.course_like, c.course_desc, c.course_img, t.teacher_id, t.teacher_name, t.teacher_surname, t.teacher_experince, t.teacher_subjects, t.teacher_about, t.teacher_img from courses c inner join teachers t on  t.teacher_id = c.teacher_id  where course_id = $1
`;

const POST_COURSES = `
Insert into courses(course_name, course_status, course_price, course_like, course_desc, course_img, teacher_id) values($1,$2,$3,$4,$5,$6,$7)
`;

const POST_ARCHIVECOURSE = `
Insert into archive_courses(course_name, course_status, course_price, course_like, course_desc, course_img, teacher_id, archive_id) values($1,$2,$3,$4,$5,$6,$7,$8)
`;

const UPDATE_COURSE = `
Update courses set updated_at = NOW(), course_name = $1 ,course_status = $2, course_price = $3, course_like = $4, course_desc = $5, course_img = $6, teacher_id = $7 where course_id = $8
`;

const DELETE_COURSE = `
Delete from courses where course_id = $1
`;

const allCourse = () => fetchData(ALL_COURSES);
const paginationCourse = (limit, offset) => fetchData(PAGINATION_COURSES, limit, offset);
const selectedCourse = (id) => fetchData(SELECTED_COURSE, id);


const addCourse = async (name, status, price, like, desc, imgUrl, teacherId) => {
    const created = await fetchData(
        `Select * from courses where course_name = $1 and course_status = $2 and course_price = $3 and course_like = $4 and course_desc = $5 and course_img = $6 and teacher_id = $7`,
        name, status, price, like, desc, imgUrl, teacherId
      );
      if (created.length > 0) {
        return null;
      } else {
        return  fetchData(POST_COURSES,name, status, price, like, desc, imgUrl, teacherId);
      }
}

const addArchiveCourse = async (Name, Status, Price, Like,Desc,Img,TeacherId, archiveId) => {
    return  fetchData(POST_ARCHIVECOURSE, Name, Status, Price, Like,Desc,Img,TeacherId, archiveId);
}


const updateCourse = (Name, Status, Price, Like,Desc,Img,TeacherId, id) =>
  fetchData(UPDATE_COURSE, Name, Status, Price, Like,Desc,Img,TeacherId, id);

const deleteCourse = (id) => fetchData(DELETE_COURSE, id);

module.exports = {
  addCourse,
  paginationCourse,
  selectedCourse,
  allCourse,
  updateCourse,
  addArchiveCourse,
  deleteCourse

};
