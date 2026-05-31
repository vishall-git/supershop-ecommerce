const ImageKit = require('@imageKit/nodejs');

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(){
    const result = client.upload({
        file:buffer,
        fileName:"image.jpg"
    })
}