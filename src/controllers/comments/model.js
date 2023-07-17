const { fetchData } = require("../../utils/postgres");

const ALL_COMMENTS = `
select comment_id, comment_name, comment_desc, img_url from comments ORDER BY created_at DESC
`;

const PAGINATION_COMMENTS = `
select comment_id, comment_name, comment_desc, img_url from comments ORDER BY created_at DESC LIMIT $1 OFFSET $2
`;

const SELECTED_COMMENT = `
select comment_id, comment_name, comment_desc, img_url from comments where comment_id = $1
`;



const POST_COMMENT = `
Insert into comments(comment_name, comment_desc, img_url) values($1,$2,$3)
`;

const POST_ARCHIVECOMMENT = `
Insert into archive_comments(comment_name, comment_desc, img_url, archive_id ) values($1,$2,$3,$4)
`;

const UPDATE_COMMENT = `
Update comments set updated_at = NOW(), comment_name = $1 ,comment_desc = $2, img_url = $3 where comment_id = $4
`;

const DELETE_COMMENT = `
Delete from comments where comment_id = $1
`;

const allComments = () => fetchData(ALL_COMMENTS);
const paginationComments = (limit, offset) => fetchData(PAGINATION_COMMENTS, limit, offset);
const selectedComment = (id) => fetchData(SELECTED_COMMENT, id);

const addComment = async (name, desc, imgUrl) => {
    const created = await fetchData(
        `Select * from comments where comment_name = $1 and comment_desc = $2 and img_url = $3`,
        name, desc, imgUrl
      );
      if (created.length > 0) {
        return null;
      } else {
        return  fetchData(POST_COMMENT, name, desc, imgUrl);
      }
}

const addArchiveComment = async (name, desc, imgUrl, archiveId) => {
    return  fetchData(POST_ARCHIVECOMMENT, name, desc, imgUrl, archiveId);
}

const updateComment = (name, desc, imgUrl, id) =>
  fetchData(UPDATE_COMMENT, name, desc, imgUrl, id);

const deleteComment = (id) => fetchData(DELETE_COMMENT, id);

module.exports = {
  allComments,
  paginationComments,
  addComment,
  selectedComment,
  updateComment,
  addArchiveComment,
  deleteComment
};
