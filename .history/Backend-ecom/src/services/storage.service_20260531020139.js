require('dotenv').config()
const ImageKit = require('@imageKit/nodejs');

const imageKit = new ImageKit({
    privateKey:  process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(buffer){
    console.lgo
    const result =await imageKit.upload({
        file:buffer,
        fileName:"image.jpg"
    })

    return result;
}

module.exports=uploadFile;