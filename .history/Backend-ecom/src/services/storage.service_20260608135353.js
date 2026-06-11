require('dotenv').config()
const ImageKit = require('imagekit');

const imageKit = new ImageKit({
    privateKey:  process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(buffer){
    const result =await imageKit.upload({
        file:buffer.toString('base64'),
        fileName:"items/image.jpg"
    })

    return result;
}

module.exports=uploadFile;