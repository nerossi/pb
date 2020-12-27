$(function() {
    var ie_version = function() {
        var result = false;
        var agent = navigator.userAgent;
        if (agent.indexOf('MSIE') != -1) {
            var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);
            if (trident == null) result = 7;
            else if (trident[1] == '4.0') result = 8;
            else if (trident[1] == '5.0') result = 9;
        }
        return result;
    };
    if (ie_version() !== false && ie_version() < 10) {
        $("[rel='placeholder']").find('label').show();
        $(document).on('keyup', 'input[type=text], input[type=password], textarea', function() {
            var tx_length = $(this).val().length;
            if (tx_length > 0) {
                $('label[for=' + $(this).attr('id') + ']').hide();
            } else {
                var $o = $(this);
                if (!$.trim($o.val())) $('label[for=' + $o.attr('id') + ']').show();
                else $('label[for=' + $o.attr('id') + ']').hide();
            }
        });
    }
    $("dl[rel='placeholder']").find('input').focus(function() {
        $(this).parent('dd').addClass('focus');
    }).blur(function() {
        $("dl[rel='placeholder']").find('dd').removeClass('focus');
    });
    $(document).on({
        mouseenter: function() {
            var $tooltip = $('#tooltip');
            var $arrow = $tooltip.find('.arrow');
            var title = $(this).attr('title');
            var tooltip_height = 38;
            $tooltip.show().find('.title').text(title);
            var target_width = $(this).outerWidth();
            var tooltip_width = $tooltip.find('.title_area').outerWidth();
            var tooltip_pos = parseInt((target_width - tooltip_width) / 2);
            var arrow_pos = target_width / 2;
            var $std;
            if (window.location == window.parent.location) {
                $std = $('body');
            } else {
                $std = $('#content');
            }
            var std_body_width = $std.width();
            var std_body_start = $std.offset().left;
            var std_body_end = $std.offset().left + std_body_width;
            var $offset_top = parseInt($(this).offset().top);
            var $offset_left = parseInt($(this).offset().left);
            var offset_tooltip_top = $offset_top - tooltip_height;
            var offset_tooltip_left = $offset_left + tooltip_pos;
            var offset_arrow_top = $offset_top - 7;
            var offset_arrow_left = $offset_left + arrow_pos;
            if (offset_tooltip_left < std_body_start) {
                offset_tooltip_left = std_body_start;
            }
            if (tooltip_width + offset_tooltip_left > std_body_end) {
                offset_tooltip_left = std_body_end - tooltip_width;
            }
            $tooltip.find('.title_area').css({
                top: offset_tooltip_top,
                left: offset_tooltip_left
            });
            $arrow.css({
                top: offset_arrow_top,
                left: offset_arrow_left
            });
        },
        mouseleave: function() {
            $('#tooltip').hide();
        }
    }, "[tooltip='tooltip']");
});

function window_resize() {
    var w = document.body.clientWidth - window.innerWidth;
    var h = document.body.clientHeight - window.innerHeight;
    if (window.outerHeight + h < document.body.clientHeight || window.outerWidth + w < document.body.clientWidth) {
        window.resizeTo(document.body.clientWidth + 20, document.body.clientHeight + 100);
        return false;
    }
    window.resizeBy(w, h);
}

function open_popup(url, win_name, width, height) {
    var popup_option = 'width=' + width + ', height=' + height + ', top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbars=no';
    var popup = window.open(url, win_name, popup_option);
    if (popup === null) {
        alert('차단된 팝업창을 허용해 주세요.');
        return false;
    }
}

function openPopupWithOptions(url, name, options) {
    var _options_, optionString = '',
        str, popup;
    if (options === undefined || options === null) {
        options = {};
    }
    _options_ = {
        width: (options.width) ? options.width : 100,
        height: (options.height) ? options.height : 100,
        top: (options.top) ? options.top : 100,
        left: (options.left) ? options.left : 100,
        fullscreen: (options.fullscreen) ? options.fullscreen : 'no',
        menubar: (options.menubar) ? options.menubar : 'no',
        status: (options.status) ? options.status : 'no',
        toolbar: (options.toolbar) ? options.toolbar : 'no',
        titlebar: (options.titlebar) ? options.titlebar : 'no',
        location: (options.location) ? options.location : 'no',
        scrollbars: (options.scrollbars) ? options.scrollbars : 'no',
        resizable: (options.resizable) ? options.resizable : 'no'
    };
    for (var key in _options_) {
        str = key + '=' + _options_[key];
        optionString += str + ',';
    }
    popup = window.open(url, name, optionString.substr(0, optionString.length - 1));
    popup.focus();
    return popup;
}

