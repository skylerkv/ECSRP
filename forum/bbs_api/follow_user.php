<?php
// Follow a user
require_once 'base/base.php';
require_once 'base/account.php';

// ID of the user you want to follow
$id = get("id");

$account = is_login();

// Find the users you want to follow
$someone = find_account_by_uid($id);

if ($account->has_followed($someone)) {
    # If you are concerned, perform the logout operation
    $success = $account->cancel_follow($someone);
    if ($success) {
        json_success("Unfollow success", null);
    } else {
        json_error("Unfollow failed");
    }
} else {
    $success = $account->follow($someone);
    if ($success) {
        json_success("Focus on success", null);
    } else {
        json_error("Focus on failure");
    }
}
