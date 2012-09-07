(function(){
  //navigation event
  $("#nav-logo").mouseover(function(e){
    $(e.currentTarget).removeClass("logo-mouseout");
  });    
  $("#nav-logo").mouseout(function(e){
    $(e.currentTarget).addClass("logo-mouseout");
  });    
  $(".nav-list li").mouseover(function(e){
    $(e.currentTarget).addClass("nav-mousein");
  });
  $(".nav-list li").mouseout(function(e){
    $(e.currentTarget).removeClass("nav-mousein");
  });
  $(".nav-list li").click(function(e){
    var id = e.currentTarget.id;
    if(id==="nav-contact"){
      var coo = $("#contact-content").offset();
      $("html,body").animate({scrollTop: (coo.top)},"slow")
    }
    else if(id==="nav-aboutkono"){
      var coo = $("#content-logo").offset();
      $("html,body").animate({scrollTop: (coo.top)},"slow")
    }
    else{
      var coo = $("#" + id.replace("nav", "content")).offset();
      $("html,body").animate({scrollTop: (coo.top + 350)},"slow")
    }

  //$("html,body").animate({scrollTop: (coo.top + 350)},"slow")
  });
  $("#nav-logo").click(function(){
    $("html,body").animate({scrollTop: 0},"slow")
  });

  //team gallery
  $(".photo-left").mouseover(function(e){
    $(e.currentTarget).addClass("photo-arrow-mousein");
    $(e.currentTarget).removeClass("photo-arrow-mouseout");
  });
  $(".photo-left").mouseout(function(e){
    $(e.currentTarget).removeClass("photo-arrow-mousein");
    $(e.currentTarget).addClass("photo-arrow-mouseout");
  });
  $(".photo-right").mouseover(function(e){
    $(e.currentTarget).addClass("photo-arrow-mousein");
    $(e.currentTarget).removeClass("photo-arrow-mouseout");
  });
  $(".photo-right").mouseout(function(e){
    $(e.currentTarget).removeClass("photo-arrow-mousein");
    $(e.currentTarget).addClass("photo-arrow-mouseout");
  });
  $(".photo-right").click(function(){
    if($(".open-photo").size() > 5){
      $(".open-photo:first").animate({width: "0px"}, "slow", function(){
        $(this).removeClass("open-photo");
        $(this).addClass("close-photo");
      });
    }
  });
  $(".photo-left").click(function(){
    if($(".close-photo").size() > 0){
      $(".close-photo:last").animate({width: "176px"}, "slow", function(){
        $(this).removeClass("close-photo");
        $(this).addClass("open-photo");
      });
    }
  });

  //email event
  $(".subscribe-email").focus(function(){
    if("請輸入您的email，取得最新資訊" === $(this).val()){
      $(this).val("");
      $(this).css("color", "gray");
    }
  });
  $(".subscribe-send-top").click(function(){
    var email = $("#subscribe-email-top").val();
    var pattern = new RegExp(/\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/);
    if(!pattern.test(email)){
      alert("無效email");
      return false;
    }
    sendEmail("官網遊客訂閱電子報（" + email + "）", email);
  });
  $(".subscribe-send-bottom").click(function(){
    var email = $("#subscribe-email-bottom").val();
    var pattern = new RegExp(/\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/);
    if(!pattern.test(email)){
      alert("無效email");
      return false;
    }
    sendEmail("官網遊客訂閱電子報（" + email + "）", email);
  });

  $("#send-btn").click(function(){
    var name = $("#contact-name").val();
    var email = $("#contact-e-mail").val();
    var msg = $("#contact-msg").val();
    if("" === msg){
      alert("留言內容不可為空白");
      return false;
    }
    var pattern = new RegExp(/\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/);
    if(!pattern.test(email)){
      alert("無效email");
      return false;
    }
    var subject = "官網留言（" + email + "）";
    var content = "<p>姓名：" + name + "</p>";
    content += "<p>email：" + email + "</p>";
    content += "<p>內容：</p>" + switchNl2Html(msg);
    sendEmail(subject, content);
  });
  //send email to info@thekono.com by info@thekono.com
  //ex:
  //    sendEmail(title, content);
  var sendEmail= function(subject, content){
    var emailAjax = {
      data: {
        subject: subject,
        content: content
      },
      type: "POST",
      dataType: "json",
      url: "php/infoMailer.php",
      error: function(){
        alert("系統維修，請稍候再試，敬請見諒");
      },
      success: function(){
        alert("感謝您的使用");
      }
    };
    $.ajax(emailAjax);
  };
  var switchNl2Html = function(str){
    return "<p>" + str.replace(/\n/g, "</p><p>") + "</p>";
  };
})();
