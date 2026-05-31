const ImageKit = require('@imageKit/nodejs');


const imageKit = new ImageKit({
    privateKey:  process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(buffer){
    const result =await ImageKit.file.upload({
        file:buffer,
        fileName:"image.jpg"
    })

    return result;
}

module.exports=uploadFile;