function close_popup(reload) {
    if (reload) window.opener.location.reload();
    window.close();
}

function popup(url, name) {
    window.open(url, name, 'scrollbars=yes,width=383,height=700,top=10,left=20');
}

function memo_popup(type, id) {
    var url = '/memo/' + type + '.popup.php';
    if (id != undefined) url += '?id=' + id;
    open_popup(url, 'memo_' + type, '380', '500');
}

function memo_view_popup(type, no) {
    var url = '/memo/view_' + type + '.popup.php';
    if (no != undefined) url += '?no=' + no;
    open_popup(url, 'memo_' + type, '380', '500');
}

function add_good_friend_popup(id) {
    var url = '/account/friend/good_add.popup.php';
    if (id != undefined) url += '?id=' + id;
    open_popup(url, 'friend_add', '383', '455');
}

function set_answering_popup() {
    var url = "/account/friend/auto_answer.popup.php";
    open_popup(url, "friend_add", "383", "659");
}

function add_inhibit_popup(nick) {
    var url = '/account/friend/inhibit_add.popup.php';
    if (nick != undefined) url += '?nick=' + nick;
    open_popup(url, 'blacklist_add', '383', '455');
}

function add_bad_friend_popup(nick) {
    var url = '/account/friend/bad_add.popup.php';
    if (nick != undefined) url += '?nick=' + nick;
    open_popup(url, 'blacklist_add', '383', '455');
}

function add_penalty_popup(id) {
    var url = '/account/penalty/penalty.popup.php';
    if (id != undefined) url += '?id=' + id;
    open_popup(url, 'penalty_add', '383', '455');
}

function common_popup(o) {
    var url = $(o).attr("href");
    var name = $(o).attr("popup-name");
    open_popup(url, name, '383', '455');
}

function request_ntalk(targetUserId, targetUserName) {
    var url, talkFrame;
    if (!targetUserId || !targetUserName) {
        return false;
    }
    url = '/talk/talk.php?it=mb_id&iv=' + targetUserId;
    talkFrame = parent.document.getElementById('ntalkFrame') || document.getElementById('ntalkFrame');
    if (talkFrame) {
        talkFrame.src = url;
    } else {
        open_popup(url, name, '400', '500');
    }
    $('#user_service_talk').trigger('click');
    return true;
}

function redirect_my_post(mb_id, connect_mode) {
    if (connect_mode === 'first') {
        alert('새창모드에서는 이용하실 수 없습니다.');
        return false;
    }
    var targetFrame = window.top.contentFrame;
    if (typeof targetFrame != 'object') {
        targetFrame = window.top;
    }
    targetFrame.location.href = '/user/home.php?mb_id=' + mb_id;
    return true;
}

function redirect_fam_by_id(fam_id, connect_mode) {
    if (connect_mode === 'first') {
        alert('새창모드에서는 이용하실 수 없습니다.');
        return false;
    }
    var targetFrame = window.top.contentFrame;
    if (typeof targetFrame !== 'object') {
        targetFrame = window.top;
    }
    targetFrame.location.href = '/family/home.php?family_id=' + fam_id;
    return true;
}

function redirect_my_fam(mb_id, connect_mode) {
    if (connect_mode === 'first') {
        alert('새창모드에서는 이용하실 수 없습니다.');
        return false;
    }
    var targetFrame = window.top.contentFrame;
    if (typeof targetFrame != 'object') {
        targetFrame = window.top;
    }
    targetFrame.location.href = '/family/conv.php?mb_id=' + mb_id;
    return true;
}

function is_valid_email(email) {
    var pattern = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@(?:\w+\.)+\w+$/;
    return pattern.test(email);
}

function is_valid_nick(nick) {
    var pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/;
    return pattern.test(nick);
}

function isValidOnlyDate(date) {
    var pattern = /[\d]{4}-[\d]{2}-[\d]{2}/;
    return pattern.test(date);
}
var isCtrl = false;

