
$(document).ready(function () {
    var changed=false;
    $('#save').on('click', function () {

        var topHeadBgLight=".UIToolbarContainerLight .NormalContainerBlock .ToolbarContainer { background-color: "+$("#top_head_bg").val()+" ! important; background-image: none ! important}";
        var topHeadBgDark=".UIToolbarContainerDark .NormalContainerBlock .ToolbarContainer { background-color: "+$("#top_head_bg").val()+" ! important; background-image: none ! important}";

        var topHeadBgHoLight=".UIToolbarContainerLight .uiDropdownWithIcon > a:hover{background: "+$("#top_head_ho_bg").val()+" none repeat scroll 0 0 !important; color:  "+$("#top_head_ho_cl").val()+" !important}";
        var topHeadBgHoDark=".UIToolbarContainerDark .uiDropdownWithIcon > a:hover{background: "+$("#top_head_ho_bg").val()+" none repeat scroll 0 0 !important; color: "+$("#top_head_ho_cl").val()+" !important}";

        var  topTitleColorLight=".UIToolbarContainerLight .uiDropdownWithIcon > a { color: "+$("#top_head_cl").val()+" ! important}";
        var  topTitleColorDark=".UIToolbarContainerDark .uiDropdownWithIcon > a { color: "+$("#top_head_cl").val()+" ! important}";

        var pageBg=".RightBodyTDContainer {background: "+$("#page_bg").val()+" none repeat scroll left top ! important}";

        var  title =".title  { background: "+$("#title_bg").val()+" none repeat scroll 0 0 !important; color: "+$("#title_cl").val()+" !important}";
        var LeftNavigationTDContainer=".LeftNavigationTDContainer {   background: "+$("#l_nav_bg").val()+" none repeat scroll 0 0 !important}";
        var icons=".UIToolbarContainer [class^='uiIconPLF24x24'] { color: "+$("#top_head_icon_cl").val()+" ! important}";
        var leftIcons=".uiCompanyNavigationPortlet .uiCompanyNavigations > li > a > i { color: "+$("#l_nav_icon_cl").val()+" ! important}";
        var style = topHeadBgLight + topHeadBgDark + topTitleColorLight + topTitleColorDark + pageBg + title + LeftNavigationTDContainer + icons + leftIcons + topHeadBgHoDark + topHeadBgHoLight;

        $.ajax
        ({
            beforeSend: function () {;
                $("#save").attr('disabled', 'disabled');
                $("#AjaxLoadingMask").show();
            },
            cache: true,
            type: "POST",
            async: true,
            data: style,
            contentType: "application/json",
            dataType: "json",
            url: "/rest/private/skinning/write",
            statusCode: {
                400: function (xhr) {
                    $("#actionfail").html('<i class="uiIconError"></i>' + xhr.responseText);
                    $("#actionfail").show().delay(10000).fadeOut();
                    $("#AjaxLoadingMask").hide();
                },
                500: function (xhr) {
                    $("#actionfail").html('<i class="uiIconError"></i>' + xhr.responseText);
                    $("#actionfail").show().delay(10000).fadeOut();
                    $("#AjaxLoadingMask").hide();
                }
            }
        })
            .fail
        (
            function () {
                $("#AjaxLoadingMask").hide();
            }
        )
            .done
        (
            function (data) {
                $("#AjaxLoadingMask").hide();
                window.location.reload(true)
            }
        );
    });


    $('#cancel').on('click', function () {
        location.reload(true);
    });

    var ho_header="";

/*

    $.ajax
    ({
        cache: true,
        type: "GET",
        async: false,
        contentType: "application/json",
        url: "/rest/private/skinning/getstyles",
    })
        .fail
    (
        function () {
            var f = false;
            var selector = ".UIToolbarContainerDark .uiDropdownWithIcon > a:hover";
            var rgs = new RegExp('\\s*' + selector + "\\s*", "g");
            var css = document.styleSheets;
            for (var k = 0; k < css.length; k++) {
                var rules = document.styleSheets[k].cssRules;
                for (var i = 0; i < rules.length; i++) {
                    if (rgs.test(rules[i].selectorText)) {
                        if (!f) {
                            ho_header = rules[i].style.cssText;
                            f = true;
                        } else if (rules[i].style.cssText.indexOf("important") != "-1") {
                            ho_header = rules[i].style.cssText;
                        }
                    }
                }
            }

            if (!f) {
                selector = ".UIToolbarContainerLight .uiDropdownWithIcon > a:hover";
                rgs = new RegExp('\\s*' + selector + "\\s*", "g");
                css = document.styleSheets;
                for (var k = 0; k < css.length; k++) {
                    var rules = document.styleSheets[k].cssRules;
                    for (var i = 0; i < rules.length; i++) {
                        if (rgs.test(rules[i].selectorText)) {
                            if (!f) {
                                ho_header = rules[i].style.cssText;
                                f = true;
                            } else if (rules[i].style.cssText.indexOf("important") != "-1") {
                                ho_header = rules[i].style.cssText;
                            }
                        }
                    }
                }
            }
            var ho_header_bg=ho_header.substring(ho_header.indexOf("background:")+"background:".length,ho_header.indexOf(" none"));
            var ho_header_cl=ho_header.substring(ho_header.indexOf("color:")+("color:").length,ho_header.length);
            $("#top_head_ho_cl").colorpicker({
                color: getHex(ho_header_cl)
            });
            $("#top_head_ho_bg").colorpicker({
                color: getHex(ho_header_bg)
            });
        }
    )
        .done
    (
        function (data) {
            ho_header=data.topHeadHo;
            if(ho_header==""||typeof(ho_header) == "undefined") {
                var f = false;
                var selector = ".UIToolbarContainerDark .uiDropdownWithIcon > a:hover";
                var rgs = new RegExp('\\s*' + selector + "\\s*", "g");
                var css = document.styleSheets;
                for (var k = 0; k < css.length; k++) {
                    var rules = document.styleSheets[k].cssRules;
                    for (var i = 0; i < rules.length; i++) {
                        if (rgs.test(rules[i].selectorText)) {
                            if (!f) {
                                ho_header = rules[i].style.cssText;
                                f = true;
                            } else if (rules[i].style.cssText.indexOf("important") != "-1") {
                                ho_header = rules[i].style.cssText;
                            }
                        }
                    }
                }

                if (!f) {
                    selector = ".UIToolbarContainerLight .uiDropdownWithIcon > a:hover";
                    rgs = new RegExp('\\s*' + selector + "\\s*", "g");
                    css = document.styleSheets;
                    for (var k = 0; k < css.length; k++) {
                        var rules = document.styleSheets[k].cssRules;
                        for (var i = 0; i < rules.length; i++) {
                            if (rgs.test(rules[i].selectorText)) {
                                if (!f) {
                                    ho_header = rules[i].style.cssText;
                                    f = true;
                                } else if (rules[i].style.cssText.indexOf("important") != "-1") {
                                    ho_header = rules[i].style.cssText;
                                }
                            }
                        }
                    }
                }
            }
            var ho_header_bg=ho_header.substring(ho_header.indexOf("background:")+"background:".length,ho_header.indexOf(" none"));
            var ho_header_cl=ho_header.substring(ho_header.indexOf("color:")+("color:").length,ho_header.length);
            $("#top_head_ho_cl").colorpicker({
                color: getHex(ho_header_cl)
            });
            $("#top_head_ho_bg").colorpicker({
                color: getHex(ho_header_bg)
            });
        }
    );


*/

    $("#top_head_bg").colorpicker({
        color: getHex($('.UIToolbarContainerDark .NormalContainerBlock .ToolbarContainer').css('background-color'))
    });
    $("#top_head_icon_cl").colorpicker({
        color: getHex($('.UIToolbarContainer [class^="uiIconPLF24x24"]').css('color'))
    });
    $("#top_head_cl").colorpicker({
        color: getHex($('.UIToolbarContainerDark .uiDropdownWithIcon > a').css('color'))
    });

    $("#page_bg").colorpicker({
       color: getHex($('.RightBodyTDContainer').css('background-color'))
    });
    $("#title_bg").colorpicker({
       color: getHex($('.title').css('background-color'))
    });
    $("#title_cl").colorpicker({
        color: getHex($('.title').css('color'))
    });
    $("#l_nav_bg").colorpicker({
        color: getHex($('.LeftNavigationTDContainer').css('background-color'))
    });
    $("#l_nav_icon_cl").colorpicker({
        color: getHex($('.uiCompanyNavigationPortlet .uiCompanyNavigations > li > a > i').css('color'))
    });


    $("#top_head_bg").on("change.color", function(event, color){
        $('.UIToolbarContainerDark .NormalContainerBlock .ToolbarContainer').attr('style', 'background-color: '+$("#top_head_bg").val()+' ! important; background-image: none ! important;');
        $('.UIToolbarContainerLight .NormalContainerBlock .ToolbarContainer').attr('style', 'background-color: '+$("#top_head_bg").val()+' ! important; background-image: none ! important;');
        $('.UIToolbarContainerDark .uiDropdownWithIcon > a').attr('style', 'color: '+$("#top_head_cl").val()+' ! important;');
        $('.UIToolbarContainerLight .uiDropdownWithIcon > a').attr('style', 'color: '+$("#top_head_cl").val()+' ! important;');
    })


    $("#top_head_icon_cl").on("change.color", function(event, color){
        $('.UIToolbarContainer [class^="uiIconPLF24x24"]').attr('style', 'color: '+$("#top_head_icon_cl").val()+' ! important;');
    })

    $("#top_head_cl").on("change.color", function(event, color){
        $('.UIToolbarContainerDark .uiDropdownWithIcon > a').attr('style', 'color: '+$("#top_head_cl").val()+' ! important;');
        $('.UIToolbarContainerLight .uiDropdownWithIcon > a').attr('style', 'color: '+$("#top_head_cl").val()+' ! important;');

    })

  $("#top_head_ho_bg").on("change.color", function(event, color){
        changed=true;
    })


    $("#top_head_ho_cl").on("change.color", function(event, color){
        changed=true;
    })


    $("#page_bg").on("change.color", function(event, color){
        $('.RightBodyTDContainer').attr('style', 'background: '+$("#page_bg").val()+' none repeat scroll left top ! important;');
    })


    $("#title_bg").on("change.color", function(event, color){
        $('.title').attr('style', 'background-color: '+$("#title_bg").val()+' !important ; color: '+$("#title_cl").val()+' !important');
    })


    $("#title_cl").on("change.color", function(event, color){
        $('.title').attr('style', 'background: '+$("#title_bg").val()+' !important ; color: '+$("#title_cl").val()+' !important');
    })



    $("#l_nav_bg").on("change.color", function(event, color){
        $('.LeftNavigationTDContainer').attr('style', 'background: '+$("#l_nav_bg").val()+' none repeat scroll 0 0 !important');
    })

    $("#l_nav_icon_cl").on("change.color", function(event, color){
        $('.uiCompanyNavigationPortlet .uiCompanyNavigations > li > a > i').attr('style', 'color: '+$("#l_nav_icon_cl").val()+' !important');
    })

    $('.UIToolbarContainerDark .uiDropdownWithIcon > a').mouseenter(function() {
        if(changed){
            $(this).attr('style', 'background: '+$("#top_head_ho_bg").val()+' none repeat scroll 0 0 !important; color:  '+$("#top_head_ho_cl").val()+' !important');
        }
    }).mouseleave(function() {
        if(changed){
        $(this).attr('style', 'background: '+$("#top_head_bg").val()+' none repeat scroll 0 0 !important; color:  '+$("#top_head_cl").val()+' !important');
        }});

    $('.UIToolbarContainerLight .uiDropdownWithIcon > a').mouseenter(function() {
        if(changed){
        $(this).attr('style', 'background: '+$("#top_head_ho_bg").val()+' none repeat scroll 0 0 !important; color:  '+$("#top_head_ho_cl").val()+' !important');
        }}).mouseleave(function() {
            if(changed){
        $(this).attr('style', 'background: '+$("#top_head_bg").val()+' none repeat scroll 0 0 !important; color:  '+$("#top_head_cl").val()+' !important');
            }});
});

function componentFromStr(numStr, percent) {
    var num = Math.max(0, parseInt(numStr, 10));
    return percent ?
        Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}

function rgbToHex(rgb) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result, r, g, b, hex = "";
    if ( (result = rgbRegex.exec(rgb)) ) {
        r = componentFromStr(result[1], result[2]);
        g = componentFromStr(result[3], result[4]);
        b = componentFromStr(result[5], result[6]);

        hex = "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return hex;
}

function getHex(c) {
    if (c.indexOf("rgb")!=-1){
        return rgbToHex(c.replace("!important","").replace(/\s/g, ''))
    }
    return c.replace("!important","").replace(/\s/g, '');
}