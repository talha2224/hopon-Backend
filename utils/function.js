const { storage } = require("../config/firebase.config");
const { getDownloadURL, ref, uploadBytes } = require("@firebase/storage");

module.exports = {
    
    uploadFile:(async(file)=>{
        const uniqueFilename = `${file.originalname}-${Date.now()}`;
        const storageRef = ref(storage, `${uniqueFilename}`);
        await uploadBytes(storageRef, file.buffer);
        const result= await getDownloadURL(storageRef);
        let downloadUrl=result;
        return downloadUrl
    }),
    
}