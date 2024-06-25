var ctx = document.getElementById('canvas').getContext('2d');
var globalData = {};

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

/* Fill window */
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

/* Background image + Start display */
document.getElementById('canvas').style.backgroundImage = "url('img/base.png')";
document.getElementById('canvas').style.backgroundRepeat = 'no-repeat';
async function init() {
    window.requestAnimationFrame(drawData);
    globalData = await fetchData();
    setInterval(async() => { globalData = await fetchData(); }, 30000);
}
init();

/* Drawing Subroutine */
function drawData() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "16px 'Axion 12X16 Dotmap'";
    ctx.fillStyle = '#e09300';

    let now = new Date();

    //Stop name
    ctx.font = "36px Railway";
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Wallington Green', 47, 150);

    ctx.font = "22px Railway";
    ctx.fillStyle = '#000000';
    ctx.fillText('towards Carshalton', 95, 210);
    ctx.fillText('or Wallington', 120, 235);

    const first_line_y = 290;
    const line_h = 20;
    const max_text = 21;

    //Draw first 4 arrivals
    ctx.font = "16px 'Axion 12X16 Dotmap'";
    ctx.fillStyle = '#e09300';

    if (globalData.length > 3) imax = 3;
    else imax = globalData.length-1;

    for (i = 0; i <= imax; i++) {
        //Route number
        ctx.fillText(globalData[i].lineName, 30, first_line_y+line_h*3*i);

        //Destination
        let time = now.getSeconds() % 15;
        if (time <= 5) {
            ctx.fillText(globalData[i].destinationName.slice(0,max_text), 100, first_line_y+line_h*3*i);
        } else if (time <= 10) {
            //Car Plate
            ctx.fillText(globalData[i].vehicleId, 100, first_line_y+line_h*3*i);
        } else {
            //Bus Type
            let bus = getBusData(globalData[i].vehicleId);
            if (bus !== -1) {
                ctx.fillText(bus.busType.slice(0,max_text), 100, first_line_y+line_h*3*i);
            } else {
                ctx.fillText('No vehicle data', 100, first_line_y+line_h*3*i);
            }
        }

        //ETA / Car Plate
        let eta_min = Math.floor(globalData[i].timeToStation/60);
        if (eta_min >= 1) {
            ctx.fillText(`${eta_min}min`, 100, first_line_y+line_h*3*i+line_h);
        } else {
            ctx.fillText('due', 100, first_line_y+line_h*3*i+line_h);
        }
        
    }

    let time_str = now.toLocaleTimeString('en-UK', {timeZone:'Europe/London'});
    ctx.fillText(time_str, 147, 565);

    window.requestAnimationFrame(drawData);
}

/* Fetch data */
async function fetchData() {
    let dataurl = 'https://api.tfl.gov.uk/StopPoint/490014137W/arrivals';

    let response = await fetch(dataurl);
    if (response.ok) {
        let json = await response.json();

        //Sort data by ETA time
        json.sort((a, b) => {
            let keyA = new Date(a.expectedArrival);
            let keyB = new Date(b.expectedArrival);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });

        console.log('data loaded');
        return json;
    }

    return false;
}
