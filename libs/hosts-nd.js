  var fs = require("fs");
  var path = require("path");
  var sys = require('sys');
  var exec = require('child_process').exec;

  var setTextareaHeight = function(){
    $("#hostfile").height($(window).height());
  };

  $(function(){
    $(document).keyup(function(e) {
      if (e.keyCode == 27) {
        var hosts_data = $("#hostfile").val();
        fs.writeFile("/etc/hosts", hosts_data, function(err){
          if (err){
            var command ="";
            switch(process.platform){
              case "darwin":
                command = "/usr/bin/osascript "+path.resolve("setpermissions.osx");
                break;
              case "windows":
                break;
              case "linux":
                command = "/usr/bin/gktsudo chmod a+w /etc/hosts";
            }
            exec(command, function(err, stdout,stderr){
              fs.writeFile("/etc/hosts", hosts_data, function(err){
                if (err){
                  alert("Error setting permissions");
                }                
                window.close();
              });
            });
        
          }else{
            window.close(); 
          }          
        });


      }   // esc
    });

    $(window).resize(setTextareaHeight);
    setTextareaHeight();

    fs.readFile("/etc/hosts", function(err,data){
      $("#hostfile").val(data).focus().keydown();
    });
  });