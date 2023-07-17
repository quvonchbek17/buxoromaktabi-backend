const { generateHash, compareHash } = require("../../utils/bcrypt");
const { v4 } = require("uuid");
const model = require("./model");


module.exports = class UsersController {

  static async GetOneCourses(req, res, next) {
    try {
      const { id } = req.body
     const course = await model.selectedCourse(id)

     if(course.length > 0){
      res.status(200).json({
        success: true,
        data: course
      })
     } else {
      res.status(200).json({
        success: false,
        message: "Kurs topilmadi !!",
        data: null
      })
     }

  } catch (error) {
    next(error);
  }
}


  static async GetAllCourses(req, res, next) {
    try {
     const Courses = await model.allCourse()

     if(Courses.length > 0){
      res.status(200).json({
        success: true,
        data: Courses
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

static async GetPaginationCourses(req, res, next) {
  try {

    const { page, size } = req.params

    const allCourses = await model.allCourse()
   const Courses = await model.paginationCourse(size , page == 1 || !size ? 0 : (page - 1)*size)

   if(Courses.length > 0){
    res.status(200).json({
      success: true,
      size: allCourses.length,
      data: Courses
    })
   } else {
    res.status(200).json({
      success: false,
      size: allCourses.length,
      message: "limitdan chiqib ketdingiz" ,
      data: null
    })
   }

} catch (error) {
  next(error);
}
}

    static async PostCourse(req, res, next) {
      try {
        const { name, status, price, like, desc, imgUrl, teacherId } = req.body

       const created =  await model.addCourse(name, true , price, like, desc, imgUrl, teacherId)

       if(created){
         res.status(200).json({
           success: true,
           message: "Kurs qo'shildi !"
         })
       } else {
         res.status(409).json({
          success: false,
          message: "Bu kurs avval qo'shilgan yoki ma'lumotlarda xatolik bor !!"
         })
       }

    } catch (error) {
      next(error);
    }
  }


  static async UpdateCourse(req, res, next) {
    try {
      const { id, name, status, price, like, desc, imgUrl, teacherId } = req.body

     const Data = await model.selectedCourse(id);
     const oldData = Data[0];
     if (!oldData) {
       res.status(200).json({
         success: false,
         message: "Kurs topilmadi !"
       });
       return;
     }
     const Name = name ? name : oldData.teacher_name;
     const Status = (typeof status) == "boolean" ? status : oldData.course_status;
     const Price = price ? price : oldData.course_price;
     const Like = like ? like : oldData.course_like;
     const Desc = desc ? desc : oldData.course_desc;
     const Img = imgUrl ? imgUrl : oldData.teacher_img;
     const TeacherId = teacherId ? teacherId : oldData.teacher_id;
     await model.updateCourse(Name, Status, Price, Like,Desc,Img,TeacherId, id);

     res.status(200).json({
      success:true,
      message: "Ma'lumotlar yangilandi !"
    });

  } catch (error) {
    next(error);
  }
}


static async DeleteCourse(req, res, next) {
  try {
    const { id } = req.body

   const Data = await model.selectedCourse(id);
   const oldData = Data[0];
   if (!oldData) {
     res.status(200).json({
       success:false,
       message: "Kurs topilmadi !"
     });
     return;
   } else {
    const { course_id, course_name, course_status, course_price, course_like, course_desc, course_img, teacher_id } = oldData
    await model.addArchiveCourse(course_name, course_status, course_price, course_like, course_desc, course_img, teacher_id, course_id)

    await model.deleteCourse(id)
   }


   res.status(200).json({
    success:true,
    message: "Kurs o'chirildi !"
  });

} catch (error) {
  next(error);
}
}


};
