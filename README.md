# JukeBox

# 1 API

URL: http://localhost:3040/album
METHOD: POST
Request:
{
"album_id":"1215",
"musicians_ids":[123,124],
"name":"album 1",
"release_date":"2021-12-06",
"genre":"Vocalist",
"price":200.05

}
Response:
{
"success": true,
"message": "success",
"data": {
"album_id": "1215",
"name": "album 1",
"release_date": "2021-12-06T00:00:00.000Z",
"genre": "Vocalist",
"price": 200.05,
"created_at": "2020-12-06T06:25:09.786Z",
"updatedAt": "2020-12-06T06:25:09.803Z",
"createdAt": "2020-12-06T06:25:09.803Z"
},
"code": 200,
"extra": {}
}

# 2API

URL: http://localhost:3040/album/all_albums
METHOD: GET
Request:
Response:
{
"success": true,
"message": "success",
"data": [
{
"name": "album 1",
"release_date": "2020-12-06T00:00:00.000Z",
"genre": "Vocalist",
"price": 200.05,
"album_id": "1215",
"created_at": "2020-12-06T06:40:33.000Z"
},
{
"name": "album 1",
"release_date": "2024-12-06T00:00:00.000Z",
"genre": "Vocalist",
"price": 200.05,
"album_id": "12156",
"created_at": "2020-12-06T06:40:44.000Z"
}
],
"code": 200,
"extra": {}
}

# 3 API

URL: http://localhost:3040/album
METHOD: GET
Request:
Response:
{
"success": true,
"message": "success",
"data": [
{
"name": "album 1",
"release_date": "2024-12-06T00:00:00.000Z",
"genre": "Vocalist",
"price": 100.05,
"album_id": "12156",
"created_at": "2020-12-06T06:42:20.000Z",
"musicians": [
{
"musician_id": "124",
"musician_name": "Basant",
"musician_type": "Vocalist",
"created_at": "2020-12-06T06:25:00.000Z",
"updated_at": "2020-12-06T06:25:00.000Z",
"deleted_at": null,
"createdAt": "2020-12-06T06:25:00.000Z",
"updatedAt": "2020-12-06T06:25:00.000Z",
"album_musician": {
"albumAlbumId": "12156",
"musicianMusicianId": "124"
}
}
]
},
{
"name": "album 1",
"release_date": "2020-12-06T00:00:00.000Z",
"genre": "Vocalist",
"price": 200.05,
"album_id": "1215",
"created_at": "2020-12-06T06:40:33.000Z",
"musicians": [
{
"musician_id": "124",
"musician_name": "Basant",
"musician_type": "Vocalist",
"created_at": "2020-12-06T06:25:00.000Z",
"updated_at": "2020-12-06T06:25:00.000Z",
"deleted_at": null,
"createdAt": "2020-12-06T06:25:00.000Z",
"updatedAt": "2020-12-06T06:25:00.000Z",
"album_musician": {
"albumAlbumId": "1215",
"musicianMusicianId": "124"
}
}
]
}
],
"code": 200,
"extra": {}
}

# 4 API

URL: http://localhost:3040/musician
METHOD: POST
Request:
{
"musician_id":"124",
"musician_name":"Basant",
"musician_type":"Vocalist"
}
Response:
{
"success": true,
"message": "success",
"data": {
"musician_id": "124",
"musician_name": "Basant",
"musician_type": "Vocalist",
"created_at": "2020-12-06T06:25:00.454Z",
"updatedAt": "2020-12-06T06:25:00.468Z",
"createdAt": "2020-12-06T06:25:00.468Z"
},
"code": 200,
"extra": {}
}

# 5 API

URL: http://localhost:3040/album/musicians_list/:album_id
METHOD: GET
Request:
Response:
{
"success": true,
"message": "success",
"data": {
"name": "album 1",
"release_date": "2020-12-06T00:00:00.000Z",
"genre": "Vocalist",
"price": 200.05,
"album_id": "1215",
"musicians": [
{
"musician_id": "124",
"musician_name": "Basant",
"musician_type": "Vocalist",
"created_at": "2020-12-06T06:25:00.000Z",
"updated_at": "2020-12-06T06:25:00.000Z",
"deleted_at": null,
"createdAt": "2020-12-06T06:25:00.000Z",
"updatedAt": "2020-12-06T06:25:00.000Z",
"album_musician": {
"albumAlbumId": "1215",
"musicianMusicianId": "124"
}
}
]
},
"code": 200,
"extra": {}
}
"code": 200,
"extra": {}
}
