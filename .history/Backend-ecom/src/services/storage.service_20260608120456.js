require('dotenv').config()
const ImageKit = require('@imageKit/nodejs');

const imageKit = new ImageKit({
    privateKey:  process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(buffer){
    const result =await imageKit.files.upload({
        file:buffer.toString('base64'),
        fileName:"items/"
    })

    return result;
}

module.exports=uploadFile;