function enter_number(e) {
    var key, keychar;
    if (window.event) {
        key = window.event.keyCode;
    } else if (e) {
        key = e.which;
    } else {
        return true;
    }
    keychar = String.fromCharCode(key);
    if ((key === null) || (key === 0) || (key === 8) || (key === 9) || (key === 13) || (key === 27) || (key === 46) || (key === 37) || (key === 39) || (key === 35) || (key === 36) || (key === 86) || (key >= 96 && key <= 105)) {
        return true;
    } else if ((('0123456789').indexOf(keychar) > -1)) {
        return true;
    } else {
        if (e.which === 17) {
            isCtrl = true;
        }
        if (e.which === 65 && isCtrl === true) {
            return true;
        } else {
            return false;
        }
    }
}

function number_comma(data) {
    var number = '',
        cutlen = 3,
        comma = ',',
        i, len, mod, k;
    data = Number(data);
    data = String(data);
    len = data.length;
    mod = (len % cutlen);
    k = cutlen - mod;
    for (i = 0; i < data.length; i++) {
        number = number + data.charAt(i);
        if (i < data.length - 1) {
            k++;
            if ((k % cutlen) == 0) {
                number = number + comma;
                k = 0;
            }
        }
    }
    if (!number) number = 0;
    return number;
}

function number_remove_comma(data) {
    var number = '';
    var comma = ',';
    var i;
    for (i = 0; i < data.length; i++) {
        if (data.charAt(i) != comma)
            number += data.charAt(i);
    }
    return number;
}

function stringPad(str, pad) {
    var s = '' + str;
    if (pad === undefined || pad === null) {
        pad = '00';
    }
    return pad.substring(0, pad.length - s.length) + s;
}
String.prototype.string = function(len) {
    var s = '',
        i = 0;
    while (i++ < len) {
        s += this;
    }
    return s;
};
String.prototype.zf = function(len) {
    return '0'.string(len - this.length) + this;
};
Number.prototype.zf = function(len) {
    return this.toString().zf(len);
};
Date.prototype.format = function(f) {
    var weekName, d = this;
    if (!this.valueOf()) {
        return ' ';
    }
    weekName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case 'yyyy':
                return d.getFullYear();
            case 'yy':
                return (d.getFullYear() % 1000).zf(2);
            case 'MM':
                return (d.getMonth() + 1).zf(2);
            case 'dd':
                return d.getDate().zf(2);
            case 'E':
                return weekName[d.getDay()];
            case 'HH':
                return d.getHours().zf(2);
            case 'hh':
                return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case 'mm':
                return d.getMinutes().zf(2);
            case 'ss':
                return d.getSeconds().zf(2);
            case 'a/p':
                return d.getHours() < 12 ? '오전' : '오후';
            default:
                return $1;
        }
    });
};

function getCalcDate(dateString, operator, value) {
    var date;
    if (operator !== '-' && operator !== '+') {
        return null;
    }
    if (value === '' || isNaN(value) === true) {
        return null;
    }
    if (dateString === '' || dateString === null) {
        return null;
    }
    date = new Date(dateString);
    if (operator === '-') {
        date.setDate(date.getDate() - value);
    } else if (operator === '+') {
        date.setDate(date.getDate() + value);
    }
    return date.format('yyyy-MM-dd');
}

function nl2br(str) {
    return str.replace(/\n/g, '<br/>');
}

function count_up_notice() {
    count_up_private_noti();
}

function count_up_private_noti() {
    var $notice_count = $("#notify_cnt", top.document);
    var cnt = Number($notice_count.html()) || 0;
    $notice_count.html(cnt + 1).parent().show();
}

function count_up_family_noti() {
    var $noti_count = $("#family_unread_count .count", top.document);
    var cnt = Number($noti_count.html()) || 0;
    $noti_count.html(cnt + 1).parent().show();
}

function count_up_follower_noti() {
    var $noti_count = $("#follower_unread_count .count", top.document);
    var old_count = $noti_count.html();
    if (old_count == '99+')
        return;
    var cnt = Number(old_count) || 0;
    cnt = cnt + 1;
    if (cnt > 99)
        cnt = '99+';
    $noti_count.html(cnt).parent().show();
}

function read_noti_common(o) {
    $(o).parents('li').removeClass('new');
}

function read_nofity(obj, no, type, key) {
    $(obj).parents('li').removeClass('new');
    action_notify(type, key);
}

