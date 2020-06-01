// PennController.Sequence( "instructions", randomize("practice_trial1"), "start_exp1", randomize("without_precursor"), "end_part1", randomize("practice_trial2"), "start_exp2", randomize("with_precursor"), "demographic", "send_results", "exp_end");

PennController.Sequence("consent", "instructions", "experiment", "demographic", "participant_obs", "send_results", "exp_end");

PennController.ResetPrefix(null);

//PennController.PreloadZip("https://consonant-perception-exp1.s3.us-east-2.amazonaws.com/mp3_test.zip");


PennController("consent",

    newHtml("consent", "consent.html")
        .settings.log()
        .print()
    ,

    newButton("continue", "Continue")
        .settings.css("font-size", "larger")
        .print()
        .wait(
            getHtml("consent").test.complete()
                .failure( getHtml("consent").warn() )
        )
);


PennController("instructions",

    newHtml("instructions", "instructions.html")
        .settings.log()
        .print()
    ,

    newButton("continue", "Start experiment")
        .settings.css("font-size", "larger")
        .print()
        .wait(
            getHtml("instructions").test.complete()
                .failure( getHtml("instructions").warn() )
        )
);



PennController.Template(row => PennController( "experiment" ,
    
    newText("Sentence", row.sentence)
        .settings.center()
        .print()
    ,

    newVar("RT_sentence").global().set( v_sent => Date.now())
    ,
    
    newButton("sentence", "Continue")
        .settings.center()
        .settings.log()
        .print()
        .wait()
        .remove()
    ,

    getVar("RT_sentence").set( v_sent => Date.now() - v_sent )
    ,

    getText("Sentence")
        .remove()
    ,


    newText("transition", " ")
        .settings.center()
        .print()
    ,

    newTimer("ITI", 1000)
        .start()
        .wait()
    ,

    getText("transition")
        .remove()
    ,

    newVar("RT_resp").global().set(v_resp => Date.now())
    ,

    newText("Question", row.question)
        .settings.center()
        .print()
    ,

    newScale("response",   "Yes", "No")
        .settings.log()
        .settings.labelsPosition("top")  // Position the labels
        .settings.center()
        .print()
        .wait()
    ,

    getVar("RT_resp").set( v_resp => Date.now() - v_resp )
    ,

    getText("Question")
        .remove()

    ,

    getScale("response")
        .remove()
    ,


    newTimer("ITI", 1000)
        .start()
        .wait()
    )

    .log("stim_id", row.stim_id)
    .log("correct_resp", row.correct_resp)
    .log("stim_num", row.stim_num)
    .log("RT_sentence", getVar("RT_sentence"))
    .log("RT_resp", getVar("RT_resp"))
);


PennController("demographic",

    newHtml("demographics", "demographic.html")
        .settings.log()
        .print()
    ,

    newButton("continue", "Continue")
        .settings.css("font-size", "larger")
        .print()
        .wait(
            getHtml("demographics").test.complete()
                .failure( getHtml("demographics").warn() )
        )
);

PennController("participant_obs",

    newHtml("participant_obervations", "participant_observations.html")
        .settings.log()
        .print()
    ,

    newButton("continue", "Finish experiment")
        .settings.css("font-size", "larger")
        .print()
        .wait(
            getHtml("participant_obervations").test.complete()
                .failure( getHtml("participant_obervations").warn() )
        )
);

PennController.SendResults("send_results");

PennController("exp_end", 
    newText("end", "Thank you for participating in this experiment. Your survey code is Afj7832Y.If you performed well on this task, you will automatically be qualified to participate in future experiments from our lab. Please look for those if you are interested in participating!")
        .print()
    ,

    newTimer("forever", 1)
        .wait()            // Timer never started: will wait forever
)

PennController.DebugOff()






