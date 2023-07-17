const { generateHash, compareHash } = require("../../utils/bcrypt");
const { v4 } = require("uuid");
const model = require("./model");
const { DeleteFile } = require("../fileupload/fileupload");


module.exports = class UsersController {

  static async GetOneNews(req, res, next) {
    try {
      const { id } = req.body
     const news = await model.selectedNews(id)

     await model.updateViewOne(id)

     if(news.length > 0){
      res.status(200).json({
        success: true,
        data: news
      })
     } else {
      res.status(200).json({
        success: false,
        data: null
      })
     }

  } catch (error) {
    next(error);
  }
}


  static async GetAllNews(req, res, next) {
    try {
     const news = await model.allNews()

     await model.updateViewAll()

     if(news.length > 0){
      res.status(200).json({
        success: true,
        data: news
      })
     } else {
      res.status(200).json({
        success: false,
        data: null
      })
     }

  } catch (error) {
    next(error);
  }
}

static async GetPaginationNews(req, res, next) {
  try {
    const { page, size } = req.params
    const allNews = await model.allNews()
    const news = await model.paginationNews(size ,page == 1 || !size ? 0 : (page - 1)*size)

    await model.updateViewAll()

   if(news.length > 0){
    res.status(200).json({
      success: true,
      size: allNews.length,
      data: news
    })
   } else {
    res.status(200).json({
      success: false,
      size: allNews.length,
      message: "Limitdan chiqib ketdingiz",
      data: null
    })
   }

} catch (error) {
  next(error);
}
}

    static async PostNews(req, res, next) {
      try {
        const {imgUrl, data, view, title, desc } = req.body

       const created =  await model.addNews(imgUrl, data, 0, title, desc)

       if(created){
         res.status(200).json({
           success: true,
           message: "Yangilik qo'shildi !"
         })
       } else {
         res.status(409).json({
          success: false,
          message: "Bu yangilik avval qo'shilgan yoki ma'lumotlarda xatolik bor !!"
         })
       }

    } catch (error) {
      next(error);
    }
  }


  static async UpdateNews(req, res, next) {
    try {
      const { id, imgUrl, data, title, desc } = req.body

     const Data = await model.selectedNews(id);
     const oldData = Data[0];
     if (!oldData) {
       res.status(200).json({
         success:false,
         message: "Yangilik topilmadi !"
       });
       return;
     }

     if(imgUrl){
      await DeleteFile(oldData.news_img)
     }
     const Img = imgUrl ? imgUrl : oldData.news_img;
     const DATA = data ? data : oldData.news_data;
     const View = oldData.news_view;
     const Title = title ? title : oldData.news_title;
     const Desc = desc ? desc : oldData.news_desc;
     await model.updateNews(Img, DATA, View, Title, Desc, id);

     res.status(200).json({
      success:true,
      message: "Ma'lumotlar yangilandi !"
    });

  } catch (error) {
    next(error);
  }
}


static async DeleteNews(req, res, next) {
  try {
    const { id } = req.body

   const Data = await model.selectedNews(id);
   const oldData = Data[0];
   if (!oldData) {
     res.status(200).json({
       success:false,
       message: "Yangilik topilmadi !"
     });
     return;
   } else {
    const { news_id, news_img, news_data, news_view, news_title, news_desc } = oldData
    await model.addArchiveNews(news_img, news_data, news_view, news_title, news_desc, news_id)

    await DeleteFile(news_img)

    await model.deleteNews(id)
   }


   res.status(200).json({
    success:true,
    message: "Yangilik o'chirildi !"
  });

} catch (error) {
  next(error);
}
}


};
