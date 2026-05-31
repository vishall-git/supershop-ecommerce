require('dotenv').config()
const ImageKit = require('@imageKit/nodejs');

const imageKit = new ImageKit({
    privateKey:  process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(buffer){
    console.log(buffer)
    const result =await imageKit.files.upload({
        file:buffer,
        fileName:"image.jpg"
    })

    return result;
}

module.exports=uploadFile;