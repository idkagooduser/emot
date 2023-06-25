prediction_1="";
prediction_2="";

Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    image_quality:90
});

camera=document.getElementById("camera");

Webcam.attach(camera);

function takeSnapshot(){
Webcam.snap(function (data_uri){
    document.getElementById("result").innerHTML="<img id='CapturedImage' src='"+data_uri+"'>";
});


}

console.log('ml5 version:', ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6X3Xx50Fz/model.json',modelLoaded)

function modelLoaded(){
    console.log("Model Loaded🥳");
}

function speak(){
    var synth= window.speechSynthesis;
    speak_data_1="The first prediction is"+ prediction_1;
    speak_data_2="And the second prediction is"+ prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById('CapturedImage');
    classifier.classify(img,gotResults);
}

function gotResults(error,results){
    if (error){
console.log(error);
    }
    else{
        console.log(results);
        document.getElementById('result_emotion_name').innerHTML=results[0].label;
        document.getElementById('result_emotion_name2').innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="Happy"){
            document.getElementById("update_emoji").innerHTML="&#128512;";
        }
        if(results[0].label=="Sad"){
            document.getElementById("update_emoji").innerHTML="&#128550;";
        }
        if(results[0].label=="Angry"){
            document.getElementById("update_emoji").innerHTML="&#128545;";
        }

        if(results[1].label=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128512;";
        }
        if(results[1].label=="Sad"){
            document.getElementById("update_emoji2").innerHTML="&#128550;";
        }
        if(results[1].label=="Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128545;";
        }
    }
}