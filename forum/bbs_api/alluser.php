<?php
// Find the account information of all website users
require_once 'base/base.php';
require_once 'base/account.php';

$account = is_login_no_autostop();


// Find all users on the site
$account_list = find_all_account();

// Get "Me" follow list
$follow_list = isset($account) ? $account->get_follow_list() : [];

// Go through each site user to see if "I" follow them
$all_info = array_map(function (Account $account) use ($follow_list) {
   // Whether I follow the user and do not log in
    $followed = isset($account) ? in_array($account->uid, $follow_list) : false;
    $info = [
        'id' => $account->uid,
        'nickname' => $account->nickname,
        'followers' => $account->followers,
        'followed' => $followed
    ];
    return $info;
}, $account_list);

json_success("Have checked", $all_info);