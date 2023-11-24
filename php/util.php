<?php

function send_json_err($msg){
    echo "{\"error\":\"$msg\"}";
}

?>