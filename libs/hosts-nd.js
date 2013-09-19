  var fs = require("fs");
  var path = require("path");
  var sys = require('sys');
  var exec = require('child_process').exec;
  var editor;

  $(function(){
    $(document).keyup(function(e) {
      if (e.keyCode == 27) {
        var hosts_data = editor.getValue();
        
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

    fs.readFile("/etc/hosts", function(err,data){
      $("#hostfile").text(data);
      editor = ace.edit("hostfile");
      editor.setTheme("ace/theme/twilight");
      editor.getSession().setMode("ace/mode/text");
      editor.getSession().setUseWrapMode(true);
    });
  });