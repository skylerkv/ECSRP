<?php
// create a topic
require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/topic.php';

// name of topic 
$name = get("name");

// introduction
$desp = get("desp");

// type
$type = get("type");

$account = is_login();

$image_filename = upload();

create_topic($type, $name, $desp, $image_filename);

json_success("Topic creation success", null);