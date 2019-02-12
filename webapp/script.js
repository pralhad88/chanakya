var enrolment_key = "NTH36";
var DEBUG = true;
var slide_up_time = 600;
var slide_down_time = slide_down_time;
var questions = [];
var answers = [];
var current_question = 0;

function appending(error) {
    $('#errors').html('');
    $('#errors').html(error);
}

// For getting lat and long
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(positions){
        coordinates = positions.coords.latitude +','+ positions.coords.longitude;
        console.log(coordinates);
    });
}
else{
    appending('Geolocation not supported!');
}

function landing_page_submit() {
    $("#landing_page").slideUp(slide_up_time);
    $("#personal_details").slideDown(slide_down_time);
    setupDatePicker();
};

function setupDatePicker() {
    var monthdict ={
        'Jan':"01",'Feb':"02",'Mar':'03','April':"04","May":"05",
        'Jun':"06",'Jul':"07","Aug":"08",'Sep':"09",'Oct':'10',
        'Nov':"11",'Dec':'12', 
    }
    // To get the year
    var today = new Date();
    var yyyy = today.getFullYear()-10;
    minyyyy = yyyy-30;
        
    var datefield = $('#date');
    for (var i = 1 ; i <= 31; i++) {
        datefield.append("<option value="+i+">"+i+"</option>");
    }
    
    var monthfield = $('#month');
    for (var key in monthdict) {
        monthfield.append("<option value="+monthdict[key]+">"+key+"</option>");
    }
    var yearfield = $('#year');
    
    for (var i = minyyyy ; i <= yyyy; i++) {
        yearfield.append("<option value="+i+">"+i+"</option>");
    }    
}

function personal_details_submit() {
    var name = $('#name').val();
    var date = $('#date').val();
    var month = $('#month').val();
    var year = $('#year').val();
    var mobile = $('#mobile').val();
    var gender = $('#gender').val();

    if (DEBUG) {
        name = "abhishek";
        date = "28";
        month = "02";
        year = "1992";
        mobile = "1010101010";
        gender = "MALE";
    }

    // network_speed.value  = navigator.connection.downlink;

    console.log('hello1', mobile);

    if(!mobile){
        console.log('hello2', mobile);
        appending('Kripaya mobile number dijye!');
        return false;
    }
    if(mobile.length<10 || mobile.length>10){
        appending('10 digit ka mobile number daliye!');
        return false;
    }
    
    if(!name){
        appending('Kripaya apna naam batayie!');
        return false;
    }
    if( /^[a-zA-Z]$/i.test(name)){
        appending('Naam wale section me (1,.,!,#,@,") ka istamal na kare!');
        return false;
    }
    // to check that date field isn't empty
    if(date == ''){
        appending('Kripaya Apne Janam Ka Din Chuniye!');
        return false;
    }
    else if(month == ''){
        appending('Kripaya Apne Janam Ka Mahina Chuniye!');
        return false;
    }
    else if(year == ''){
        appending('Kripaya Apne Janam Ka Saal Chuniye!');
        return false;
    }
    else if(gender == 'NONE'){
        appending('Apna gender select kijye!');
        return false;
    }

    var dob = year +'-'+ month +'-'+date;

    // dob.style.display = 'none';
    // coords.style.display = 'none';
    // network_speed.style.display = "none";
    // user_agent.style.display = "none";
    // form.appendChild(coords);
    // form.appendChild(dob);
    // form.appendChild(network_speed);
    // form.appendChild(user_agent);

    var obj = {
        "name": name,
        "mobile": mobile,
        "gender": gender,
        "dob": dob
    }

    $("#personal_details").slideUp(slide_up_time);
    $("#time_aware").slideDown(slide_down_time);    

    // $.post("/test/personal_details/"+enrolment_key,
    //     obj,
    //     function(data, resp){
    //         console.log(resp);
    //         $.post("/test/start_test/"+enrolment_key,
    //             {},
    //             function newts(data, resp) {
    //                 $("#page2").slideUp(slide_up_time);
    //                 $("#time_aware").slideDown(slide_down_time);                    
    //             }
    //         );    
    //     }
    // );
}

