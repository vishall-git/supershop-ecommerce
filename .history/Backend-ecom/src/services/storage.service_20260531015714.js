const ImageKit = require('@imageKit/nodejs');
require('dotenv').config()

const imageKit = new ImageKit({
    privateKey:  process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(buffer){
    const result =await imagekit .upload({
        file:buffer,
        fileName:"image.jpg"
    })

    return result;
}

module.exports=uploadFile;