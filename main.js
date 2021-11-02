song="";

function preload() {
    song = loadSound("music.mp3");
}

scoreRigthWrist = 0;
scoreLeftWrist = 0;

RightWristX = 0;
RightWristY = 0;

LeftWristX = 0;
LeftWristY = 0;

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    PoseNet = ml5.PoseNet(video, modelLoaded);
    PoseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Initialized');
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreRigthWrist = " + ScoreRightWrist + "ScoreLeftWrist = " + ScoreLeftWrist);

        RightWristX = results[0].pose.RightWrist.x;
        RightWristY = results[0].pose.RightWrist.y;
        console.log("RightWristX = " + RightWristX + "RightWristY = " +RightWristY);

        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + "LeftWristY" + leftWristY);
    }
    }

    function draw() {
        image(video, 0, 0, 500, 600);
        fill("#FF0000");
        stroke("#FF0000");

    if(scoreRightWrist > 0.2) {
        circle(RightWristX, RightWristY, 20);

        if(RightWristY > 0 && RightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed is 0.5x";
            song.rate(0.5);
        }
        else if(RightWristY > 100 && RightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed is 1.0x";
            song.rate(1);
        }
        else if(RightWristY > 200 && RightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed is 1.5x";
            song.rate(1.5);
        }
        else if(RightWristY > 300 && RightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed is 2.0x";
            song.rate(2);
        }
        else if(RightWristY > 400) {
            document.getElementById("speed").innerHTML = "Speed is 2.5x";
            song.rate(2.5);
        }
    }

    if(scoreLeftWrist > 0.2) {
        circle(LeftWristX, LeftWristY, 20);
        InNumberLeftWristY = Number(LeftWristY);
        remove_decimals = floor(InNumberLeftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " +volume;
        song.setVolume(volume);
    }
}
    function play() {
        song.play();
        song.setvolume(1);
        song.rate(1);
    }