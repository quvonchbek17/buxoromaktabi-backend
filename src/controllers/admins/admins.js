const { generateHash, compareHash } = require("../../utils/bcrypt");
const { v4 } = require("uuid");
const model = require("./model");



module.exports = class UsersController {


  static async GetAllAdmins(req, res, next) {
    try {
     const admins = await model.allAdmins()
     const { user } = req

     if(admins.length > 0){
      res.status(200).json({
        success: true,
        data: admins.filter(e => e.admin_role === "admin")
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

static async GetPaginationAdmins(req, res, next) {
  try {

    const { page, size } = req.params
    const { user } = req


   const admins = await model.paginationAdmins(size ,page == 1 || !size ? 0 : (page - 1)*size)
   const allAdmins = await model.allAdmins()

   if(admins.length > 0){
    res.status(200).json({
      success: true,
      size: allAdmins.length,
      data: admins.filter(e => e.admin_role === "admin")
    })
   } else {
    res.status(200).json({
      success: false,
      size: allAdmins.length,
      message: "Limitdan chiqib ketdingiz",
      data: null
    })
   }

} catch (error) {
  next(error);
}
}

    static async PostAdmin(req, res, next) {
      try {
        const { adminName, password} = req.body

       const created =  await model.addAdmin(adminName , password, "admin")

       if(created){
         res.status(200).json({
           success: true,
           message: "Admin qo'shildi !"
         })
       } else {
         res.status(409).json({
          success: false,
          message: "Bu adminname band !!"
         })
       }

    } catch (error) {
      next(error);
    }
  }


  static async AdminUpdateCheck(req, res, next) {
    try {
      const { password } = req.body
      const { user } = req

     if(password == user?.admin_password){
      res.status(200).json({
        success: true,
        message: " Login, parolni o'zgartirishga ruxsat berish mumkin !"
      })
     } else {
      res.status(200).json({
        success: false,
        message: "Parol xato !!!"
      })
     }

  } catch (error) {
    next(error);
  }
}


  static async UpdateAdmin(req, res, next) {
    try {
      const { adminName, password } = req.body
      const { user } = req

     const Data = await model.selectedAdminById(user.admin_id);
     const oldData = Data[0];
     if (!oldData) {
       res.status(200).json({
         success:false,
         message: "Admin topilmadi !"
       });
       return;
     }
     const AdminName = adminName ? adminName : oldData.admin_name;
     const Password = password ? password : oldData.admin_password;
     await model.updateAdmin(AdminName, Password, user.admin_id);

     res.status(200).json({
      success:true,
      message: "Ma'lumotlar yangilandi !"
    });

  } catch (error) {
    next(error);
  }
}


static async DeleteAdmin(req, res, next) {
  try {
    const { id } = req.body

   const Data = await model.selectedAdminById(id);
   const oldData = Data[0];
   if (!oldData) {
     res.status(200).json({
       success:false,
       message: "Admin topilmadi !"
     });
     return;
   } else {
    const { admin_id, admin_name, admin_role, admin_password, created_at, updated_at } = oldData
    await model.addArchiveAdmin(admin_name, admin_password, admin_role, admin_id, created_at, updated_at)

    await model.deleteAdmin(id)
   }


   res.status(200).json({
    success:true,
    message: "Admin o'chirildi !"
  });

} catch (error) {
  next(error);
}
}


};
