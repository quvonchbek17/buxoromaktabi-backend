const { generateHash, compareHash } = require("../../utils/bcrypt");
const { v4 } = require("uuid");
const model = require("./model");


module.exports = class UsersController {

  static async GetOneUsers(req, res, next) {
    try {
      const { id } = req.body
     const user = await model.selectedUser(id)

     if(user.length > 0){
      res.status(200).json({
        success: true,
        data: user
      })
     } else {
      res.status(200).json({
        success: false,
        message: "Foydalanuvchi topilmadi. Foydalanuvchi ro'yhatdan o'tgan guruh yoki o'qituvchi o'chirilgan bo'lishi mumkin",
        data: null
      })
     }

  } catch (error) {
    next(error);
  }
}


  static async GetAllUsers(req, res, next) {
    try {
     const users = await model.allUsers()

     if(users.length > 0){
      res.status(200).json({
        success: true,
        data: users
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

static async GetPaginationUsers(req, res, next) {
  try {

    const { page, size } = req.params
    const allUsers = await model.allUsers()
   const users = await model.paginationUsers(size ,page == 1 || !size ? 0 : (page - 1)*size)

   if(users.length > 0){
    res.status(200).json({
      success: true,
      size: allUsers.length,
      data: users
    })
   } else {
    res.status(200).json({
      success: false,
      size: allUsers.length,
      message: "limitdan chiqib ketdingiz",
      data: null
    })
   }

} catch (error) {
  next(error);
}
}

    static async PostUser(req, res, next) {
      try {
        const { fullname, phone } = req.body

       const created =  await model.addUser(fullname, true , phone)

       if(created){
         res.status(200).json({
           success: true,
           message: "Foydalanuvchi qo'shildi !"
         })
       } else {
         res.status(409).json({
          success: false,
          message: "Ma'lumotlarda xatolik bor !!"
         })
       }

    } catch (error) {
      next(error);
    }
  }


  static async UpdateUser(req, res, next) {
    try {
      const { fullname, status, phone, id } = req.body

     const Data = await model.selectedUser(id);
     const oldData = Data[0];
     if (!oldData) {
       res.status(200).json({
         success:false,
         message: "Foydalanuvchi topilmadi !"
       });
       return;
     }
     const Name = fullname ? fullname : oldData.user_fullname;
     const Status =  (typeof status) == "boolean" ? status : oldData.user_status;
     const Phone = phone ? phone : oldData.user_phone;
     await model.updateUser(Name, Status, Phone, id);

     res.status(200).json({
      success:true,
      message: "Ma'lumotlar yangilandi !"
    });

  } catch (error) {
    next(error);
  }
}


static async DeleteUser(req, res, next) {
  try {
    const { id } = req.body

   const Data = await model.selectedUserById(id);
   const oldData = Data[0];
   if (!oldData) {
     res.status(200).json({
       success:false,
       message: "Foydalanuvchi topilmadi !"
     });
     return;
   } else {
    const { user_id, user_fullname, user_status, user_phone} = oldData
    await model.addArchiveUser(user_fullname, user_status, user_phone, user_id)

    await model.deleteUser(id)
   }


   res.status(200).json({
    success:true,
    message: "Foydalanuvchi o'chirildi !"
  });

} catch (error) {
  next(error);
}
}


};
