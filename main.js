function compute() {

    // Initiate basic time variables
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;

    // Get framerate, start frame, and end frame from corresponding elements
    // Double check they all have a value
    let frameRate = parseInt(document.getElementById('framerate').value);
    let startFrame = document.getElementById('startobj').value;
    let endFrame = document.getElementById('endobj').value;
    if (typeof (startFrame) === 'undefined' || endFrame === 'undefined' || framerate === 'undefined') {
        return
    };

    // Calculate framerate
    let frames = (endFrame - startFrame) * frameRate;
    seconds = Math.floor(frames / frameRate);
    frames = frames % frameRate;
    milliseconds = Math.round(frames / frameRate * 1000);
    if (milliseconds < 10) {
        milliseconds = '00' + milliseconds;
    } else if (milliseconds < 100) {
        milliseconds = '0' + milliseconds;
    }
    if (seconds >= 60) {
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
    }
    if (minutes >= 60) {
        hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
    }

    // Show the time and mod message in the DOM
    let finalTime = hours.toString() + ':' + minutes.toString() + ':' + seconds.toString() + '.' + milliseconds.toString() + ' ';
    let modMessage = `Mod Note: Time starts at ${parseFloat(startFrame).toFixed(3)} and ends at ${parseFloat(endFrame).toFixed(3)} at ${frameRate} fps to get a final time of ${finalTime}.`;
    let credits = `Retimed using a custom version of slashinfty's retimer.`;
    document.getElementById('time').value = finalTime;
    document.getElementById('modMessage').disabled = false;
    document.getElementById('modMessage').innerText = modMessage + ' ' + credits;
    document.getElementById("modMessageButton").disabled = false;
}

function copyModMessage() {
    // Allow user to copy mod message to clipboard
    const textArea = document.getElementById('modMessage');
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    alert(`The mod message has been copied to clipboard! Please paste it into the comment of the run you are verifying.`);
}

const validateFPS = (event) => {
    // If framerate is invalid, show an error message and disable start and end frame fields
    if (event.target.value === '' || parseInt(event.target.value) <= 0 || isNaN(parseInt(event.target.value))) {
        document.getElementById('framerate').setCustomValidity('Please enter a valid framerate.');
        document.getElementById('framerate').reportValidity();
        document.getElementById('startobj').disabled = true;
        document.getElementById('endobj').disabled = true;
        document.getElementById('computeButton').disabled = true;
    } else {
        document.getElementById('startobj').disabled = false;
        document.getElementById('endobj').disabled = false;
        document.getElementById('computeButton').disabled = false;
    }
}

const parseForTime = (event) => {
    // Get current frame from input field (either start time or end time)
    let frameFromInputText = (JSON.parse(event.target.value)).lct;
    if (typeof frameFromInputText !== 'undefined') {
        // Get the framerate
        let frameRate = parseInt(document.getElementById('framerate').value);
        // Calculate the frame
        let frameFromObj = (time, fps) => Math.floor(time * fps) / fps; //round to the nearest frame
        let finalFrame = frameFromObj(frameFromInputText, frameRate);
        // Update the DOM
        document.getElementById(event.target.id).value = `${finalFrame}`;
    }
}
function copyTime() {
    // Allow user to copy time to clipboard
    const textArea = document.getElementById('time');
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
}

// below this is the code for the time calculator.
var active_obj = !1;

function my_round(t) {
    return 0 == t ? parseFloat(String(t)) : t && "" != t ? (obj = document.getElementById("dokla"), obj ? x = obj.selectedIndex + 2 : x = 2, x_max = Math.pow(10, x), Math.abs(parseFloat(t)) < parseFloat(1 / x_max) ? (t = new Number(t)).toExponential(x) : t > 1e5 ? (t = new Number(t)).toExponential(x) : (num = Math.round(t * x_max), parseFloat(num / x_max))) : ""
}

function cpos(t) {
    var e = 0;
    if (document.selection) {
        t.focus();
        var n = document.selection.createRange();
        n.moveStart("character", -t.value.length), e = n.text.length
    } else(t.selectionStart || "0" == t.selectionStart) && (e = t.selectionStart);
    return e
}

