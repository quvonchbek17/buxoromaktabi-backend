const { generateHash, compareHash } = require("../../utils/bcrypt");
const { v4 } = require("uuid");
const model = require("./model");



module.exports = class UsersController {


  static async GetAllComments(req, res, next) {
    try {
     const comments = await model.allComments()

     if(comments.length > 0){
      res.status(200).json({
        success: true,
        data: comments
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

static async GetOneComment(req, res, next) {
    try {
      const { id } = req.body
     const comment = await model.selectedComment(id)

     if(comment.length > 0){
      res.status(200).json({
        success: true,
        data: comment
      })
     } else {
      res.status(200).json({
        success: false,
        message: "Izoh topilmadi !!",
        data: null
      })
     }

  } catch (error) {
    next(error);
  }
}

static async GetPaginationComments(req, res, next) {
  try {

    const { page, size } = req.params
    const { user } = req

    const Allcomments = await model.allComments()
   const comments = await model.paginationComments(size ,page == 1 || !size ? 0 : (page - 1)*size)

   if(comments.length > 0){
    res.status(200).json({
      success: true,
      size: Allcomments.length,
      data: comments
    })
   } else {
    res.status(200).json({
      success: false,
      size: Allcomments.length,
      message: "Limitdan chiqib ketdingiz",
      data: null
    })
   }

} catch (error) {
  next(error);
}
}

    static async PostComment(req, res, next) {
      try {
        const { name, desc, imgUrl} = req.body

       const created =  await model.addComment(name, desc, imgUrl)

       if(created){
         res.status(200).json({
           success: true,
           message: "Izoh qo'shildi !"
         })
       } else {
         res.status(409).json({
          success: false,
          message: "Bu izoh avval qo'shilgan !!"
         })
       }

    } catch (error) {
      next(error);
    }
  }



  static async UpdateComment(req, res, next) {
    try {
      const { id, name, desc, imgUrl  } = req.body

     const Data = await model.selectedComment(id);
     const oldData = Data[0];
     if (!oldData) {
       res.status(200).json({
         success:false,
         message: "Izoh topilmadi !"
       });
       return;
     }
     const Name = name ? name : oldData.comment_name;
     const Desc = desc ? desc : oldData.comment_desc;
     const ImgUrl = imgUrl ? imgUrl : oldData.img_url;
     await model.updateComment(Name, Desc, ImgUrl, id);

     res.status(200).json({
      success:true,
      message: "Ma'lumotlar yangilandi !"
    });

  } catch (error) {
    next(error);
  }
}


static async DeleteComment(req, res, next) {
  try {
    const { id } = req.body

   const Data = await model.selectedComment(id);
   const oldData = Data[0];
   if (!oldData) {
     res.status(200).json({
       success:false,
       message: "Izoh topilmadi !"
     });
     return;
   } else {
    const { comment_id, comment_name, comment_desc, img_url } = oldData
    await model.addArchiveComment(comment_name, comment_desc, img_url, comment_id)

    await model.deleteComment(id)
   }


   res.status(200).json({
    success:true,
    message: "Izoh o'chirildi !"
  });

} catch (error) {
  next(error);
}
}


};
