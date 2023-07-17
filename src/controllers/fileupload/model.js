const { fetchData } = require("../../utils/postgres");

const ALL_IMGS = `
select img_id, img_url from imgs
`;

const POST_IMGS = `
Insert into imgs(img_url) values($1)
`;

const allImgs = () => fetchData(ALL_IMGS);

const addImg = async (url) => {
    return  fetchData(POST_IMGS,url);
}



module.exports = {
  addImg,
  allImgs
};