function licz(e) {
    if (e) {
        for (rid = e.parentNode.parentNode.id, r = rid.substr(1), c = "c3_" + r, p = e.value.split(":"), text = "", h = m = s = 0, i = 0; i < 3; i++) void 0 !== p[i] && p[i] && "." != p[i] || (p[i] = 0);
        p0 = parseFloat(p[0]), p1 = parseFloat(p[1]), p2 = parseFloat(p[2]), isNaN(p0) || isNaN(p1) || isNaN(p2) ? text = "Error" : (t = 3600 * p0 + 60 * p1 + p2, e.parentNode.parentNode.seconds = t, tab = sec2tab(t), text = "&nbsp;" + tab[0] + " h " + tab[1] + " min " + tab[2] + " sec "), document.getElementById(c).innerHTML = text, sum_all()
    } else sum_all()
}

function sum_all() {
    for (tc = document.getElementById("tcalc"), rows = tc.getElementsByTagName("TR"), sum = 0, i = 0; i < rows.length; i++) x = rows[i].seconds, s = rows[i].sign, x || (x = 0), s ? sum -= x : sum += x;
    tab2 = sec2tab(sum), text = ftim(tab2[0]) + ":" + ftim(tab2[1]) + ":" + ftim(tab2[2]), document.getElementById("tco").innerText = text, document.getElementById("tco").textContent = text, ss = my_round(sum), mm = my_round(sum / 60), hh = my_round(sum / 3600), text = hh + "<br>" + mm + "<br>" + ss, document.getElementById("atco").innerHTML = text
}

function ftim(t) {
    return x = new String(t), x.length < 2 ? "0" + x : x
}

function sec2tab(t) {
    return ans = new Array, z = "", t < 0 && (z = "-"), t = Math.abs(t), ans[0] = Math.floor(t / 3600), ans[1] = Math.floor((t - 3600 * ans[0]) / 60), s = Math.floor(t - 3600 * ans[0] - 60 * ans[1]), ans[0] = z + ans[0], ms = new String(t), ix = ms.indexOf("."), ix > -1 && (s += ms.substr(ix)), ans[2] = s, ans
}

function ckey(t) {
    if ("undefined" != typeof act_opis && (act_opis = 0, opis(0)), "undefined" != typeof dtc_clear && dtc_clear(), fld = t.target ? t.target : window.event.srcElement, t || (t = window.event), k = t.keyCode, k || (k = t.which), a = String.fromCharCode(k), "+" == a || 13 == k) return add_row(0), !1;
    if ("-" == a) return add_row(1), !1;
    if (v = new String(fld.value), "." == a) {
        for (cp = cpos(fld), nv = v.substr(0, cp) + "." + v.substr(cp), p = nv.split(":"), i = 0; i < p.length; i++)
            if (ix = p[i].indexOf("."), ix > -1 && p[i].indexOf(".", ix + 1) > -1) return !1;
        return !0
    }
    return ":" == a ? (p = v.split(":"), !(p.length > 2)) : !((a < "0" || a > "9") && k >= 32)
}
var nodes = 1;

function add_row(e, n) {
    nodes >= 150 ? alert("Too many input fields") : (t = document.getElementById("tcalc"), r = document.getElementById("r0"), rn = r.cloneNode(!0), c = rn.getElementsByTagName("TD"), e ? (c[0].innerText = "-", c[0].textContent = "-") : (c[0].innerText = "+", c[0].textContent = "+"), rn.sign = e, rn.seconds = 0, c[0].id = "c0_" + nodes, c[1].id = "c1_" + nodes, c[2].id = "c2_" + nodes, c[3].id = "c3_" + nodes, rn.id = "r" + nodes, nodes++, inp = c[1].firstChild, inp.value = void 0 === n ? "00:00:00" : n, t.appendChild(rn), inp.select(), inp.focus())
}

function del(e) {
    "c2_0" != e.id && (t = document.getElementById("tcalc"), t.removeChild(e.parentNode), sum_all())
}

function clear_tab() {
    for (t = document.getElementById("tcalc"), r = t.getElementsByTagName("TR"), i = r.length - 1; i > 0; i--) t.removeChild(r[i]);
    r[0].seconds = 0, r[0].sign = 0, c = r[0].getElementsByTagName("TD"), c[0].innerText = "+", c[0].textContent = "+", c[1].firstChild.value = "00:00:00", licz(c[1].firstChild), nodes = 1, sum_all()
}

function schg(e) {
    t = document.getElementById("tcalc"), p = e.parentNode, p.sign ? (p.sign = 0, e.innerText = "+", e.textContent = "+") : (p.sign = 1, e.innerText = "-", e.textContent = "-"), sum_all()
}