function action_notify(type, key) {
    var url = '';
    switch (type) {
        case 'REMOVE_NCHAT':
        case 'RECV_MEMO':
            memo_view_popup('recv', key);
            break;
        case 'RECV_ITEM':
            url = '/account/item/myitem_list.php';
            break;
        case 'RECV_ITEM_COUNT':
            url = '/account/item/myitem_list.php';
            break;
        case 'ARTICLE_COMMENT':
        case 'ARTICLE_COMMENT_REPLY':
            url = '/bbs/board.php?article_no=' + key;
            break;
        case 'GUESTBOOK_COMMENT':
            url = '/user/home.php?mb_id=' + mbid;
            break;
        case 'ARTICLE':
        case 'ARTICLE_RECOMMEND':
            url = '/bbs/board.php?article_no=' + key;
            break;
        case 'PICK_RESULT':
            url = '/tipster/user.php?' + key;
            break;
        case 'MISSION_COMPLETE':
            url = '/tipster/mission.php?game=' + key;
            break;
        case 'RECV_GIFT_POINT':
            url = '/account/point/point_history.php';
            break;
        case 'RECV_GIFT_STAR':
            url = '/account/star/star_recv_history.php';
            break;
        case 'PENALTY_WARNING':
        case 'PENALTY_CRIME':
            url = '/account/prison/record.php';
            break;
    }
    if (url != null && url != '') {
        if (default_link_target == '_self') {
            location.href = url;
        } else {
            window.frames[default_link_target].location.href = url;
        }
    }
}

function close_all_user_service_tab() {}

function user_service_tab(obj, type) {
    var $obj = $(obj);
    var $service_layer = $('#service_layer');
    var $ntalk_layer = $('#ntalk_layer');
    var ajax_url = '';
    if ($obj.hasClass('on')) {
        $obj.removeClass('on');
        $service_layer.hide().empty();
        if (type == 'talk') {
            $ntalk_layer.hide();
            $('iframe[name=ntalkFrame]').attr('src', '/talk/talk.php');
        }
    } else {
        $service_layer.html("<img src='/public/img/layout/loading.gif' class='img_loading' alt='loading' />");
        $('#user_service_tab').find('a').removeClass('on');
        $obj.addClass("on");
        if (type == 'talk') {
            $ntalk_layer.show();
            return false;
        }
        $ntalk_layer.hide();
        $service_layer.show();
        switch (type) {
            case "follower":
                ajax_url = '/ajax/follower_layer.php';
                $("#follower_unread_count").hide().find('.count').html('');
                ga('send', 'event', 'user_service_tab', 'click', $obj.attr("title"));
                break;
            case "family":
                ajax_url = '/ajax/family_layer.php';
                $("#family_unread_count").hide().find('.count').html('');
                ga('send', 'event', 'user_service_tab', 'click', $obj.attr("title"));
                break;
            case "notify":
                ajax_url = '/ajax/notify_layer.php';
                $("#notify_count").hide().find('#notify_cnt').html('');
                ga('send', 'event', 'user_service_tab', 'click', $obj.attr("title"));
                break;
            case "read_notify":
                ajax_url = '/ajax/notify_layer.php';
                break;
            case "del_notify":
                ajax_url = '/ajax/notify_layer.php';
                break;
            case "del_read_notify":
                ajax_url = '/ajax/notify_layer.php';
                break;
            default:
                return;
        }
        $.ajax({
            type: 'post',
            url: ajax_url,
            data: ({
                type: type,
                target: default_link_target
            }),
            success: function(data) {
                $('#service_layer').html(data);
            }
        });
    }
}

function dataNotFoundHandlerForTable(boxElementId, message) {
    var $table, $td, colspan;
    if (boxElementId === null || boxElementId === undefined) {
        return false;
    }
    $table = $('#' + boxElementId);
    if ($table.length === 0) {
        return false;
    }
    colspan = $table.find('th').length;
    $td = $('<td></td>');
    if (colspan > 0) {
        $td.attr('colspan', colspan).css('padding', '30px 10px');
    }
    if (message) {
        $td.html(message);
    }
    $table.find('tbody').append($('<tr></tr>').append($td));
    return true;
}

function dataNotFoundHandlerForDiv(boxElementId, message) {
    var $div;
    if (boxElementId === null || boxElementId === undefined) {
        return false;
    }
    $div = $('#' + boxElementId);
    if ($div.length === 0) {
        return false;
    }
    $div.removeClass().empty();
    $div.css({
        padding: '30px',
        'text-align': 'center'
    });
    $div.html(message);
    return true;
}

