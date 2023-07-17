const { generateHash, compareHash } = require("../../utils/bcrypt");
const { v4 } = require("uuid");
const model = require("./model");


module.exports = class UsersController {

  static async GetOneResults(req, res, next) {
    try {
      const { id } = req.body
     const result = await model.selectedResult(id)

     if(result.length > 0){
      res.status(200).json({
        success: true,
        data: result
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


  static async GetAllResults(req, res, next) {
    try {
     const results = await model.allResults()

     if(results.length > 0){
      res.status(200).json({
        success: true,
        data: results
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

static async GetPaginationResults(req, res, next) {
  try {
    const { page, size } = req.params

    const allResults = await model.allResults()
   const results = await model.paginationResults(size ,page == 1 || !size ? 0 : (page - 1)*size)

   if(results.length > 0){
    res.status(200).json({
      success: true,
      size: allResults.length,
      data: results
    })
   } else {
    res.status(200).json({
      success: false,
      size: allResults.length,
      message: "Limitdan chiqib ketdingiz",
      data: null
    })
   }

} catch (error) {
  next(error);
}
}

    static async PostResult(req, res, next) {
      try {
        const { fullname, year, university, points, status } = req.body

       const created =  await model.addResult(fullname, year, university, points, status)

       if(created){
         res.status(200).json({
           success: true,
           message: "Natija qo'shildi !"
         })
       } else {
         res.status(409).json({
          success: false,
          message: "Bu natija avval qo'shilgan yoki ma'lumotlarda xatolik bor !!"
         })
       }

    } catch (error) {
      next(error);
    }
  }


  static async UpdateResult(req, res, next) {
    try {
      const { id, fullname, year, university, points, status } = req.body

     const Data = await model.selectedResult(id);
     const oldData = Data[0];
     if (!oldData) {
       res.status(200).json({
         success:false,
         message: "Natija topilmadi !"
       });
       return;
     }
     const FullName = fullname ? fullname : oldData.result_fullname;
     const Year = year ? year : oldData.result_year;
     const University = university ? university : oldData.result_university;
     const Points = points ? points : oldData.result_points;
     const Status = status ? status : oldData.result_status;
     await model.updateResult(FullName, Year, University, Points,Status, id);

     res.status(200).json({
      success:true,
      message: "Ma'lumotlar yangilandi !"
    });

  } catch (error) {
    next(error);
  }
}


static async DeleteResult(req, res, next) {
  try {
    const { id } = req.body

   const Data = await model.selectedResult(id);
   const oldData = Data[0];
   if (!oldData) {
     res.status(200).json({
       success:false,
       message: "Natija topilmadi !"
     });
     return;
   } else {
    const { result_id, result_fullname, result_year, result_university, result_points, result_status } = oldData
    await model.addArchiveResult(result_fullname, result_year, result_university, result_points, result_status, result_id)

    await model.deleteResult(id)
   }


   res.status(200).json({
    success:true,
    message: "Natija o'chirildi !"
  });

} catch (error) {
  next(error);
}
}


};
