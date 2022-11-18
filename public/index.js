// get shinobi props from server .env
const shinobi_props = await (await fetch('shinobi-props')).json()

// define shinobi host
const shinobi_host = `http://${shinobi_props.ip}:${shinobi_props.port}`

// shinobi api: get monitors
// http://xxx.xxx.xxx.xxx/[API KEY]/monitor/[GROUP KEY]
const monitorsArray = await (await fetch(`${shinobi_host}/${shinobi_props.apikey}/monitor/${shinobi_props.groupkey}`)).json()

// insert each monitor into html body
monitorsArray.forEach(monitorElement => {
  var img = document.createElement('img')
  img.style = 'display: block; width:100%; -webkit-user-select:none; margin:auto; background-color: hsl(0, 0%, 25%);'
  img.src = shinobi_host + monitorElement.streams[0]
  document.body.appendChild(img)
})

// shinobi api: get videos for group key
// http://xxx.xxx.xxx.xxx/[API KEY]/videos/[GROUP KEY]
const videosArray = await (await fetch(`${shinobi_host}/${shinobi_props.apikey}/videos/${shinobi_props.groupkey}`)).json()

//console.log(videosArray)

// insert each video into html body
videosArray.videos.forEach(videoElement => {
  console.log(videoElement)

  const diff = time_transpired(videoElement.end)
  console.log(diff)

  var video = document.createElement('video')
  video.setAttribute('controls', '')
  video.style = 'display: block; width:100%; height:60px; background:linear-gradient(black, grey);'

  var source = document.createElement('source')
  source.type = 'video/mp4'
  source.src = shinobi_host + videoElement.actionUrl
  source.innerText = 'your browser does not support HTML5 video'

  video.appendChild(source)
  document.body.appendChild(video)
  //console.log(video)

})

function time_transpired (then){

  const diff = (Date.now() - Date.parse(then)) / 1000

  if (diff < 60) // < 1 minute
    return `${Math.trunc(diff)} seconds ago`;
  else if (diff < (60 * 60)) // < 1 hour
    return `${Math.trunc(diff / 60)} minutes ago`;
  else if (diff < (60 * 60 * 24)) // < 1 day
    return `${Math.trunc(diff / (60 * 60))} hours ago`;
  else
    return `${Math.trunc(diff / (60 * 60 * 24))} days ago`;

}