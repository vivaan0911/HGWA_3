prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    })
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/WZ_RqUaf3/model.json", modelLoaded);

function modelLoaded() {
    console.log("model Loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The Gesture is" + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);

        if (results[0].label == "best") {
            document.getElementById("update_gesture").innerHTML = "&#128077";
            document.getElementById("result_gesture_name").innerHTML = "All the best";
        }
        if (results[0].label == "victory") {
            document.getElementById("update_gesture").innerHTML = "&#9996";
            document.getElementById("result_gesture_name").innerHTML = "This was a marvellous victory";
        }
        if (results[0].label == "amazing") {
            document.getElementById("update_gesture").innerHTML = "&#128076";
            document.getElementById("result_gesture_name").innerHTML = "This is looking amazing";
        }
    }
}
