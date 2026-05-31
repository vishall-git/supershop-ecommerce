const ImageKit = require('@imageKit/nodejs');
reqire

const imageKit = new ImageKit({
    privateKey:  process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(buffer){
    const result =await client.upload({
        file:buffer,
        fileName:"image.jpg"
    })

    return result;
}

module.exports=uploadFile;