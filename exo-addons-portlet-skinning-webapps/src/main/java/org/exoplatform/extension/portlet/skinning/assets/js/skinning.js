

$(document).ready(function () {
    $('#save').on('click', function () {

        var topHeadBgLight=".UIToolbarContainerLight .NormalContainerBlock .ToolbarContainer { background-color: "+$("#top_head_bg").val()+" ! important; background-image: none ! important;}";
        var topHeadBgDark=".UIToolbarContainerDark .NormalContainerBlock .ToolbarContainer { background-color: "+$("#top_head_bg").val()+" ! important; background-image: none ! important;}";

        var  topTitleColorLight=".UIToolbarContainerLight .uiDropdownWithIcon > a { color: "+$("#top_head_cl").val()+" ! important;}";
        var  topTitleColorDark=".UIToolbarContainerDark .uiDropdownWithIcon > a { color: "+$("#top_head_cl").val()+" ! important;}";

        var pageBg=".RightBodyTDContainer {background: "+$("#page_bg").val()+" none repeat scroll left top ! important;}";

        var  title =".title  { background: "+$("#title_bg").val()+" none repeat scroll 0 0 !important; color: "+$("#title_cl").val()+" !important;}";
        var LeftNavigationTDContainer=".LeftNavigationTDContainer {   background: "+$("#l_nav_bg").val()+" none repeat scroll 0 0 !important;}";
        var icons='[class^="uiIconPLF24x24"] {background-image: url("/eXoSkin/skin/images/themes/default/platform/skin/Icons/uiIconsPLF24x24'+$('input[name=icons]:checked').val()+'.png") !important;}';

        var style = [topHeadBgLight, topHeadBgDark, topTitleColorLight, topTitleColorDark, pageBg, title, LeftNavigationTDContainer, icons];


        $.ajax
        ({
            beforeSend: function () {
                $("#save").attr('disabled', 'disabled');
                $("#AjaxLoadingMask").show();
            },
            cache: true,
            type: "POST",
            async: true,
            data: JSON.stringify(style),
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
                location.reload(true);
            }
        );
    });


    $('#cancel').on('click', function () {
        location.reload(true);
    });


    $("#top_head_bg").colorpicker({
        color: $('.UIToolbarContainerDark .NormalContainerBlock .ToolbarContainer').css('background-color')
    });
    $("#top_head_cl").colorpicker({
        color: $('.UIToolbarContainerDark .uiDropdownWithIcon > a').css('color')
    });
    $("#page_bg").colorpicker({
       color: $('.RightBodyTDContainer').css('background-color')
    });
    $("#title_bg").colorpicker({
       color: $('.title').css('background-color')
    });
    $("#title_cl").colorpicker({
        color: $('.title').css('color')
    });
    $("#l_nav_bg").colorpicker({
        color: $('.LeftNavigationTDContainer').css('color')
    });


    var backIcon=$("i[class^='uiIconPLF24x24']").css("background-image");
    var iconSet=backIcon.substring(backIcon.indexOf("uiIconsPLF24x24")+15, backIcon.indexOf(".png"));

    $("[name=icons]").val([iconSet]);

    $("#top_head_bg").on("change.color", function(event, color){
        $('.UIToolbarContainerDark .NormalContainerBlock .ToolbarContainer').attr('style', 'background-color: '+$("#top_head_bg").val()+' ! important; cbackground-image: none ! important;');
        $('.UIToolbarContainerLight .NormalContainerBlock .ToolbarContainer').attr('style', 'background-color: '+$("#top_head_bg").val()+' ! important; cbackground-image: none ! important;');

    })


    $("#top_head_cl").on("change.color", function(event, color){
        $('.UIToolbarContainerDark .uiDropdownWithIcon > a').attr('style', 'color: '+$("#top_head_cl").val()+' ! important;');
        $('.UIToolbarContainerLight .uiDropdownWithIcon > a').attr('style', 'color: '+$("#top_head_cl").val()+' ! important;');

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
        $('.LeftNavigationTDContainer').attr('style', 'background-color: '+$("#l_nav_bg").val()+' none repeat scroll 0 0 !important');
    })

    $('input[name=icons]').on("change", function(){
        $("i[class^='uiIconPLF24x24']").attr('style', 'background-image: url("/eXoSkin/skin/images/themes/default/platform/skin/Icons/uiIconsPLF24x24'+$('input[name=icons]:checked').val()+'.png") !important');
    })

});



