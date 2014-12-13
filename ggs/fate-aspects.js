var apiReady = false;

gapi.hangout.onApiReady.add(function(eventObj) {
    console.log('Hangouts API is ready.');
    apiReady = true;
    /* The gamemaster should be the first user who opened the application.
     * Try to find it */
    if ( gapi.hangout.data.getValue('fate_owner') === undefined ) {
        gapi.hangout.data.setValue('fate_scenario', '[]');
        gapi.hangout.data.setValue('fate_scene', '[]');
        owner = gapi.hangout.getLocalParticipant();
        gapi.hangout.data.setValue('fate_owner', owner.person.id);
    }
    else {
        reloadScenario();
        reloadScene();
    }
});

gapi.hangout.data.onStateChanged.add(function(eventObj) {
    reloadScenario();
    reloadScene();
});

function amOwner() {
    owner_id = gapi.hangout.data.getValue('fate_owner');
    return owner_id === gapi.hangout.getLocalParticipant().person.id;
}

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

function reloadScene() {
    if (apiReady) {
        scene = JSON.parse(gapi.hangout.data.getValue('fate_scene'));
        $('#scene').empty();
        for (i=0; i < scene.length; i++) {
            var l = '<li>';
            l += scene[i];
            l += '<span class="delete" ';
            l += 'onClick="deleteSceneAspect(' + i + ');"';
            l += '>&otimes;</span>';
            l += '</li>';
            $('#scene').append(l);
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
        console.log("Added aspect: " + name);
    }
}

function createSceneAspect(name) {
    if (apiReady) {
        current = JSON.parse(gapi.hangout.data.getValue('fate_scene'));
        current[current.length] = name;
        gapi.hangout.data.submitDelta(
            {'fate_scene': JSON.stringify(current)}
        );
        console.log("Added aspect: " + name);
    }
}

function deleteScenarioAspect(n) {
    if (apiReady) {
        current = JSON.parse(gapi.hangout.data.getValue('fate_scenario'));
        current.splice(n, 1);
        gapi.hangout.data.submitDelta(
            {'fate_scenario': JSON.stringify(current)}
        );
    }
}

function deleteSceneAspect(n) {
    if (apiReady) {
        current = JSON.parse(gapi.hangout.data.getValue('fate_scene'));
        current.splice(n, 1);
        gapi.hangout.data.submitDelta(
            {'fate_scene': JSON.stringify(current)}
        );
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
    
    $('#scene_add').submit( function( event ){
        box = $('#scene_name');
        var t = box.val();
        if (t != "") {
            createSceneAspect(t);
        }
        box.val("");
        event.preventDefault();
    });

    $('#container').on('click', 'span.delete', function(){
        $(this).closest('li').remove();
    });
});
