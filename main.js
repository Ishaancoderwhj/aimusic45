song1="";
song2="";
leftwristX=0;
rightwristX=0;
leftwristY=0;
rightwristY=0;
song1_status="";
song2_status="";
leftwristsc=0;
rightwristsc=0;

function preload(){
    song1=loadSound("rio.mp3");
    song2=loadSound("faded.mp3");

    
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

fill("#fc2c03");
stroke("#0303fc");

if(leftwristsc>0.2){
    circle(leftwristX,leftwristY,20);
    song1.stop();

    if(song2_status==false){
        song2.play();
        document.getElementById("song_name").innerHTML="Playing-Faded";
    }
}

if(rightwristsc>0.2){
    circle(rightwristX,rightwristY,20);
    song2.stop();

    if(song1_status==false){
        song1.play();
        document.getElementById("song_name").innerHTML="Playing-Life in Rio";
    }
}

}

function modelLoaded(){
    console.log("posenet is loaded");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;

        console.log("left wrist x= "+leftwristX+" ,left wrist y= "+leftwristY);

        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;

        console.log("right wrist x= "+rightwristX+" ,right wrist y= "+rightwristY);

        leftwristsc=results[0].pose.keypoints[9].score;
        rightwristsc=results[0].pose.keypoints[10].score;
    }
}


