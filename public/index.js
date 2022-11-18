// get shinobi props from server .env
const shinobi_props = await (await fetch('shinobi-props')).json()

const shinobi_host = `http://${shinobi_props.ip}:${shinobi_props.port}`

// get array of monitors from shinobi api
const monitorsArray = await (await fetch(`${shinobi_host}/${shinobi_props.apikey}/monitor/${shinobi_props.groupkey}`)).json()

monitorsArray.forEach(monitor => {
  var img = document.createElement('img')
  img.style = 'display: block; width:100%; -webkit-user-select:none; margin:auto; background-color: hsl(0, 0%, 25%);'
  img.src = shinobi_host + monitor.streams[0]
  document.body.appendChild(img)
})

// shinobi api: get videos for group key
//http://xxx.xxx.xxx.xxx/[API KEY]/videos/[GROUP KEY]

const videosArray = await (await fetch(`${shinobi_host}/${shinobi_props.apikey}/videos/${shinobi_props.groupkey}`)).json()

console.log(`${shinobi_host}/${shinobi_props.apikey}/videos/${shinobi_props.groupkey}`)

console.log(videosArray)

videosArray.videos.forEach(video => {
  //console.log(video.actionUrl)
  var video = document.createElement('video')
  video.setAttribute('controls', '')
  video.style = 'display: block; width:100%; height:60px; background-color: hsl(0, 0%, 25%);'
  //console.log(video)

  var source = document.createElement('source')
  source.type = 'video/mp4'
  source.src = shinobi_host + video.actionUrl
  source.innerText = 'your browser does not support HTML5 video'

  video.appendChild(source)
  //console.log(video)
  //console.log(source)
  document.body.appendChild(video)

})

/*
  <video id="my_video" style="display: block; width:100%; height:60px; background-color: hsl(0, 0%, 25%);" controls>
    <source src="http://192.168.0.9:8080/XQhKAU3sBQ1ShqhgDCae6xCub4zMjI/videos/4z2nmxO6lN/GOpdRktwBq80/2022-11-17T16-13-35.mp4" type="video/mp4">
    Your browser does not support HTML5 video.
  </video>
  */