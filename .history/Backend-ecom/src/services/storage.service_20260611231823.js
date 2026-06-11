require('dotenv').config()
const ImageKit = require('imagekit');

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
    publickey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(buffer) {
    const result = await imageKit.file.upload({
        file: buffer.toString('base64'),
        fileName: "${Date.now()}.jpg",
        folder: "/product"
    })

    return result;

}

module.exports = uploadFile;