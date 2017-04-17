'use strict';

module.exports = ['$log', '$q', '$http', 'Upload', 'authService', imgService];

function imgService($log, $q, $http, Upload, authService){
  $log.debug('imgService');
  let service = {};

  service.uploadImg = function(parent, imgData){
    $log.debug('imgService.uploadImg', parent, imgData);

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile/photo/${parent._id}`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };
      Upload.upload({
        url,
        headers,
        method: 'PUT',
        data: {
          image: imgData.file
        }
      })
      .then( res => {
        return $q.resolve(res.data);
      });

    })
    .catch( err => {
      $log.error(err);
    });
  };
  // service.uploadImg = function(parent, imgData) {
  //   $log.debug('picService.uploadGalleryPic');

  //   return authService.getToken()
  //   .then( token => {
  //     let url = `${__API_URL__}/api/gallery/${parent._id}/pic`;
  //     let headers = {
  //       Authorization: `Bearer ${token}`,
  //       Accept: 'applciation/json'
  //     };

  //     return Upload.upload({
  //       url,
  //       headers,
  //       method: 'PUT',
  //       data: {
  //         file: imgData.file
  //       }
  //     })
  //     .then( res => {
  //       return res.data;
  //     })
  //     .catch( err => {
  //       console.error(err);
  //       return $q.reject(err);
  //     });
  //   });
  // };
  return service;
}






// profileRouter.put('/api/profile/photo/:id', bearerAuth, upload.single('image'),  jsonParser, function(req, res, next){
//   debug('PUT: /api/profile/photo/:id');
//   if(!req.file) return next(createError(400, 'photo required'));
//   let ext = path.extname(req.file.originalname);

//   let params = {
//     ACL: 'public-read',
//     Bucket: process.env.AWS_BUCKET,
//     Key: `${req.file.filename}${ext}`,
//     Body: fs.createReadStream(req.file.path)
//   };
//   s3methods.uploadObjectProm(params)
//   .then( s3data => {
//     del([`${dataDir}/*`]);
//     req.body.photoKey = s3data.Key;
//     req.body.photoURI = s3data.Location;
//     Profile.findByIdAndUpdate(req.params.id, req.body, {new: true})
//     .then( profile => {
//       res.json(profile);
//     });
//   })
//   .catch(next);
// });