function parent_resizeFrame() {
    if (typeof parent.resizeFrame == "function") {
        parent.resizeFrame();
    }
}
var bindCheckBoxAndRadioUIEvent = function(parent) {
    var $bindElement = null;
    if (parent === undefined || parent === null) {
        $bindElement = $("input[type=checkbox], input[type=radio]");
    } else {
        $bindElement = $(parent).find('input[type=checkbox], input[type=radio]');
    }
    $bindElement.on('change', function() {
        var $this = $(this);
        var type = $this.attr('type'),
            radio_name;
        if (type == 'radio') {
            radio_name = $this.attr('name');
            $this.closest("form").find('input[name="' + radio_name + '"]').siblings().removeClass('checked');
        }
        $this.next('label').toggleClass('checked', $this.prop('checked'));
    });
};
$(function() {
    bindCheckBoxAndRadioUIEvent();
});

function ajax_friend(update_code, mb_id, callback) {
    var params = {};
    params.update_code = update_code;
    params.mb_id = mb_id;
    $.post("/account/friend/friend.ajax.php", params, function(res) {
        callback(res);
    }, "json").fail(function(obj, status, error) {
        alert("작업이 실패하였습니다.");
    });
}
var toggleChatTab = function(tab) {
    var $document, $chatWrapper, $tabElements;
    if (parent.document.getElementById('chat_wrapper')) {
        $document = $(parent.document);
    } else {
        $document = $(document);
    }
    $tabElements = $document.find('#lnk_issue_tab, #lnk_chat_tab, #lnk_ntalk_tab');
    $tabElements.removeClass('selected');
    $chatWrapper = $document.find('#chat_wrapper');
    $chatWrapper.find('iframe').hide();
    $chatWrapper.find('#issueFrame').hide();
    $chatWrapper.find('#' + tab + 'Frame').show();
    $document.find('#lnk_' + tab + '_tab').addClass('selected');
};
var isChatPopup = function() {
    return document.getElementById('ntalk_layer') === null;
};
var isCountEffect = true;
var updateNTalkUnReadMessageCount = function(count) {
    var $ce;
    if (isChatPopup() === false) {
        $ce = $('#talk_msg_count');
        if ($ce.length > 0) {
            if (count > 0) {
                $ce.show().find('.count').text(count);
            } else {
                $ce.hide();
            }
        }
    }
};
var getCurrentTab = function() {
    var chatTab, $selected;
    if (opener) {
        return false;
    }
    chatTab = parent.document.getElementById('chat_tab') || document.getElementById('chat_tab');
    if (!chatTab) {
        return false;
    }
    $selected = $(chatTab).find('.selected');
    return $selected.attr('rel');
};
var notifyNewTalkMessageAtFrameTop = function(channelId, memberId, level, nick, extendStyle, message) {
    var $talkFrame, $notis, $notiWrap, $innerDiv, $memberDiv, $profileSpan, $profileImg, $levelImg, $nickAc, $channelAc, $closeBtn, profileSrc, levelSrc, audioElement, onErrorProfileSrc = '/public/img/profile/default_95x95.png';
    $talkFrame = document.getElementById('ntalkFrame');
    if (opener) {
        return false;
    }
    if (!$talkFrame) {
        return false;
    }
    if (!channelId || !level || !nick || !message) {
        return false;
    }
    $notis = $('.talk_notis');
    $notiWrap = $('<div></div>').addClass('talk_notify');
    audioElement = $('<audio></audio>').addClass('audio_play').attr('src', '/public/sound/ding_dong.mp3');
    $innerDiv = $('<div></div>').addClass('inner').addClass('_user_info_');
    $memberDiv = $('<div></div>').addClass('member');
    $profileSpan = $('<span></span>').addClass('profile_image');
    $memberDiv.append($profileSpan);
    $innerDiv.append($memberDiv);
    profileSrc = '/data/profile/' + memberId.substr(0, 2) + '/' + memberId + '.png';
    $profileImg = $('<img/>').attr('src', profileSrc).error(function() {
        $(this).attr('src', onErrorProfileSrc);
    });
    $profileSpan.append($profileImg);
    if (extendStyle === 'best') {
        levelSrc = '/public/img/level/50x50/best.png';
    } else {
        levelSrc = '/public/img/level/50x50/' + level + '.png';
    }
    $levelImg = $('<img/>').addClass('level').attr('src', levelSrc);
    $memberDiv.append($levelImg);
    $nickAc = $('<a></a>').addClass('unick').text(nick);
    if (extendStyle) {
        $nickAc.addClass(extendStyle);
    }
    if (memberId) {
        $nickAc.attr('href', '/user/home.php?mb_id=' + memberId).click(function() {
            ga('send', 'event', 'talk_notify', 'click', '닉네임 클릭');
        });
    }
    $memberDiv.append($nickAc);
    $channelAc = $('<a></a>').addClass('msg').text(message).attr('href', '/talk/talk.php?it=channel_id&iv=' + channelId).attr('target', 'ntalkFrame').click(function() {
        $('#user_service_talk').trigger('click');
        ga('send', 'event', 'talk_notify', 'click', '메시지 클릭');
    });
    $memberDiv.append($channelAc);

    function close() {
        $notiWrap.animate({
            top: '-142'
        }, 300, function() {
            this.remove();
        });
    }
    $closeBtn = $('<a></a>').addClass('btn_close').attr('href', 'javascript:;').click(function() {
        close();
        ga('send', 'event', 'talk_notify', 'click', '닫기 클릭');
    });
    $innerDiv.append($closeBtn);
    $notiWrap.append($innerDiv);
    $notis.append($notiWrap);
    $notis.append(audioElement);
    $notiWrap.append($innerDiv);
    document.querySelector(".audio_play").play();
    $notiWrap.animate({
        top: '0'
    }, 300, function() {
        var notiChildren = $notis.children('.talk_notify');
        if (notiChildren.length >= 2) {
            notiChildren.first().remove();
        }
        setTimeout(function() {
            close();
        }, 5000);
    });
    ga('send', 'event', 'talk_notify', 'view', '알림 애니메이션');
};

