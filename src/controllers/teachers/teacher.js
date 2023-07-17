const { generateHash, compareHash } = require("../../utils/bcrypt");
const { v4 } = require("uuid");
const model = require("./model");


module.exports = class UsersController {

  static async GetOneTeachers(req, res, next) {
    try {
      const { id } = req.body
     const teacher = await model.selectedTeacher(id)

     if(teacher.length > 0){
      res.status(200).json({
        success: true,
        data: teacher
      })
     } else {
      res.status(200).json({
        success: false,
        message: "O'qituvchi topilmadi !!",
        data: null
      })
     }

  } catch (error) {
    next(error);
  }
}


  static async GetAllTeachers(req, res, next) {
    try {
     const teachers = await model.allTeachers()

     if(teachers.length > 0){
      res.status(200).json({
        success: true,
        data: teachers
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

static async GetPaginationTeachers(req, res, next) {
  try {
    const { page, size } = req.params
    const allTeachers = await model.allTeachers()
   const teachers = await model.paginationTeachers(size ,page == 1 || !size ? 0 : (page - 1)*size)

   if(teachers.length > 0){
    res.status(200).json({
      success: true,
      size: allTeachers.length,
      data: teachers
    })
   } else {
    res.status(200).json({
      success: false,
      size: allTeachers.length,
      message: "limitdan chiqib ketdingiz",
      data: null
    })
   }

} catch (error) {
  next(error);
}
}

    static async PostTeacher(req, res, next) {
      try {
        const { name, surname, experince, subjects, about, imgUrl } = req.body

       const created =  await model.addTeacher(name, surname, experince, subjects, about, imgUrl)

       if(created){
         res.status(200).json({
           success: true,
           message: "O'qituvchi qo'shildi !"
         })
       } else {
         res.status(409).json({
          success: false,
          message: "Bu o'qituvchi avval qo'shilgan yoki ma'lumotlarda xatolik bor !!"
         })
       }

    } catch (error) {
      next(error);
    }
  }


  static async UpdateTeacher(req, res, next) {
    try {
      const { id, name, surname, experince, subjects, about, imgUrl } = req.body

     const Data = await model.selectedTeacher(id);
     const oldData = Data[0];
     if (!oldData) {
       res.status(200).json({
         success:false,
         message: "O'qituvchi topilmadi !"
       });
       return;
     }
     const Name = name ? name : oldData.teacher_name;
     const Surname = surname ? surname : oldData.teacher_surname;
     const Experince = experince ? experince : oldData.teacher_experince;
     const Subjects = subjects ? subjects : oldData.teacher_subjects;
     const About = about ? about : oldData.teacher_about;
     const Img = imgUrl ? imgUrl : oldData.teacher_img;
     await model.updateTeacher(Name, Surname, Experince, Subjects,About,Img, id);

     res.status(200).json({
      success:true,
      message: "Ma'lumotlar yangilandi !"
    });

  } catch (error) {
    next(error);
  }
}


static async DeleteTeacher(req, res, next) {
  try {
    const { id } = req.body

   const Data = await model.selectedTeacher(id);
   const oldData = Data[0];
   if (!oldData) {
     res.status(200).json({
       success:false,
       message: "O'qituvchi topilmadi !"
     });
     return;
   } else {
    const { teacher_id, teacher_name, teacher_surname, teacher_experince, teacher_subjects, teacher_about, teacher_img } = oldData
    await model.addArchiveTeacher(teacher_name, teacher_surname, teacher_experince, teacher_subjects, teacher_about, teacher_img, teacher_id)

    await model.deleteTeacher(id)
   }


   res.status(200).json({
    success:true,
    message: "O'qituvchi o'chirildi !"
  });

} catch (error) {
  next(error);
}
}


};
