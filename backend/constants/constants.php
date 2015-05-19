<?php

/**
 * Class UserStatus
 */
class UserStatus
{
    const UNKNOWN = 'unknown';
    const DOWNLOADED = 'downloaded';
    const INSTALLED = 'installed';
    const REGISTERED = 'registered';
}

/**
 * Class UserConversationStatus
 */
class UserConversationStatus
{
    const DRAFT = 'draft';
    const CREATED = 'created';
    const OPENED = 'opened';
}

/**
 * Class UserMessageStatus
 */
class UserMessageStatus
{
    const DRAFT = 'draft';
    const CREATED = 'created';
    const SENT = 'sent';
    const READ = 'read';
    const ANSWERED = 'answered';
    const ANSWER_OPENED = 'answer_opened';
}

?>