function notifyNewTalkMessage() {
    var url = '/talk/api.php?cmd=get_last_un_read_message&skip_version_check=true',
        response;
    $.get(url, function(res) {
        if (res && res.hasOwnProperty('code') && res.code === 200) {
            response = res.data;
            parent.notifyNewTalkMessageAtFrameTop(response.channelId, response.memberId, response.level, response.nick, response.extendStyle, response.message);
        }
    });
}

function popup_create_family() {
    var url = '/family/popup/create.popup.php';
    return open_popup(url, 'create_fam', '383', '606');
}

function dc(mb_id) {
    var url;
    if (!mb_id) {
        return false;
    }
    url = '/chat/api.php?cmd=ac&member_id=' + mb_id;
    $.get(url, function(res) {
        if (res.code !== 200) {
            alert('처리에 실패했습니다.');
        }
    });
}

function cc(mb_id) {
    var node = document.getElementById('chat_log'),
        url = '/ajax/chat_capture.php';
    if (node) {
        domtoimage.toPng(node, {}).then(function(png) {
            if (png) {
                $.post(url, {
                    mb_id: mb_id,
                    image: png
                }, function(res) {}, 'text');
            }
        });
    }
}

function ajax_subscribe(params, callback) {
    $.post("/tipster/ajax/user.subscribe.ajax.php", params, function(res) {
        callback(res);
    }, "json").fail(function(obj, status, error) {});
}
$(function() {
    $(document).on("click", "[subscribe='subscribe']", function() {
        if (!mbid) {
            alert('구독은 로그인후 가능합니다.');
            return false;
        }
        var $o = $(this);
        var params = {
            no: $o.attr('rel_no'),
            pick_type: $o.attr('pick_type')
        };
        ajax_subscribe(params, function(res) {
            var $tr = $o.parent('.pick_cell').parent();
            $tr.find(".main_pick_cell").html(res.html.main);
            $tr.find(".sub_pick_cell").html(res.html.sub);
            $("#tooltip").hide();
        });
    });
});

function open_room_chat(element, message) {
    var url = '/nchat/',
        query, el;
    if ('string' == typeof message && $.trim(message).length && confirm(message) === false) return false;
    query = 'string' == typeof element ? element : (((el = $(element)).length > 0 && el.attr('href')) ? el.attr('href') : '');
    url += '?' + $.trim(query.replace(/(\/nchat)\/?/i, '')).replace(/^\?\/?/i, '');
    openPopupWithOptions(url, 'room_chat', {
        'width': 1320,
        'height': 800,
        'resizable': 'no'
    });
    return false;
}

