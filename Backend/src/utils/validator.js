const validator = require("validator")

const validate =(data)=>{
    const maindatoryField = ["firstname", "emailId", "password", "speciality", "degree", "experience", "about", "fees", "address"]
    const isAllowed = maindatoryField.every((k)=>Object.keys(data).includes(k))
    if(!isAllowed)
        throw new Error("Field Missing")
    
    if(!validator.isEmail(data.emailId))
        throw new Error("Invalid Email")
    
    if(!validator.isStrongPassword(data.password))
        throw new Error("Weak Password")
    
}

module.exports = validate