function time_aware_submit() {
    // show question_answer_page page
    $("#time_aware").slideUp(slide_up_time);
    $("#question_answer_page").slideDown(slide_down_time);    

    var data;
    var last_recorded_time   = new Date().getTime();
    var time_remaining = DEBUG ? 5 : 86400;

    // var last_recorded_time   = new Date().getTime();
    // var time_remaining = 3670;
    // var time_after = 60;
    // var time_before = 10;
    // var total_questions = 18;
    // var time_questions =  200 * total_questions;

    // do_it = setInterval(function(){
    //     new_time   = new Date().getTime()
    //     time_spent = (new_time - last_recorded_time)/1000;
    //     last_recorded_time = new_time;
    //     time_remaining -= time_spent;

    //     if(time_remaining >= time_after+time_questions){
    //         $("#info_before").removeClass("hide");
    //         time_to_show = time_remaining - (time_after+time_questions);
    //     }
    //     else if(time_remaining <= time_after){
    //         $("#questions").addClass("hide");
    //         $("#info_after").removeClass("hide");
    //         time_to_show = time_remaining;
    //     }
    //     else{
    //         $("#info_before").addClass("hide");
    //         $("#questions").removeClass("hide");
    //         time_to_show = time_remaining - time_after;
    //     }

    //     minutes = Math.floor(time_to_show/60);
    //     seconds = Math.round(time_to_show%60);
    //     $("#time_to_show").html("Time Remaining: "+minutes+" minutes "+seconds+" seconds.");
    //     if(time_remaining==3){
    //         $("#alert_text").html("<h2>Time Over Submitting Your Test Now.</h2>");
    //     }
    //     if(time_remaining<=1){
    //         clearInterval(do_it);
    //     }
    // }, 100); 

    if (DEBUG) {
        var data = {
            "questions": [
                {
                    "text": {
                        "en": "question 1 text in english!",
                        "hi": "question 1 text in hindi!"
                    },
                    "type": "mcq",
                    "options": [
                    {
                        "en": "option 1 in english",
                        "hi": "option 1 in hindi"
                    },
                    {
                        "en": "option 2 in english",
                        "hi": "option 2 in hindi"
                    },
                    {
                        "en": "option 3 in english",
                        "hi": "option 3 in hindi"
                    },
                    {
                        "en": "option 4 in english",
                        "hi": "option 4 in hindi"
                    }
                    ],
                },
                {
                    "text": {
                        "en": "question 2 text in english! <b>can also contain html</b>",
                        "hi": "question 2 text in hindi! <b>main HTML hun</b>"
                    },
                    "type": "integer_answer",
                }
            ]
        };

        dQuestions(data);

        do_it = setInterval(function(){
            var new_time   = new Date().getTime()
            var time_spent = (new_time - last_recorded_time)/1000;
            last_recorded_time = new_time;
            time_remaining -= time_spent;
    
            minutes = Math.floor(time_remaining/60);
            seconds = Math.round(time_remaining%60);
            $("#time_to_show").html("Time Remaining: " + minutes + " minutes and " + seconds + " seconds.");
            if(time_remaining<=1){
                clearInterval(do_it);
            }
        }, 100);    
    }

    function dQuestions(data) {
        questions = data["questions"];
        for (i=0; i<questions.length; i++) {
            answers.push(-1);
        }
        $('#btns_next_submit').show("slow");
        displayQuestion(0);
    }

    $.post("/test/start_test/"+enrolment_key,
        {},
        function(data, resp) {
            data = data;
        }
    );
}

function nextQuestion() {
    current_question += 1;
    displayQuestion(current_question);
}

function previousQuestion() {
    current_question -= 1;
    displayQuestion(current_question);
}

function updateAnswer(index) {
    if (index == 0) {
        return false;
    }

    ans_index = index - 1;
    if (questions[ans_index]["type"] == "mcq") {
        answers[ans_index] = $('#qmcq .option button.active').html();
    } else {
        answers[ans_index] = $('#qinteger_answer input').val();
    }
    return true;
}

function displayQuestion(index) {
    updateAnswer(index);

    if (index == 1) {
        $('#prev_button').show("slow");
    } else if (index == 0) {
        $('#prev_button').hide("slow");
    }

    if (index == questions.length - 1) {
        //i am at last question
        $('#next_btn').hide("slow");
        $('#submit_btn').show("slow");
    } else {
        $('#next_btn').show("slow");
        $('#submit_btn').hide("slow");
    }
    
    if (index >= questions.length) {
        $('#btn_next_submit').hide('slow');
        return "HO GAYA :D";
    } 
    else {
        //display question with index index
        var question = questions[index];
        if (question["type"] == "mcq") {
            $('#qmcq').slideUp(slide_up_time);
            $('#qinteger_answer').slideUp(slide_up_time);
            $('#qmcq').slideDown(slide_down_time);
            $('#qmcq .qtext').html(question["text"]["hi"]);
            var options = question["options"];
            var options_html = "";

            for(var i=0; i<options.length; i++) {
                //button 
                options_html += `<div class="option col-xs-12 col-sm-12 col-md-6 mt-1 text-center mt-2"> \
                <button type="button" class="btn btn-outline-info" onclick="makeActive(`+i+`)">` + options[i]["hi"] +
                `</div>`;

                // <input type="radio" value="B or C" name="answer_1"  \
                // id="id_10" class="cls_1"/> \
                //     <label class="answer-label" for="id_10">`

            }

            $('#qmcq .options .row').html(options_html);
            $('#qmcq .qtext').html(question["text"]["hi"])
        } 
        else if (question["type"] == "integer_answer") {
            $('#qmcq').slideUp(slide_up_time);
            $('#qinteger_answer').slideUp(slide_up_time);
            $('#qinteger_answer').slideDown(slide_down_time);
            $('#qinteger_answer .qtext').html(question["text"]["hi"]);
        }
        else {
            console.log("YEH KAHA AA GAYE HUM, YUHI SERVER PAR TRUST KARTE KARTE!");
            //        displayQuestion(index+1);

        }
    }
}

function makeActive(index) {
    $('#qmcq .option button').each(function(i, obj) {
        if (i==index) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    })
}

function submitTest() {
    updateAnswer(questions.length);
    $('#question_answer_page').slideUp(slide_up_time);
    $("#end_page").slideDown(slide_down_time);
    
    if (!DEBUG) {
        $.post("/test/end_test/"+enrolment_key,
            {"answers": answers},
            function(data, resp) {
            }
        )
    } else {
        // closeTest();
    }
}

if (DEBUG) {
    $(document).ready(function() {
        landing_page_submit();
        personal_details_submit();
        time_aware_submit();
    });
}