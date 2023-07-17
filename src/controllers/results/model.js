const { fetchData } = require("../../utils/postgres");



const ALL_RESULTS = `
select result_id, result_fullname, result_year, result_university, result_points, result_status from results ORDER BY result_points DESC `;

const PAGINATION_RESULTS = `
select result_id, result_fullname, result_year, result_university, result_points, result_status from results ORDER BY result_points DESC LIMIT $1 OFFSET $2`;

const SELECTED_RESULT = `
select result_id, result_fullname, result_year, result_university, result_points, result_status from results where result_id = $1
`;

const POST_RESULT = `
Insert into results(result_fullname, result_year, result_university, result_points, result_status) values($1,$2,$3,$4,$5)
`;

const POST_ARCHIVERESULT = `
Insert into archive_results(result_fullname, result_year, result_university, result_points, result_status, archive_id) values($1,$2,$3,$4,$5,$6)
`;

const UPDATE_RESULT = `
Update results set updated_at = NOW(), result_fullname = $1 ,result_year = $2, result_university = $3, result_points = $4, result_status = $5 where result_id = $6
`;

const DELETE_RESULT = `
Delete from results where result_id = $1
`;

const allResults = () => fetchData(ALL_RESULTS);
const paginationResults = (limit, offset) => fetchData(PAGINATION_RESULTS, limit, offset);
const selectedResult = (id) => fetchData(SELECTED_RESULT, id);

const addResult = async (fullname, year, university, points, status) => {
    const created = await fetchData(
        `Select * from results where result_fullname = $1 and result_year = $2 and result_university = $3 and result_points = $4 and result_status = $5`,
        fullname, year, university, points, status
      );
      if (created.length > 0) {
        return null;
      } else {
        return  fetchData(POST_RESULT, fullname, year, university, points, status);
      }
}

const addArchiveResult = async (fullname, year, university, points, status, archiveId) => {
    return  fetchData(POST_ARCHIVERESULT, fullname, year, university, points, status, archiveId);
}

const updateResult = (fullname, year, university, points, status, id) =>
  fetchData(UPDATE_RESULT, fullname, year, university, points, status, id);

const deleteResult = (id) => fetchData(DELETE_RESULT, id);

module.exports = {
  addResult,
  paginationResults,
  allResults,
  selectedResult,
  updateResult,
  addArchiveResult,
  deleteResult
};
