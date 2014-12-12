var apiReady = false;

gapi.hangout.onApiReady.add(function(eventObj) {
    console.log('Hangouts API is ready.');
    gapi.hangout.data.setValue('fate_scenario', '[]');
    gapi.hangout.data.setValue('fate_scene', '[]');
    apiReady = true;
});

function reloadScenario() {
    if (apiReady) {
        scenario = JSON.parse(gapi.hangout.data.getValue('fate_scenario'));
        $('#scenario').empty();
        for (i=0; i < scenario.length; i++) {
            var l = '<li>';
            l += scenario[i];
            l += '<span class="delete" ';
            l += 'onClick="deleteScenarioAspect(' + i + ');"';
            l += '>&otimes;</span>';
            l += '</li>';
            $('#scenario').append(l);
        }
    }
    else {
        console.log('Api is not ready');
    }
}

function createScenarioAspect(name) {
    if (apiReady) {
        current = JSON.parse(gapi.hangout.data.getValue('fate_scenario'));
        current[current.length] = name;
        gapi.hangout.data.submitDelta(
            {'fate_scenario': JSON.stringify(current)}
        );
        reloadScenario();
    }
}

$(function() {
    $('#aspects').accordion( {heightStyle: "content"} );

    $('#scenario_add').submit( function( event ){
        box = $('#scenario_name');
        var t = box.val();
        if (t != "") {
            createScenarioAspect(t);
        }
        box.val("");
        event.preventDefault();
    });
});
