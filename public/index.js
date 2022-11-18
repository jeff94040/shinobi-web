// get shinobi props from server .env
const shinobi_props = await (await fetch('shinobi-props')).json()

// define shinobi host
const shinobi_host = `http://${shinobi_props.ip}:${shinobi_props.port}`

// shinobi api: get monitors
// http://xxx.xxx.xxx.xxx/[API KEY]/monitor/[GROUP KEY]
const monitorsArray = await (await fetch(`${shinobi_host}/${shinobi_props.apikey}/monitor/${shinobi_props.groupkey}`)).json()

// to be populated with a monitor id => name mapping for use below
const monitor_id_to_name = {}

// insert each monitor into html body
monitorsArray.forEach(monitorElement => {
  monitor_id_to_name[monitorElement.mid] = monitorElement.name
  var img = document.createElement('img')
  img.src = shinobi_host + monitorElement.streams[0]
  document.body.appendChild(img)
})

// shinobi api: get videos for group key
// http://xxx.xxx.xxx.xxx/[API KEY]/videos/[GROUP KEY]
const videosArray = await (await fetch(`${shinobi_host}/${shinobi_props.apikey}/videos/${shinobi_props.groupkey}`)).json()

// insert each video into html body
videosArray.videos.forEach(videoElement => {

  // one div row per video
  var div = document.createElement('div')

  // video clip
  var video = document.createElement('video')
  video.setAttribute('controls', '')
  video.type = 'video/mp4'
  video.src = shinobi_host + videoElement.actionUrl + '#t=0.001'

  // video text description
  var span = document.createElement('span')
  const diff = time_transpired(videoElement.end)
  span.innerText = `${monitor_id_to_name[videoElement.mid]} - ${diff}`

  // build dom and insert into body
  div.appendChild(video)
  div.appendChild(span)
  document.body.appendChild(div)

})

/* calculate human readable time lapsed */
function time_transpired (then){

  const diff = (Date.now() - Date.parse(then)) / 1000

  switch (true) {
    case (diff < 60):
      return `${Math.trunc(diff)} seconds ago`
    case (diff < 60 * 60):
      return `${Math.trunc(diff / 60)} minutes ago`
    case (diff < 60 * 60 * 24):
      return `${Math.trunc(diff / (60 * 60))} hours ago`
    default:
      return `${Math.trunc(diff / (60 * 60 * 24))} days ago`
  }

}