function open_user_home(element) {
    const url = element.getAttribute("href");
    if (element.hasAttributes("data-location")) {
        window.open(url, "_blank");
        return false;
    }
    parent.location.href = url;
    return false;
}

function createNumberSet(eos_block, eos_tran, entry, max_number, start_cnt = 0) {
    eos_tran = eos_tran ? eos_tran : '';
    let eos_value = eos_block + '' + eos_tran;
    let hashs = [];
    let numbers = [];
    let count = 0;
    let str = '';
    let str_class = entry == 22 ? 'speedkeno' : 'powerball';
    start_cnt = start_cnt ? start_cnt : 0;
    for (let i = start_cnt; i < 1000; i++) {
        hashs[i] = SHA256(eos_value + '' + i);
        let sum = makeSumFromHash(hashs[i]);
        let number = makeNumberFromHash(hashs[i], max_number);
        if (numbers.indexOf(number) == -1) {
            numbers[count] = number;
            count++;
            if (entry == 1) {
                number = number - 1;
            }
            let str_plus = '';
            if (max_number != 10) str_plus = ' +1';
            number = number + ' <span style="font-weight:normal;color:#999;"> (hash 숫자합계 : ' + sum + ' 을 ' + max_number + ' 로 나눈 나머지값' + str_plus + ')</span>';
        } else {
            number = number + ' <span style="font-weight:normal;color:red;">(중복값 이어서 패스!!)</span>'
        }
        str += `<li>
                    <div>
                        <span class="tit_badge">검증번호</span>
                        <p>${eos_block}(EOS블록번호) + ${eos_tran}(블록해시 마지막5자리) + ${i}(증가값) = <strong>${eos_value+''+i}</strong></p>
                    </div>
                    <div>
                        <span class="tit_badge">hash</span>
                        <p>${hashs[i]}</p>
                    </div>
                    <div>
                        <span class="tit_badge ${str_class}">결과값</span>                        
                        <p><strong>${number}</strong></p>
                    </div>
                </li>`;
        if (count >= entry) break;
    }
    if (entry == 1) {
        $(".result_step").append(str);
    } else {
        $(".result_step").html(str);
    }
    return numbers;
}

function makeSumFromHash(hash) {
    let arrHash = hash.toString().split('');
    let sum = 0;
    for (let i = 0; i < arrHash.length; i++) {
        let number = parseInt(arrHash[i], 16);
        sum = sum + number;
    }
    return sum;
}

function makeNumberFromHash(hash, max) {
    let arrHash = hash.toString().split('');
    let sum = 0;
    for (let i = 0; i < arrHash.length; i++) {
        let number = parseInt(arrHash[i], 16);
        sum = sum + number;
    }
    return sum % max + 1;
}

function SHA256(s) {
    var chrsz = 8;
    var hexcase = 0;

    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    function S(X, n) {
        return (X >>> n) | (X << (32 - n));
    }

    function R(X, n) {
        return (X >>> n);
    }

    function Ch(x, y, z) {
        return ((x & y) ^ ((~x) & z));
    }

    function Maj(x, y, z) {
        return ((x & y) ^ (x & z) ^ (y & z));
    }

    function Sigma0256(x) {
        return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
    }

    function Sigma1256(x) {
        return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
    }

    function Gamma0256(x) {
        return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
    }

    function Gamma1256(x) {
        return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
    }

    function core_sha256(m, l) {
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;
        for (var i = 0; i < m.length; i += 16) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];
            for (var j = 0; j < 64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));
                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }
            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }

    function str2binb(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
        }
        return bin;
    }

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    function binb2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
        }
        return str;
    }
    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}
$(function() {
    if (typeof callback_load_ntalkframe === "function") {
        $("#ntalkFrame").one("load", function() {
            var ntalkFrameObject = document.getElementById("ntalkFrame");
            var ntalkFrameObjectDocument = ntalkFrameObject.contentWindow || ntalkFrameObject.contentDocument;
            var adIntervalCount = 0;
            var adIntervalId = setInterval(function() {
                adIntervalCount++;
                if (ntalkFrameObjectDocument.isWebSocketConnected) {
                    callback_load_ntalkframe();
                    clearInterval(adIntervalId);
                }
                if (adIntervalCount >= 30) {
                    clearInterval(adIntervalId);
                }
            }, 100);
        });
    }
});