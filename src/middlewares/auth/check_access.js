const check_access = (module_name) => {
    return async (req, res, next) => {
        try {

            const { user } = req



            if(module_name){
                const accesses = ["post_admin", "get_admins", "delete_admins"]
                const ac = accesses.includes(module_name)

                if(ac && user?.admin_role == "superadmin"){
                    next()
                } else {
                    res.status(400).json({
                        success: false,
                        message: "Sizga admin ma'lumotlari bilan ishlashga ruxsat yo'q !!"
                    })
                }

            } else {
                next()
            }

        } catch (error) {
            next(error)
        }
    }
}
module.exports = check_access