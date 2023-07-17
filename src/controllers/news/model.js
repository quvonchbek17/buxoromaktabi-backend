const { fetchData } = require("../../utils/postgres");

const ALL_NEWS = `
select news_id, news_img, news_data, news_view, news_title, news_desc from news ORDER BY created_at DESC
`;

const PAGINATION_NEWS = `
select news_id, news_img, news_data, news_view, news_title, news_desc from news ORDER BY created_at DESC LIMIT $1 OFFSET $2
`;

const SELECTED_NEWS = `
select news_id, news_img, news_data, news_view, news_title, news_desc from news where news_id = $1
`;

const POST_NEWS = `
Insert into news(news_img, news_data, news_view, news_title, news_desc) values($1,$2,$3,$4,$5)
`;

const POST_ARCHIVENEWS = `
Insert into archive_news( news_img, news_data, news_view, news_title, news_desc, archive_id) values($1,$2,$3,$4,$5,$6)
`;

const UPDATE_NEWS = `
Update news set updated_at = NOW(), news_img = $1 ,news_data = $2, news_view = $3, news_title = $4, news_desc = $5 where news_id = $6
`;

const UPDATE_VIEW_ONE = `
Update news set updated_at = NOW(), news_view = news_view + 1  where news_id = $1
`;

const UPDATE_VIEW_ALL = `
Update news set updated_at = NOW(), news_view = news_view + 1
`;

const DELETE_NEWS = `
Delete from news where news_id = $1
`;

const allNews = () => fetchData(ALL_NEWS);
const paginationNews = ( limit, offset ) => fetchData(PAGINATION_NEWS, limit, offset);
const selectedNews = (id) => fetchData(SELECTED_NEWS, id);

const addNews = async (img, data, view, title, desc) => {
    const created = await fetchData(
        `Select * from news where news_img = $1 and news_data = $2 and news_view = $3 and news_title = $4 and news_desc = $5`,
        img, data, view, title, desc
      );
      if (created.length > 0) {
        return null;
      } else {
        return  fetchData(POST_NEWS, img, data, view, title, desc);
      }
}

const addArchiveNews = async (img, data, view, title, desc, archiveId) => {
    return  fetchData(POST_ARCHIVENEWS, img, data, view, title, desc, archiveId);
}

const updateNews = (img, data, view, title, desc, id) =>
  fetchData(UPDATE_NEWS, img, data, view, title, desc, id);

  const updateViewAll = () =>
  fetchData(UPDATE_VIEW_ALL);

  const updateViewOne = (id) =>
  fetchData(UPDATE_VIEW_ONE, id);

const deleteNews = (id) => fetchData(DELETE_NEWS, id);

module.exports = {
  addNews,
  paginationNews,
  allNews,
  selectedNews,
  updateNews,
  addArchiveNews,
  deleteNews,
  updateViewAll,
  updateViewOne
};
